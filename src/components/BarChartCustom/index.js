import styles from './styles.module.css';

import React, { useContext, useState, useEffect, useMemo } from 'react';

import { ReferenceLine, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList } from 'recharts';
import { format, parseISO, startOfMonth } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faChartPie, faChartBar, faCog, faXmark } from '@fortawesome/free-solid-svg-icons';

import ChartHeader from '../ChartHeader';
import ChartFooter from '../ChartFooter';

import { GlobalContext } from '../../context/GlobalContext';

import { METRIC_METADATA } from '../../constants/metrics';

const BarChartCustom = ({ 
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
    dailyChartYAxisDataKey,
    getDailyChartYAxisDataPoint,
    getYAxisDataPoint,
    yValueFormatter,
    symbolLocation,
    dataChainFilter,
    defaultChartType,
    dailyKey,
    lineKey,
  } = metricMetadata;
  // daily dailyData
  const dataChainFiltered = dataChainFilter(state[dailyKey], network);

  // cumulative dailyData
  const cumulativeDataFiltered = dataChainFilter(state[lineKey], network);

  const startDate = new Date(
    dataStartDate
      ? dataStartDate 
      : state[metric] && state[metric].length > 0 
        ? dataChainFiltered[0].ts
        : '2024-01-01' // default start date
  );

  const dailyData = dataChainFiltered
    .filter(item => new Date(item.ts) >= startDate) 
    .map(item => ({
      timestamp: parseISO(item.ts),
      [dailyChartYAxisDataKey]: getDailyChartYAxisDataPoint(item),
    }));

    const latestValue = cumulativeDataFiltered && cumulativeDataFiltered.length > 0
    ? getYAxisDataPoint(cumulativeDataFiltered[cumulativeDataFiltered.length - 1]).toFixed(2)
    : '';

  const latestDate = cumulativeDataFiltered && cumulativeDataFiltered.length > 0
    ? new Date(cumulativeDataFiltered[cumulativeDataFiltered.length - 1].ts)
    : new Date();

  useEffect(() => {
    setHighlightValue(latestValue);
  }, [latestValue]);

  const valueAndSymbol = (val) => {
    const symbolLeft = symbolLocation === 'left' ? (<span className={styles.symbol}>{chartYValueSymbol}</span>) : '';
    const symbolRight = symbolLocation === 'right' ? (<span className={styles.symbol}>{chartYValueSymbol}</span>) : '';

    return <>{symbolLeft}{yValueFormatter(val)}{symbolRight}</>;
  }

  const getDailyData = () => {
    return dailyData.map(item => ({
      date: item.timestamp,
      value: item[metricMetadata.dailyChartYAxisDataKey],
    }));
  };
  
  const getMonthlyData = () => {
    const monthlyData = {};
    
    dailyData.forEach(item => {
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

  const yAxisDomain = useMemo(() => {
    const allValues = chartData.flatMap(d => 
      timeFilter === 'monthly' ? [d.avg, d.max] : [d.value]
    );
    const minValue = Math.min(0, ...allValues);
    const maxValue = Math.max(0, ...allValues);
    return [minValue * 1.1, maxValue * 1.1];
  }, [chartData, timeFilter]);

  /*
    - first and last always display
    - first gets month day, year
    - then first and middle of every month with month day
    - if jan then month day, year
  */
  const getTicksToShow = (dailyData) => {
    const ticks = [];
    const months = new Set();
    const monthCounts = {};

    dailyData.forEach((item, index) => {
      const date = new Date(item.date);
      const firstItem = index === 0;
      const lastItem = index === dailyData.length - 1;

      // Always include the first and last ticks
      if (firstItem || lastItem) {
        ticks.push(item.date);
        return;
      }

      const monthKey = `${date.getFullYear()}-${date.getMonth()}`;
      const day = date.getDate();

      // Include the first dailyData point of the month
      if (!months.has(monthKey)) {
        ticks.push(item.date);
        months.add(monthKey);
        monthCounts[monthKey] = 1;
      } else {
        // Limit to only one tick around the middle of the month
        if (day === 15 && monthCounts[monthKey] < 2) {
          ticks.push(item.date);
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
      const isFirstTickOfYear = index === 0 || (index > 0 && new Date(ticks[index - 1]).getFullYear() !== date.getFullYear());
  
      return {
        tick,
        isFirstTickOfYear
      };
    });
  
    return formattedTicks;
  };
  
  const formatYAxis = (tickItem) => {
    const symbolLeft = symbolLocation === 'left' ? chartYValueSymbol : '';
    const symbolRight = symbolLocation === 'right' ? chartYValueSymbol : '';

    return symbolLeft + yValueFormatter(tickItem) + symbolRight;
  }

  const CustomTooltip = ({ active, payload }) => {
    const isNegativeClass = val => {
      return val < 0
        ? 'negativeValue'
        : '';
    }

    if (active && payload && payload.length) {
      const date = payload[0].payload.date;
      if (timeFilter === 'monthly') {
        const avgValue = payload.find(p => p.dataKey === 'avg')?.value.toFixed(2);
        const maxValue = payload.find(p => p.dataKey === 'max')?.value.toFixed(2);

        return (
          <div className={styles.tooltip}>
            <p className={styles.tooltipDate}>{format(date, 'MMMM yyyy')}</p>
            <p className={styles.tooltipValue}>
              <span className={styles.tooltipValueType}>Avg:</span> 
              {valueAndSymbol(avgValue)}
            </p>
            <p className={styles.tooltipValue}>
              <span className={styles.tooltipValueType}>Max:</span> 
              {valueAndSymbol(maxValue)}
            </p>
          </div>
        );
      } else {
        const value = payload[0].value.toFixed(2);
        const negativeClass = isNegativeClass(value);

        return (
          <div className={styles.tooltip}>
            <p className={styles.tooltipDate}>{format(date, 'MMMM d, yyyy')}</p>
            <p className={`${styles.tooltipValue} ${styles[negativeClass]}`}>
              <span className={styles.tooltipValueType}>Max:</span> 
              <span className={`${styles.tooltipFigure} ${styles[negativeClass]}`}>
                {valueAndSymbol(value)}
              </span>
            </p>
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
    const text = xAxisTickFormatter(date);

    return (
      <g transform={`translate(${x},${y})`}>
        <text 
          x={0} 
          y={0} 
          dy={16} 
          textAnchor="middle"
          fill="var(--charts-supporting-colour)"
          transform="rotate(0)"
          className={styles.tickLabel}
        >
          {text}
        </text>
      </g>
    );
  };

  const fullScreenClass = isFullScreen 
    ? 'fullScreen'
    : '';

  const renderExitFullScreen = isFullScreen 
    ? (
      <div 
        className={`${styles.exitFullScreen} ${styles.chartIcon}`} 
        onClick={toggleFullScreen}
      >
        <FontAwesomeIcon className={styles.exitIcon} icon={faXmark} />
      </div>
    ) : '';

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

    if (timeFilter === 'daily') {
      const legendText = metric === 'apy'
        ? 'Avg % Δ'
        : metric === 'openInterest'
          ? 'Avg'
          : 'Max';

      return (
        <div className={styles.legend}>
          <div className={styles.legendItem}>
            <div className={styles.legendColor} style={{ backgroundColor: 'var(--cyan-300)' }}></div>
            <span className={styles.legendText}>{legendText}</span>
          </div>
        </div>
      );
    }
    return null;
  };

  const xAxisTicks = getTicksToShow(chartData);
  const formattedTicks = getFormattedTicks(xAxisTicks);

  const xAxisTickFormatter = (tickItem) => {
    const date = new Date(tickItem);

    const isFirstTickOfYear = formattedTicks.find(
      (obj) => {
        return new Date(obj.tick).getTime() === new Date(tickItem).getTime() && obj.isFirstTickOfYear;
      }
    );    
  
    if (isFirstTickOfYear) {
      return `${format(date, 'MMM d')},\n${format(date, 'yyyy')}`;
    }
  
    return format(date, 'MMM d');
  };

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
          latestDate={latestDate}
          valueAndSymbol={valueAndSymbol}
          CustomLegend={CustomLegend}
        />
        <div className={styles.chartWrapper}>
          <ResponsiveContainer width="100%" height={isFullScreen ? "100%" : 300}>
            <BarChart 
              data={chartData} 
              margin={{ top: 20, right: 30, left: 20, bottom: -10 }}
              barSize={timeFilter === 'daily' ? 5 : 25}
            >
              <defs>
                <pattern id="patternStripePositive" width="4" height="4" patternUnits="userSpaceOnUse">
                  <rect width="4" height="4" fill="var(--cyan-300)"/>
                  <path d="M0,0 L4,4 M4,0 L0,4" stroke="var(--cyan-300)" strokeWidth={1}/>
                </pattern>
                <pattern id="patternStripeNegative" width="4" height="4" patternUnits="userSpaceOnUse">
                  <rect width="4" height="4" fill="var(--cyan-300)"/>
                  <path d="M0,0 L4,4 M4,0 L0,4" stroke="var(--cyan-900)" strokeWidth={1}/>
                </pattern>
                <linearGradient id="colorAPYPositive" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--cyan-300)" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="var(--cyan-300)" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorAPYNegative" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--cyan-900)" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="var(--cyan-900)" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="date" 
                tickFormatter={xAxisTickFormatter} 
                stroke="var(--charts-supporting-colour)"
                angle={-45}
                textAnchor="end"
                height={60}
                tick={<CustomTick />}
                ticks={xAxisTicks}
                interval={'preserveStartEnd'}
                padding={{ left: 4 }}
                axisLine={{ stroke: 'var(--charts-supporting-colour)', strokeWidth: 2 }}
              />
              {chartData.length > 0 && (
                <YAxis 
                  domain={yAxisDomain}
                  tickFormatter={formatYAxis}
                  stroke="var(--charts-supporting-colour)"
                  tick={{fontSize: 'var(--charts-title-secondary)'}}
                  style={{ fontSize: '12px' }}
                />
              )}
              <Tooltip 
                content={<CustomTooltip />}
                cursor={<CustomCursor />}
              />
              {timeFilter === 'monthly' ? (
                <>
                  <Bar dataKey="avg" fill="url(#patternStripePositive)" stackId="a">
                    {chartData.map((entry, index) => (
                      <Cell 
                        lineKey={`cell-${index}`} 
                        fill={entry.avg >= 0 ? "url(#patternStripePositive)" : "url(#patternStripeNegative)"}
                        fillOpacity={entry.avg >= 0 ? 1 : 0.8}
                      />
                    ))}
                  </Bar>
                  <Bar dataKey="max" fill="url(#colorAPYPositive)" fillOpacity={0.4} stackId="a">
                    {chartData.map((entry, index) => (
                      <Cell 
                        lineKey={`cell-${index}`} 
                        fill={entry.max >= 0 ? "url(#colorAPYPositive)" : "url(#colorAPYNegative)"}
                        fillOpacity={entry.max >= 0 ? 0.4 : 0.6}
                      />
                    ))}
                  </Bar>
                </>
              ) : (
                <Bar dataKey="value" stroke="black" strokeWidth={1}>
                  {chartData.map((entry, index) => (
                    <Cell 
                      lineKey={`cell-${index}`} 
                      fill={entry.value >= 0 ? "url(#patternStripePositive)" : "url(#patternStripeNegative)"}
                      fillOpacity={entry.value >= 0 ? 1 : 0.8}
                    />
                  ))}
                </Bar>
              )}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <ChartFooter 
        onChartTypeChange={onChartTypeChange}
        activeChartType="bar"
        toggleFullScreen={toggleFullScreen}
        isFullScreen={isFullScreen}      
      />
    </li>
  );
};

export default BarChartCustom;