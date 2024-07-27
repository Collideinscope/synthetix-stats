import React, { useContext, useState, useEffect } from 'react';
import styles from './styles.module.css';

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { format, parseISO } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faChartPie, faChartBar, faCog } from '@fortawesome/free-solid-svg-icons';

import { GlobalContext } from '../../context/GlobalContext';

import { METRIC_METADATA } from '../../constants/metrics';

const AreaChartCustom = ({ 
    metric, 
    chain,
    pool,
    collateral_type,
    showFilters,
    onChartTypeChange,  
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
    getYAxisDataPoint,
    yValueFormatter,
    symbolLocation,
    dataChainFilter,
    smoothData,
  } = metricMetadata;
  const dataChainFiltered = dataChainFilter(state[metric], chain);

  const startDate = new Date(
    dataStartDate
      ? dataStartDate 
      : state[metric].length > 0 
        ? dataChainFiltered[0].ts
        : '2024-01-01' // default start date
  );

  const data = dataChainFiltered
    .filter(item => new Date(item.ts) >= startDate) 
    .map(item => {
      return {
        timestamp: parseISO(item.ts),
        [chartYAxisDataKey]: getYAxisDataPoint(item, apyPeriod),
      }
    });

    const latestValue = data.length > 0
    ? data[data.length - 1][chartYAxisDataKey].toFixed(2) 
    : '';

  const latestValueDate = data.length > 0
    ? format(new Date(data[data.length - 1].timestamp), 'MMM d, yyyy')
    : '';
  
  const handleApyPeriodChange = (period) => {
    setApyPeriod(period);
    setShowSettings(false);
  };

  useEffect(() => {
    setHighlightValue(latestValue);
  }, [latestValue]);

  const onHighlightValueChange = (value) => {
    setHighlightValue(value);
  }

  // 7day moving average expecting hourly data
  const smoothenData = (data, windowSize = 168) => {
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
    
  const smoothedData = smoothData
    ? smoothenData(data)
    : data;

  const maxYValue = Math.max(...data.map(d => d[chartYAxisDataKey]));
  const yAxisUpperLimit = Math.ceil(maxYValue * 1.1);

  const formatXAxis = (tickItem) => {
    const date = new Date(tickItem);

    if (date.getMonth() === 0 && date.getDate() === 1) {
      return format(date, 'yyyy');
    }

    if (date.getDate() === 1) {
      return format(date, 'MMM');
    }

    return format(date, 'd');
  }

  const ticksXAxis = data.reduce((acc, item, index, arr) => {
    const currentDate = new Date(item.timestamp);
    const day = currentDate.getDate();
    const len = arr.length;

    // Always include the first data point
    if (index === 0 || index === len - 1) {
      acc.push(currentDate);
      return acc;
    }
  
    // Add first day of month, 8th, 16th, and 24th for hourly data
    if (day === 1 || day === 8 || day === 16 || day === 24) {
      if (!acc.some(date => date.getTime() === currentDate.getTime())) {
        acc.push(currentDate);
      }
    }

    return acc;
  }, []);

  // Sort the ticks chronologically
  ticksXAxis.sort((a, b) => a.getTime() - b.getTime());

  const formatYAxis = (tickItem) => {
    const symbolLeft = symbolLocation === 'left' ? chartYValueSymbol : '';
    const symbolRight = symbolLocation === 'right' ? chartYValueSymbol : '';

    return symbolLeft + yValueFormatter(tickItem) + symbolRight;
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const value = payload[0].value.toFixed(2);
      onHighlightValueChange(value);

      return (
        <div className={styles.tooltip}>
          <p>{format(new Date(label), 'MMM dd, yyyy')}</p>
        </div>
      );
    }

    onHighlightValueChange(latestValue);

    return null;
  };

  const CustomCursor = ({ points, width, height, payload }) => {
    if (!points || points.length === 0 || !payload || payload.length === 0) return null;
    const { x, y } = points[0];
    const dataY = payload[0].payload[payload[0].dataKey];
    const yScale = height / (yAxisUpperLimit || 1); 
    const scaledY = height - (dataY * yScale);
  
    return (
      <line 
        x1={x} 
        y1={scaledY} 
        x2={x} 
        y2={height} 
        stroke="var(--charts-border-and-line-colour)" 
        strokeDasharray="3 3" 
      />
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

  const valueAndSymbol = (val) => {
    const symbolLeft = symbolLocation === 'left' ? (<span className={styles.symbol}>{chartYValueSymbol}</span>) : '';
    const symbolRight = symbolLocation === 'right' ? (<span className={styles.symbol}>{chartYValueSymbol}</span>) : '';

    return <>{symbolLeft}{yValueFormatter(val)}{symbolRight}</>;
  }

  const renderFilters = () => {
    if (!showFilters) return null;

    return (
      <div className={styles.titleMeta}>
        <p className={styles.chartSubtitle}>{chain}</p>
        <p className={styles.chartSubtitle}>{pool}</p>
        <p className={styles.chartSubtitle}>{collateral_type}</p>
      </div>
    );
  }

  return (
    <li className={styles.container}>
      <div className={styles.chartHeader}>
        <div className={styles.titleContainer}>
          <h3 className={styles.chartTitle}>{chartTitle}</h3>
          {renderFilters()}
        </div>
        <p className={styles.latestValue}>
          {valueAndSymbol(highlightValue)}
          <p className={styles.latestValueDate}>
            {latestValueDate}
          </p>
        </p>
      </div>
      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart 
            data={smoothedData} 
            margin={{ top: 0, right: 30, left: 15, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorAPY" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--cyan-300)" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="var(--cyan-300)" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="timestamp" 
              tickFormatter={formatXAxis} 
              stroke="var(--charts-supporting-colour)"
              angle={-45}
              textAnchor="end"
              height={60}
              tick={<CustomTick />}
              ticks={ticksXAxis}
              padding={{ bottom: 10 }}
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
              onMouseMove={(e) => {
                if (e.activePayload && e.activePayload.length > 0) {
                  onHighlightValueChange(e.activePayload[0].value);
                }
              }}
            />
            <Area 
              type="monotone" 
              dataKey={chartYAxisDataKey}
              stroke="var(--cyan-300)" 
              strokeWidth={2}
              fillOpacity={0.6}
              fill="url(#colorAPY)"
              activeDot={{
                r: 6,
                stroke: "var(--cyan-300)",
                strokeWidth: 2,
                fill: "var(--charts-background-colour)"
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className={styles.chartFooter}>
        <div className={styles.chartIconsLeft}>
          <div
            className={`${styles.chartIcon}`}
            onClick={() => setShowSettings(!showSettings)}
          >
            <FontAwesomeIcon icon={faCog} />
          </div>
          {showSettings && (
            <div className={styles.settingsMenu}>
              <div
                className={`${styles.settingsOption} ${apyPeriod === '7d' ? styles.active : ''}`}
                onClick={() => handleApyPeriodChange('7d')}
              >
                7d
              </div>
              <div
                className={`${styles.settingsOption} ${apyPeriod === '28d' ? styles.active : ''}`}
                onClick={() => handleApyPeriodChange('28d')}
              >
                28d
              </div>
            </div>
          )}
        </div>
        <div className={styles.chartIconsRight}>
          <div
            className={`${styles.chartIcon} ${styles.active}`}
            onClick={() => onChartTypeChange('line')}
          >
            <FontAwesomeIcon icon={faChartLine} />
          </div>
          <div
            className={`${styles.chartIcon}`}
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

export default AreaChartCustom;
