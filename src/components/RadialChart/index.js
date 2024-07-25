import React, { useContext, useState, useRef, useEffect } from 'react';
import styles from './styles.module.css';

import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { format, parseISO } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faChartPie, faChartBar } from '@fortawesome/free-solid-svg-icons';

import { METRIC_METADATA } from '../../constants/metrics';
import { abbreviateNumber } from "../../helpers";

import { GlobalContext } from '../../context/GlobalContext';

const RadialChart = ({
  metric,
  chain,
  pool,
  collateral_type,
  showFilters,
  onChartTypeChange,  
}) => {
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
    summaryDataKey,
  } = metricMetadata;


const useDimensions = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const ref = useRef();

  useEffect(() => {
    const handleResize = () => {
      if (ref.current) {
        setDimensions({
          width: ref.current.offsetWidth,
          height: ref.current.offsetHeight,
        });
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return [ref, dimensions];
};

const [ref, { width, height }] = useDimensions(); 


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
        [chartYAxisDataKey]: getYAxisDataPoint(item),
      }
    });

  const latestValue = data.length > 0
  ? data[data.length - 1][chartYAxisDataKey].toFixed(2) 
  : '';

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
      y = cy - 160;
      anchor = "start";
      lineX1 = cx;
      lineY1 = cy - 140;
      lineX2 = cx;
      lineY2 = cy - 150;
    } else if (value === 0) {
      displayLabel = 'ATL';
      displayValue = `${valueAndSymbolSVG(atl)}`;
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
          <p className={styles.latestValueDate}>
            {format(new Date(data[data.length - 1].timestamp), 'MMM d, yyyy')}
          </p>
        </div>
        <ResponsiveContainer width="100%" height={393.5}>
          <RadialBarChart
            width={300}
            height={393.5}
            cx="45%"
            cy="45%"
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
                  M ${300 / 2 + 155} ${300 / 2 - 140 + 26}
                  A 140 140 0 0 1 ${300 / 2 + 155} ${300 / 2 + 140 + 26}
                `}
                fill="none"
                stroke="var(--charts-border-and-line-colour)"
                strokeWidth={1}
              />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
      <div className={styles.chartFooter}>
        <div className={styles.chartIcons}>
          <div
            className={`${styles.chartIcon}`}
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
            className={`${styles.chartIcon} ${styles.active}`}
            onClick={() => onChartTypeChange('radial')}
          >
            <FontAwesomeIcon icon={faChartPie} />
          </div>
        </div>
      </div>
    </li>
  );
};

export default RadialChart;