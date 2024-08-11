import styles from './styles.module.css';

import React, { useContext, useState, useRef, useEffect } from 'react';

import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { format, parseISO } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faChartPie, faChartBar, faCog } from '@fortawesome/free-solid-svg-icons';

import { METRIC_METADATA } from '../../constants/metrics';
import { abbreviateNumber } from "../../helpers";

import { GlobalContext } from '../../context/GlobalContext';

import ChartHeader from '../ChartHeader';
import ChartFooter from '../ChartFooter';

const RadialChart = ({
  metric,
  network,
  pool,
  collateral_type,
  showFilters,
  onChartTypeChange,  
}) => {
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
    summaryDataKey,
  } = metricMetadata;

  const dataChainFiltered = dataChainFilter(state[metric], network);

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

  const handleApyPeriodChange = (period) => {
    setApyPeriod(period);
    setShowSettings(false);
  };

  const ath = Math.max(...data.map(d => d[chartYAxisDataKey]));
  const atl = Math.min(...data.map(d => d[chartYAxisDataKey]));

  const ath_percentage = state[summaryDataKey].ath_percentage;
  const atl_percentage = state[summaryDataKey].atl_percentage;

  const formattedData = [
    { name: 'Current', value: ((latestValue - atl) / (ath - atl)) * 100, fill: 'url(#gradientGreenCyan)' }
  ];

  const renderDelta = (value) => {
    const isPositive = value >= 0;
    const icon = isPositive ? '▲' : '▼';
  
    return `${icon}${abbreviateNumber(Math.abs(value))}%`;
  };
  
  const CustomTick = ({ cx, cy, payload }) => {
    const value = payload.value;
    let displayLabel, displayValue, delta, x, y, anchor, lineX1, lineY1, lineX2, lineY2;
  
    if (value === 100) {
      displayLabel = 'ATH';
      displayValue = `${valueAndSymbolSVG(ath)}`;
      delta = renderDelta(ath_percentage); 
      x = cx;
      y = cy - 148;
      anchor = "start";
      lineX1 = cx;
      lineY1 = cy - 138;
      lineX2 = cx;
      lineY2 = cy - 128;
    } else if (value === 0) {
      displayLabel = 'ATL';
      displayValue = `${valueAndSymbolSVG(atl)}`;
      delta = renderDelta(atl_percentage); 
      x = cx;
      y = cy + 146;
      anchor = "start";
      lineX1 = cx;
      lineY1 = cy + 126;
      lineX2 = cx;
      lineY2 = cy + 136;
    } else {
      return null;
    }
  
    const isPositive = (value === 100 ? ath_percentage : atl_percentage) >= 0;
    const colorClass = isPositive ? styles.positive : styles.negative;
  
    return (
      <g>
        <line
          x1={lineX1}
          y1={lineY1}
          x2={lineX2}
          y2={lineY2}
          stroke="var(--charts-border-and-line-colour)"
          strokeWidth={2}
        />
        <text
          x={x}
          y={y}
          textAnchor={anchor}
          dominantBaseline="middle"
        >
          <tspan className={styles.statLabel}>
            {displayLabel}:
          </tspan>
          <tspan className={styles.statValue} dx="5" letterSpacing="0.5">
            {displayValue}
          </tspan>
          <tspan className={`${styles.statDelta} ${colorClass}`} dx="5">
            {delta}
          </tspan>
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

  const valueAndSymbolSVG= (val) => {
    const symbolLeft = symbolLocation === 'left' ? chartYValueSymbol : '';
    const symbolRight = symbolLocation === 'right' ? chartYValueSymbol : '';
    return `${symbolLeft}${yValueFormatter(val)}${symbolRight}`;
  }

  const valueAndSymbol = (val) => {
    const symbolLeft = symbolLocation === 'left' ? (<span className={styles.symbol}>{chartYValueSymbol}</span>) : '';
    const symbolRight = symbolLocation === 'right' ? (<span className={styles.symbol}>{chartYValueSymbol}</span>) : '';

    return <>{symbolLeft}{yValueFormatter(val)}{symbolRight}</>;
  }

  const latestValueDate = new Date(data[data.length - 1].timestamp);

  return (
    <li className={styles.container}>
      <ChartHeader 
        chartTitle={chartTitle}
        timeFilter={null}
        highlightValue={null}
        latestDate={latestValueDate}
        valueAndSymbol={valueAndSymbol}
        CustomLegend={null}
      />
      <div className={styles.radialChartWrapper}>
        <div className={styles.radialChartInner}>
          <div className={styles.centerBubble}>
            <span className={styles.centerValue}>{valueAndSymbol(latestValue)}</span>
            <p className={styles.latestValueDate}>
              {format(latestValueDate, 'MMM d, yyyy')}
            </p>
          </div>
          <RadialBarChart
            width={320}
            height={366.58}
            cx="55%"
            cy="50%"
            innerRadius={110}
            outerRadius={160}
            barSize={16}
            data={formattedData}
            startAngle={-90}
            endAngle={90}
          >
            <defs>
              <linearGradient id="gradientGreenCyan" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--cyan-300)" stopOpacity={0.9}/>
                <stop offset="100%" stopColor="var(--cyan-300)" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <PolarAngleAxis
              type="number"
              domain={[0, 100]}
              angleAxisId={0}
              tick={<CustomTick />}
            />
            <RadialBar
              minAngle={0}
              background={{ fill: 'transparent', stroke: 'var(--charts-border-and-line-colour)', strokeWidth: 1 }}
              clockWise
              dataKey="value"
              cornerRadius={0}
              fill="url(#gradientGreenCyan)"
              stroke="var(--charts-border-and-line-colour)"
              strokeWidth={1}
            />
            <path
              d={`
                M ${300 * 0.59} ${300 / 2 - 95}
                A 100 100 0 0 1 ${300 * 0.59} ${300 / 2 + 160}
              `}
              fill="none"
              stroke="var(--charts-border-and-line-colour)"
              strokeWidth={1}
            />
          </RadialBarChart>
        </div>
      </div>
      <ChartFooter 
        onChartTypeChange={onChartTypeChange}
        activeChartType="radial"
      />
    </li>
  );
};

export default RadialChart;