import React, { useContext, useState, useEffect } from 'react';
import styles from './styles.module.css';

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { format, parseISO, startOfMonth } from 'date-fns';

import { GlobalContext } from '../../context/GlobalContext';

import { METRIC_METADATA } from '../../constants/metrics';

const Chart = ({ 
    metric, 
    chain,
    pool,
    collateral_type,
  }) => {
  const [highlightValue, setHighlightValue] = useState(null);

  const { state } = useContext(GlobalContext);

  const metricMetadata = METRIC_METADATA[metric];
  const {
    chartTitle,
    chartYValueSymbol,
    dataStartDate,
    chartYAxisDataKey,
  } = metricMetadata;

  const APYStartDate = new Date(dataStartDate);

  const data = state[metric]
    .filter(item => item.chain === chain && new Date(item.ts) >= APYStartDate) 
    .map(item => ({
      timestamp: parseISO(item.ts),
      [chartYAxisDataKey]: item.apys.apy_7d.year * 100,
    }));

  const latestValue = data.length > 0
    ? data[data.length - 1][chartYAxisDataKey].toFixed(2) 
    : '';

  useEffect(() => {
    setHighlightValue(latestValue);
  }, [latestValue]);

  const onHighlightValueChange = (value) => {
    setHighlightValue(value);
  }

  // 7day moving average
  const smoothData = (data, windowSize = 168) => {
    return data.map((point, index, array) => {
      if (index < windowSize - 1) {
        // Not enough previous data points, return original
        return point;
      }
      const window = array.slice(index - windowSize + 1, index + 1);
      const sum = window.reduce((acc, curr) => acc + curr[chartYAxisDataKey], 0);

      return {
        ...point,
        [chartYAxisDataKey]: sum / windowSize
      };
    });
  };
    
  const smoothedData = smoothData(data);

  const maxAPY = Math.max(...data.map(d => d[chartYAxisDataKey]));
  const yAxisUpperLimit = Math.ceil(maxAPY * 1.2);

  const formatXAxis = (tickItem) => {
    const date = new Date(tickItem);
    if (date.getMonth() === 0) {
      return format(date, 'yyyy');
    }
    
    return format(date, 'MMM');
  };

  const ticksXAxis = data.reduce((acc, item) => {
    const monthStart = startOfMonth(item.timestamp);
    if (!acc.some(date => date.getTime() === monthStart.getTime())) {
      acc.push(monthStart);
    }

    return acc;
  }, []);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const value = payload[0].value.toFixed(2);
      onHighlightValueChange(value);

      return (
        <div className={styles.tooltip}>
          <p>{format(new Date(label), 'MMM dd, yyyy')}</p>
          <p>{`APY: ${payload[0].value.toFixed(2)}%`}</p>
        </div>
      );
    }

    onHighlightValueChange(latestValue);

    return null;
  };

  return (
    <li className={styles.container}>
      <div className={styles.chartHeader}>
        <div className={styles.titleContainer}>
          <h3 className={styles.chartTitle}>{chartTitle}</h3>
          <div className={styles.titleMeta}>
            <p className={styles.chartSubtitle}>{chain}</p>
            <p className={styles.chartSubtitle}>{pool}</p>
            <p className={styles.chartSubtitle}>{collateral_type}</p>
          </div>
        </div>
        <p className={styles.latestValue}>{highlightValue}{chartYValueSymbol}</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart 
          data={smoothedData} 
          margin={{ top: 0, right: 30, left: 15, bottom: 20 }}
        >
          <defs>
            <linearGradient id="colorAPY" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--green-500)" stopOpacity={0.4}/>
              <stop offset="95%" stopColor="var(--green-500)" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="timestamp" 
            tickFormatter={formatXAxis} 
            stroke="var(--charts-supporting-colour)"
            angle={-45}
            textAnchor="end"
            height={60}
            tick={{fontSize: 'var(--charts-title-secondary)'}}
            ticks={ticksXAxis}
            padding={{ bottom: 10 }}
          />
          <YAxis 
            domain={[0, yAxisUpperLimit]}
            tickFormatter={(value) => `${value.toFixed(0)}%`}
            stroke="var(--charts-supporting-colour)"
            tick={{fontSize: 'var(--charts-title-secondary)'}}
          />
          <Tooltip 
            content={<CustomTooltip />}
            cursor={{
              stroke: 'var(--charts-border-and-line-colour)',
              strokeDasharray: '3 3',
              strokeWidth: 2,
              fill: 'transparent'
            }}
          />
          <Area 
            type="monotone" 
            dataKey={chartYAxisDataKey}
            stroke="var(--green-500)" 
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorAPY)"
            activeDot={{
              r: 6,
              stroke: "var(--green-500)",
              strokeWidth: 2,
              fill: "var(--charts-background-colour)"
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </li>
  );
};

export default Chart;
