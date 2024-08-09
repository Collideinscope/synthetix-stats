import styles from './styles.module.css';

import React, { useContext, useState, useEffect, useMemo } from 'react';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList } from 'recharts';
import { format, parseISO, startOfMonth } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faChartPie, faChartBar, faCog } from '@fortawesome/free-solid-svg-icons';

import { GlobalContext } from '../../context/GlobalContext';

import { METRIC_METADATA } from '../../constants/metrics';

const BarChartCustom = ({ 
    metric, 
    network,
    pool,
    collateral_type,
    showFilters,
    onChartTypeChange,  
    onDataTypeChange,
    timeFilter,
    dataType,
  }) => {
  const [highlightValue, setHighlightValue] = useState(null);

  const { state } = useContext(GlobalContext);

  const [showSettings, setShowSettings] = useState(false);
  const [apyPeriod, setApyPeriod] = useState('28d');

  const metricMetadata = METRIC_METADATA[metric];
  const {
    chartTitle,
    chartYValueSymbol,
    dataStartDate,
    chartYAxisDataKey,
    dailyChartYAxisDataKey,
    getDailyChartYAxisDataPoint,
    getYAxisDataPoint,
    yValueFormatter,
    symbolLocation,
    dataChainFilter,
    defaultChartType,
    dailyKey,
  } = metricMetadata;

  const dataChainFiltered = dataChainFilter(state[dailyKey], network);
  
  const startDate = new Date(
    dataStartDate
      ? dataStartDate 
      : state[metric].length > 0 
        ? dataChainFiltered[0].ts
        : '2024-01-01' // default start date
  );

  const data = dataChainFiltered
    .filter(item => new Date(item.ts) >= startDate) 
    .map(item => ({
      timestamp: parseISO(item.ts),
      [dailyChartYAxisDataKey]: getDailyChartYAxisDataPoint(item),
    }));

  // Get the cumulative data
  const cumulativeData = dataChainFilter(state[metric], network);

  // Calculate the latest cumulative value
  const latestCumulativeValue = cumulativeData.length > 0
    ? parseFloat(cumulativeData[cumulativeData.length - 1][chartYAxisDataKey])
    : 0;

  const latestDate = cumulativeData.length > 0
    ? new Date(cumulativeData[cumulativeData.length - 1].ts)
    : new Date();
    console.log(latestCumulativeValue)

  useEffect(() => {
    setHighlightValue(latestCumulativeValue.toFixed(2));
  }, [latestCumulativeValue]);

  const valueAndSymbol = (val) => {
    const symbolLeft = symbolLocation === 'left' ? (<span className={styles.symbol}>{chartYValueSymbol}</span>) : '';
    const symbolRight = symbolLocation === 'right' ? (<span className={styles.symbol}>{chartYValueSymbol}</span>) : '';

    return <>{symbolLeft}{yValueFormatter(val)}{symbolRight}</>;
  }

  const getDailyData = () => {
    return data.map(item => ({
      date: item.timestamp,
      value: item[metricMetadata.dailyChartYAxisDataKey],
    }));
  };
  
  const getMonthlyData = () => {
    const monthlyData = {};
    
    data.forEach(item => {
      const monthStart = startOfMonth(item.timestamp);
      const monthKey = format(monthStart, 'yyyy-MM');
  
      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = {
          month: monthStart,
          values: [],
        };
      }
  
      monthlyData[monthKey].values.push(item[metricMetadata.dailyChartYAxisDataKey]);
    });
  
    return Object.values(monthlyData).map(({ month, values }) => ({
      date: month,
      avg: values.reduce((sum, val) => sum + val, 0) / values.length,
      max: Math.max(...values),
    }));
  };

  const chartData = timeFilter === 'monthly'
   ? getMonthlyData() 
   : getDailyData();

   const yAxisUpperLimit = () => {
    if (timeFilter === 'monthly') {
      return Math.ceil(Math.max(...chartData.map(d => d.max)) * 1.1);
    } else {
      return Math.ceil(Math.max(...chartData.map(d => d.value)) * 1.1);
    }
  };

  const formatXAxis = (tickItem) => {
    const date = new Date(tickItem);

    if (date.getMonth() === 0 && date.getDate() === 1) {
      return format(date, 'yyyy');
    }

    if (date.getDate() === 1 || ((timeFilter === 'daily') && (date.getDate() === 8 || date.getDate() === 16 || date.getDate() === 24))) {
      return format(date, 'MMM d');
    }

    return timeFilter === 'daily'
      ? ''
      : format(date, 'MMM');
  }

  const formatYAxis = (tickItem) => {
    const symbolLeft = symbolLocation === 'left' ? chartYValueSymbol : '';
    const symbolRight = symbolLocation === 'right' ? chartYValueSymbol : '';

    return symbolLeft + yValueFormatter(tickItem) + symbolRight;
  }

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const date = payload[0].payload.date;
      if (timeFilter === 'monthly') {
        const avgValue = payload.find(p => p.dataKey === 'avg')?.value.toFixed(2);
        const maxValue = payload.find(p => p.dataKey === 'max')?.value.toFixed(2);
    
        return (
          <div className={styles.tooltip}>
            <p>{format(date, 'MMMM yyyy')}</p>
            <p>Avg: {yValueFormatter(avgValue)}</p>
            <p>Max: {yValueFormatter(maxValue)}</p>
          </div>
        );
      } else {
        const value = payload[0].value.toFixed(2);
        return (
          <div className={styles.tooltip}>
            <p>{format(date, 'MMMM d, yyyy')}</p>
            <p>Value: {yValueFormatter(value)}</p>
          </div>
        );
      }
    }
  
    return null;
  };

  const CustomCursor = ({ x, y, width, height, stroke }) => {
    return (
      <rect x={x} y={y} width={width} height={height} fill="none" stroke={stroke} />
    );
  };

  const CustomTick = ({ x, y, payload }) => {
    const date = new Date(payload.value);
    const isMonthOrYear = date.getDate() === 1;
    const text = formatXAxis(payload.value);

    return (
      <g transform={`translate(${x},${y})`}>
        <text 
          x={0} 
          y={0} 
          dy={16} 
          textAnchor="middle"
          fill="var(--charts-supporting-colour)"
          transform="rotate(0)"
          className={isMonthOrYear ? styles.largeTick : styles.smallTick}
        >
          {text}
        </text>
      </g>
    );
  };

  const renderFilters = () => {
    if (!showFilters) return null;

    return (
      <div className={styles.titleMeta}>
        <p className={styles.chartSubtitle}>{network}</p>
        <p className={styles.chartSubtitle}>{pool}</p>
        <p className={styles.chartSubtitle}>{collateral_type}</p>
      </div>
    );
  }

  const CustomLegend = () => {
    if (timeFilter === 'monthly') {
      return (
        <div className={styles.legend}>
          <div className={styles.legendItem}>
            <div className={styles.legendColor} style={{ backgroundColor: 'var(--cyan-300)' }}></div>
            <span className={styles.legendText}>Avg</span>
          </div>
          <div className={styles.legendItem}>
            <div className={styles.legendColor} style={{ backgroundColor: 'var(--cyan-300)', opacity: 0.4 }}></div>
            <span className={styles.legendText}>Max</span>
          </div>
        </div>
      );
    }
    return null;
  };

  if (!data || data.length === 0) {
    return '';
  }
console.log(data)
  return (
    <li className={styles.container}>
      <div className={styles.chartHeader}>
        <div className={styles.titleContainer}>
          <h3 className={styles.chartTitle}>{chartTitle}</h3>
          {renderFilters()}
          <CustomLegend />
        </div>
        <p className={styles.latestValue}>
          {valueAndSymbol(highlightValue)}
          <p className={styles.latestValueDate}>
            {format(new Date(latestDate), 'MMM d, yyyy')}
          </p>
        </p>
      </div>
      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart 
            data={chartData} 
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            barSize={timeFilter === 'daily' ? 5 : 25}
          >
            <defs>
              <pattern id="patternStripe" width="4" height="4" patternUnits="userSpaceOnUse">
                <rect width="4" height="4" fill="var(--cyan-300)"/>
                <path d="M0,0 L4,4 M4,0 L0,4" stroke="var(--cyan-300)" strokeWidth={1}/>
              </pattern>
              <linearGradient id="colorAPY" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--cyan-300)" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="var(--cyan-300)" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="date" 
              tickFormatter={formatXAxis} 
              stroke="var(--charts-supporting-colour)"
              angle={-45}
              textAnchor="end"
              height={60}
              tick={<CustomTick />}
              interval={timeFilter === 'daily' ? 0 : 'preserveStartEnd'}
            />
            <YAxis 
              domain={[0, yAxisUpperLimit]}
              tickFormatter={formatYAxis}
              stroke="var(--charts-supporting-colour)"
              tick={{fontSize: 'var(--charts-title-secondary)'}}
              style={{ fontSize: '12px' }}
            />
            <Tooltip 
              content={<CustomTooltip />}
              cursor={<CustomCursor />}
            />
            {timeFilter === 'monthly' ? (
              <>
                <Bar dataKey="avg" fill="url(#colorBar)" stackId="a" />
                <Bar dataKey="max" fill="url(#colorBar)" fillOpacity={0.4} stackId="a" />
              </>
            ) : (
              <Bar dataKey="value" fill="url(#colorBar)" />
            )}
          </BarChart>
        </ResponsiveContainer>
      </div>
     
      <div className={styles.chartFooter}>
        <div className={styles.chartIconsRight}>
          <div
            className={`${styles.chartIcon}`}
            onClick={() => onChartTypeChange('line')}
          >
            <FontAwesomeIcon icon={faChartLine} />
          </div>
          <div
            className={`${styles.chartIcon} ${styles.active}`}
            onClick={() => onChartTypeChange('bar')}
          >
            <FontAwesomeIcon icon={faChartBar} />
          </div>
          <div
            className={`${styles.chartIcon}`}
            onClick={() => onChartTypeChange('radial')}
          >
            <FontAwesomeIcon icon={faChartPie} />
          </div>
        </div>
      </div>
    </li>
  );
};

export default BarChartCustom;