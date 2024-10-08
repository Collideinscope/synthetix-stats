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
  onChartTypeChange,
  onTimeFilterChange,
  timeFilter,
  isFullScreen,
  toggleFullScreen,
}) => {
  const { state } = useContext(GlobalContext);

  const metricMetadata = METRIC_METADATA[metric];

  const {
    chartTitle,
    chartYValueSymbol,
    radialType,
    radialKey,
    dataStartDate,
    chartYAxisDataKey,
    getYAxisDataPoint,
    yValueFormatter,
    symbolLocation,
    dataChainFilter,
    summaryDataKey,
    lineKey,
    dailyChartYAxisDataKey,
    getDailyChartYAxisDataPoint,
  } = metricMetadata;

  const dataChainFiltered = dataChainFilter(state[radialKey], network);

  const startDate = new Date(
    dataStartDate
      ? dataStartDate 
      : state[radialKey].length > 0 
        ? dataChainFiltered[0].ts
        : '2024-01-01' // default start date
  );

  const data = dataChainFiltered
    .filter(item => new Date(item.ts) >= startDate) 
    .map(item => {
      return {
        timestamp: parseISO(item.ts),
        [radialType === 'daily' ? dailyChartYAxisDataKey : chartYAxisDataKey]: radialType === 'daily' ? getDailyChartYAxisDataPoint(item) : getYAxisDataPoint(item),
      }
    });

  const latestValue = data.length > 0
    ? data[data.length - 1][radialType === 'daily' ? dailyChartYAxisDataKey : chartYAxisDataKey].toFixed(2) 
    : '';

  const ath = Math.max(...data.map(d => d[radialType === 'daily' ? dailyChartYAxisDataKey : chartYAxisDataKey]));
  const atl = radialType === 'daily'
    ? 0
    : Math.min(...data.map(d => d[radialType === 'daily' ? dailyChartYAxisDataKey : chartYAxisDataKey]));

  const ath_percentage = radialType === 'daily'
    ? -1 * (1 - latestValue / ath) * 100
    : state[summaryDataKey][network].ath_percentage;

  const atl_percentage = radialType === 'daily'
    ? ''
    : state[summaryDataKey][network].atl_percentage;

  
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
  
    if (radialType === 'cumulative') {
      if (value === 100) {
        displayLabel = 'ATH';
        displayValue = `${valueAndSymbolSVG(ath)}`;
        delta = renderDelta(ath_percentage);
        x = cx - 30;
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
        x = cx - 30;
        y = cy + 146;
        anchor = "start";
        lineX1 = cx;
        lineY1 = cy + 126;
        lineX2 = cx;
        lineY2 = cy + 136;
      } else {
        return null;
      }
    } else { // daily
      if (value === 100) {
        displayLabel = 'Max Daily';
        displayValue = `${valueAndSymbolSVG(ath)}`;
        delta = renderDelta(ath_percentage);
        x = cx - 30;
        y = cy - 148;
        anchor = "start";
        lineX1 = cx;
        lineY1 = cy - 138;
        lineX2 = cx;
        lineY2 = cy - 128;
      } else if (value === 0) {
        displayLabel = 'Min Daily';
        displayValue = `${valueAndSymbolSVG(0)}`;
        delta = '';
        x = cx - 30;
        y = cy + 146;
        anchor = "start";
        lineX1 = cx;
        lineY1 = cy + 126;
        lineX2 = cx;
        lineY2 = cy + 136;
      } else {
        return null;
      }
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
          <tspan className={`${styles.statDelta} ${colorClass}`} dx="2">
            {delta + ' '}
          </tspan>
        </text>
      </g>
    );
  };

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

  const latestValueDate = data.length > 0
    ? format(new Date(data[data.length - 1].timestamp), 'MMM d, yyyy')
    : '';

  return (
    <li className={styles.container}>
      <ChartHeader 
        chartTitle={chartTitle}
        timeFilter={timeFilter}
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
              {latestValueDate}
            </p>
          </div>
          <RadialBarChart
            width={325}
            height={387.58}
            cx="55%"
            cy="40%"
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
                M ${300 * 0.59} ${300 / 2 - 124}
                A 100 100 0 0 1 ${300 * 0.59} ${300 / 2 + 132}
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