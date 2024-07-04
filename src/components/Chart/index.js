import React from 'react';
import styles from './styles.module.css';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format, parseISO } from 'date-fns';

import { GlobalContext } from '../../context/GlobalContext';

const Chart = ({ 
    metric, 
    chain,
    pool,
    collateral_type,
  }) => {
  const { state } = React.useContext(GlobalContext);
  if (state[metric].length === 0) { return ''; }

  const data = state[metric]
    .filter(item => item.chain === chain) 
    .map(item => ({
      timestamp: parseISO(item.ts),
      APY_7d: item.apys.apy_7d.year * 100,
    }));

    const formatXAxis = (tickItem) => {
    const date = new Date(tickItem);
    return format(date, window.innerWidth >= 992 ? 'MMM dd' : 'MMM');
  };

  const formatYAxis = (value) => `${value.toFixed(0)}%`;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className={styles.tooltip}>
          <p>{format(new Date(label), 'yyyy-MM-dd')}</p>
          <p>{`APY: ${payload[0].value.toFixed(2)}%`}</p>
        </div>
      );
    }
    return null;
  };

  const latestValue = data[0]?.APY_7d.toFixed(2);

  return (
    <li className={styles.container}>
      <div className={styles.chartHeader}>
        <div className={styles.titleContainer}>
          <h3 className={styles.chartTitle}>{metric.toUpperCase()}</h3>
          <div className={styles.titleMeta}>
            <p className={styles.chartSubtitle}>{chain}</p>
            <p className={styles.chartSubtitle}>{pool}</p>
            <p className={styles.chartSubtitle}>{collateral_type}</p>
          </div>
        </div>
        <p className={styles.latestValue}>{latestValue}%</p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart 
          data={data} 
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="var(--charts-border-and-line-colour)" />
          <XAxis 
            dataKey="timestamp" 
            tickFormatter={formatXAxis} 
            stroke="var(--charts-supporting-colour)"
          />
          <YAxis 
            tickFormatter={formatYAxis} 
            stroke="var(--charts-supporting-colour)"
            domain={['dataMin - 10', 'dataMax + 10']}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line 
            type="monotone" 
            dataKey="APY_7d" 
            stroke="var(--green-500)" 
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </li>
  );
};

export default Chart;