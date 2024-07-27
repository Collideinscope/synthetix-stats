import React, { useContext, useState, useEffect, useMemo } from 'react';
import styles from './styles.module.css';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList } from 'recharts';
import { format, parseISO, startOfMonth } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faChartPie, faChartBar, faCog } from '@fortawesome/free-solid-svg-icons';

import { GlobalContext } from '../../context/GlobalContext';

import { METRIC_METADATA } from '../../constants/metrics';

const BarChartCustom = ({ 
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
    .map(item => ({
      timestamp: parseISO(item.ts),
      [chartYAxisDataKey]: getYAxisDataPoint(item, apyPeriod),
    }));

  const latestValue = data.length > 0
    ? data[data.length - 1][chartYAxisDataKey].toFixed(2) 
    : '';
  
  const handleApyPeriodChange = (period) => {
    setApyPeriod(period);
    setShowSettings(false);
  };
  
  useEffect(() => {
    setHighlightValue(latestValue);
  }, [latestValue]);

  const valueAndSymbol = (val) => {
    const symbolLeft = symbolLocation === 'left' ? (<span className={styles.symbol}>{chartYValueSymbol}</span>) : '';
    const symbolRight = symbolLocation === 'right' ? (<span className={styles.symbol}>{chartYValueSymbol}</span>) : '';

    return <>{symbolLeft}{yValueFormatter(val)}{symbolRight}</>;
  }

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
  
      monthlyData[monthKey].values.push(item[chartYAxisDataKey]);
    });
  
    return Object.values(monthlyData).map(({ month, values }) => {
      const avg = values.reduce((sum, val) => sum + val, 0) / values.length;
      const max = Math.max(...values);
      return {
        month,
        avg,
        maxDiff: max - avg,
      };
    });
  };

  const monthlyData = getMonthlyData();

  const yAxisUpperLimit = () => {
    return Math.ceil(Math.max(...monthlyData.map(d => d.avg + d.maxDiff)) * 1.1);
  };

  const formatXAxis = (tickItem) => {
    const date = new Date(tickItem);

    if (date.getMonth() === 0 && date.getDate() === 1) {
      return format(date, 'yyyy');
    }

    return format(date, 'MMM');
  }

  const formatYAxis = (tickItem) => {
    const symbolLeft = symbolLocation === 'left' ? chartYValueSymbol : '';
    const symbolRight = symbolLocation === 'right' ? chartYValueSymbol : '';

    return symbolLeft + yValueFormatter(tickItem) + symbolRight;
  }

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const avgValue = payload.find(p => p.dataKey === 'avg')?.value.toFixed(2);
      const maxValue = (parseFloat(avgValue) + payload.find(p => p.dataKey === 'maxDiff')?.value).toFixed(2);
  
      return (
        <div className={styles.tooltip}>
          <p>{format(payload[0].payload.month, 'MMMM yyyy')}</p>
          <p>Avg: {yValueFormatter(avgValue)}</p>
          <p>Max: {yValueFormatter(maxValue)}</p>
        </div>
      );
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
        <p className={styles.chartSubtitle}>{chain}</p>
        <p className={styles.chartSubtitle}>{pool}</p>
        <p className={styles.chartSubtitle}>{collateral_type}</p>
      </div>
    );
  }

  const CustomLegend = () => {
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
  };

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
            {format(new Date(data[data.length - 1].timestamp), 'MMM d, yyyy')}
          </p>
        </p>
      </div>
      <div className={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart 
            data={monthlyData} 
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            barSize={25}
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
              dataKey="month" 
              tickFormatter={formatXAxis} 
              stroke="var(--charts-supporting-colour)"
              angle={-45}
              textAnchor="end"
              height={60}
              tick={<CustomTick />}
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
                }
              }}
            />
            <Bar dataKey="avg" fill="url(#patternStripe)" stackId="a">
            </Bar>
            <Bar dataKey="maxDiff" fill="url(#colorAPY)" stackId="a">
            </Bar>
          </BarChart>
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

export default BarChartCustom;