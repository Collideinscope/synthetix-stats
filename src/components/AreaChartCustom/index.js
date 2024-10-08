import styles from './styles.module.css';

import React, { useContext, useState, useEffect } from 'react';

import { AreaChart, Area, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { parseISO } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import ChartHeader from '../ChartHeader';
import ChartFooter from '../ChartFooter';

import { GlobalContext } from '../../context/GlobalContext';

import { METRIC_METADATA } from '../../constants/metrics';

const AreaChartCustom = ({ 
  metric, 
  network,
  pool,
  collateral_type,
  onChartTypeChange,
  onTimeFilterChange,
  timeFilter,
  isFullScreen,
  toggleFullScreen,
}) => {
  
  const [highlightValue, setHighlightValue] = useState(null);
  
  const { state } = useContext(GlobalContext);

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
    lineKey,
  } = metricMetadata;

  const dataChainFiltered = dataChainFilter(state[lineKey], network);

  const startDate = parseISO(
    dataStartDate
      ? dataStartDate 
      : state[lineKey].length > 0 
        ? dataChainFiltered[0].ts
        : '2024-01-01' // default start date
  );

  const data = dataChainFiltered
    .filter(item => parseISO(item.ts).getTime() >= startDate.getTime()) 
    .map(item => {
      const timestamp = parseISO(item.ts).getTime();
      return {
        timestamp,
        [chartYAxisDataKey]: getYAxisDataPoint(item),
      }
    });

  const latestValue = data && data.length > 0
    ? data[data.length - 1][chartYAxisDataKey].toFixed(2) 
    : '';

  const latestValueDate = data && data.length > 0
    ? data[data.length - 1].timestamp
    : '';

  useEffect(() => {
    setHighlightValue(latestValue);
  }, [latestValue]);

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

  const getTicksToShow = (data) => {
    const ticks = [];
    const months = new Set();
    const monthCounts = {};
  
    data.forEach((item, index) => {
      const date = new Date(item.timestamp);
      const firstItem = index === 0;
      const lastItem = index === data.length - 1;
  
      if (firstItem || lastItem) {
        ticks.push(item.timestamp);
        return;
      }
  
      const monthKey = `${date.getUTCFullYear()}-${date.getUTCMonth()}`;
      const day = date.getUTCDate();
  
      if (!months.has(monthKey)) {
        ticks.push(item.timestamp);
        months.add(monthKey);
        monthCounts[monthKey] = 1;
      } else {
        if (day === 15 && monthCounts[monthKey] < 2) {
          ticks.push(item.timestamp);
          monthCounts[monthKey] += 1;
        }
      }
    });
  
    return ticks;
  };
  
  const getFormattedTicks = (ticks) => {
    const formattedTicks = ticks.map((tick, index) => {
      const date = new Date(tick);

      // Check if this tick is the first tick of the year
      const isFirstTickOfYear = index === 0 || (index > 0 && new Date(ticks[index - 1]).getUTCFullYear() !== date.getUTCFullYear());
  
      return {
        tick,
        isFirstTickOfYear
      };
    });
  
    return formattedTicks;
  };

  const xAxisTicks = getTicksToShow(smoothedData);
  const formattedTicks = getFormattedTicks(xAxisTicks);

  const xAxisTickFormatter = (tickItem) => {
    const date = new Date(tickItem);

    const isFirstTickOfYear = formattedTicks.find(
      (obj) => obj.tick === tickItem && obj.isFirstTickOfYear
    );    

    if (isFirstTickOfYear) {
      return `${formatInTimeZone(date, 'UTC', 'MMM d')},\n${formatInTimeZone(date, 'UTC', 'yyyy')}`;
    }

    return formatInTimeZone(date, 'UTC', 'MMM d');
  };

  const formatYAxis = (tickItem) => {
    const symbolLeft = symbolLocation === 'left' ? chartYValueSymbol : '';
    const symbolRight = symbolLocation === 'right' ? chartYValueSymbol : '';

    return symbolLeft + yValueFormatter(tickItem) + symbolRight;
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const value = payload[0].value.toFixed(2);

      const dateLabel = !label 
        ? ''
        : formatInTimeZone(new Date(label), 'UTC', 'MMM d, yyyy');

      return (
        <div className={styles.tooltip}>
          <p className={styles.tooltipDate}>
            {dateLabel}
          </p>
          <p className={styles.tooltipValue}>
            {valueAndSymbol(value)}
            </p>
        </div>
      );
    }
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
    const text = xAxisTickFormatter(payload.value);
    const [firstLine, secondLine] = text.split('\n');
  
    return (
      <g transform={`translate(${x},${y})`}>
        <text 
          x={0} 
          y={0} 
          dy={16} 
          textAnchor="middle"
          fill="var(--charts-supporting-colour)"
          className={styles.tickLabel}
        >
          <tspan x={0} dy="8">{firstLine}</tspan>
          {secondLine && <tspan x={0} dy="1.2em">{secondLine}</tspan>}
        </text>
      </g>
    );
  };  

  const valueAndSymbol = (val) => {
    const symbolLeft = symbolLocation === 'left' ? (<span className={styles.symbol}>{chartYValueSymbol}</span>) : '';
    const symbolRight = symbolLocation === 'right' ? (<span className={styles.symbol}>{chartYValueSymbol}</span>) : '';

    return <>{symbolLeft}{yValueFormatter(val)}{symbolRight}</>;
  }

  const fullScreenClass = isFullScreen 
    ? 'fullScreen'
    : '';

  const renderExitFullScreen = isFullScreen 
    ? (
      <div 
        className={`${styles.exitFullScreen} ${styles.chartIcon}`} 
        onClick={toggleFullScreen}
      >
        <p className={styles.exit}>
          <FontAwesomeIcon className={styles.exitIcon} icon={faXmark} />
        </p>
      </div>
    ) : '';

  return (
    <li className={`${styles.container} ${styles[fullScreenClass]}`}>
      {renderExitFullScreen}
      <div className={`${styles.chartContent} ${isFullScreen ? styles.fullScreenContent : ''}`}>
        <ChartHeader 
          network={network}
          metric={metric}
          chartTitle={chartTitle}
          timeFilter={timeFilter}
          highlightValue={highlightValue}
          latestDate={new Date(latestValueDate)}
          valueAndSymbol={valueAndSymbol}
          CustomLegend={null}
        />
        <div className={`${styles.chartWrapper}`}>
          <ResponsiveContainer width="100%" height={isFullScreen ? "100%" : 300}>
            <AreaChart 
              data={smoothedData} 
              margin={{ top: 0, right: 30, left: 15, bottom: -10 }}
            >
              <defs>
                <linearGradient id="colorAPY" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--cyan-300)" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="var(--cyan-300)" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="timestamp" 
                type="number"
                domain={['dataMin', 'dataMax']}
                scale="time"
                tickFormatter={xAxisTickFormatter} 
                stroke="var(--charts-supporting-colour)"
                angle={-45}
                textAnchor="end"
                height={60}
                tick={<CustomTick />}
                ticks={xAxisTicks}
                padding={{ left: 4 }}
                interval={'preserveStartEnd'}
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
              <Bar
                dataKey={chartYAxisDataKey}
                fill="var(--cyan-300)"
                opacity={0.5}
                barSize={5}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      <ChartFooter 
        onChartTypeChange={onChartTypeChange}
        activeChartType="area"
        toggleFullScreen={toggleFullScreen}
        isFullScreen={isFullScreen}
      />
    </li>
  );
};

export default AreaChartCustom;
