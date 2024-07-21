import React, { useContext } from 'react';
import styles from './styles.module.css';

import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

import { METRIC_METADATA } from '../../constants/metrics';
import { abbreviateNumber } from "../../helpers";

import { GlobalContext } from '../../context/GlobalContext';

const RadialChart = ({
  metric,
  chain,
  pool,
  collateral_type,
  showFilters,
}) => {
  const { state } = useContext(GlobalContext);
  const metricMetadata = METRIC_METADATA[metric];
  const {
    chartTitle,
    chartYValueSymbol,
    chartYAxisDataKey,
    getYAxisDataPoint,
    yValueFormatter,
    symbolLocation,
    dataChainFilter,
    summaryDataKey,
  } = metricMetadata;

  const dataChainFiltered = dataChainFilter(state[metric], chain);
  const data = dataChainFiltered.map(item => ({
    timestamp: item.ts,
    value: getYAxisDataPoint(item),
  }));

  const latestValue = data.length > 0 ? data[data.length - 1].value : 0;
  const ath = Math.max(...data.map(d => d.value));
  const atl = Math.min(...data.map(d => d.value));

  const ath_percentage = state[summaryDataKey].ath_percentage;
  const atl_percentage = state[summaryDataKey].atl_percentage;

  const formattedData = [
    { name: 'Current', value: ((latestValue - atl) / (ath - atl)) * 100, fill: 'url(#gradientGreenCyan)' }
  ];

  const renderDelta = (value) => {
    const isPositive = value >= 0;
    const icon = isPositive ? '↑' : '↓';
  
    return `${icon}${abbreviateNumber(Math.abs(value))}%`;
  };
  
  const CustomTick = ({ cx, cy, payload }) => {
    const value = payload.value;
    let displayLabel, displayValue, delta, x, y, anchor, lineX1, lineY1, lineX2, lineY2;
  
    if (value === 100) {
      displayLabel = 'ATH';
      displayValue = `${valueAndSymbol(ath)}`;
      delta = renderDelta(ath_percentage); 
      x = cx;
      y = cy - 160;
      anchor = "start";
      lineX1 = cx;
      lineY1 = cy - 140;
      lineX2 = cx;
      lineY2 = cy - 150;
    } else if (value === 0) {
      displayLabel = 'ATL';
      displayValue = `${valueAndSymbol(atl)}`;
      delta = renderDelta(atl_percentage); 
      x = cx;
      y = cy + 160;
      anchor = "start";
      lineX1 = cx;
      lineY1 = cy + 140;
      lineX2 = cx;
      lineY2 = cy + 150;
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
        <p className={styles.chartSubtitle}>{chain}</p>
        <p className={styles.chartSubtitle}>{pool}</p>
        <p className={styles.chartSubtitle}>{collateral_type}</p>
      </div>
    );
  }

  const valueAndSymbol = (val) => {
    const symbolLeft = symbolLocation === 'left' ? chartYValueSymbol : '';
    const symbolRight = symbolLocation === 'right' ? chartYValueSymbol : '';
    return `${symbolLeft}${yValueFormatter(val)}${symbolRight}`;
  }

  return (
    <li className={styles.container}>
      <div className={styles.chartHeader}>
        <div className={styles.titleContainer}>
          <h3 className={styles.chartTitle}>{chartTitle}</h3>
          {renderFilters()}
        </div>
      </div>
      <div className={styles.radialChartWrapper}>
        <div className={styles.centerBubble}>
          <span className={styles.centerValue}>{valueAndSymbol(latestValue)}</span>
        </div>
        <ResponsiveContainer width="100%" height={393.5}>
          <RadialBarChart
            width={300}
            height={393.5}
            cx="50%"
            cy="50%"
            innerRadius={120}
            outerRadius={140}
            barSize={24}
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
                M ${300/2 + 232} ${300/2 - 140 + 46}
                A 140 140 0 0 1 ${300/2 + 232} ${300/2 + 140 + 46}
              `}
              fill="none"
              stroke="var(--charts-border-and-line-colour)"
              strokeWidth={1}
            />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
    </li>
  );
};

export default RadialChart;