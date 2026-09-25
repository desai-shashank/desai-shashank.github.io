import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart,
} from 'recharts';
import { SectionWrapper } from '../components/SectionWrapper';
import { Icon } from '../components/Icon';
import { staggerContainer, fadeInUp } from '../lib/animations';

// ============================================================
// DEMO DATA — Clearly labeled as illustrative, not real
// ============================================================
const demoLineData = [
  { month: 'Jan', visitors: 2400, conversions: 180 },
  { month: 'Feb', visitors: 3200, conversions: 240 },
  { month: 'Mar', visitors: 2800, conversions: 210 },
  { month: 'Apr', visitors: 4100, conversions: 320 },
  { month: 'May', visitors: 3800, conversions: 290 },
  { month: 'Jun', visitors: 4600, conversions: 380 },
];

const demoBarData = [
  { channel: 'Organic', value: 42 },
  { channel: 'Social', value: 28 },
  { channel: 'Email', value: 18 },
  { channel: 'Referral', value: 12 },
];

const demoPieData = [
  { name: 'Desktop', value: 55 },
  { name: 'Mobile', value: 35 },
  { name: 'Tablet', value: 10 },
];

const pieColors = ['#6366f1', '#22d3ee', '#a78bfa'];

const kpiCards = [
  { label: 'Total Visitors', value: '21.0K', change: '+12.4%', positive: true, icon: 'eye' },
  { label: 'Conversion Rate', value: '7.8%', change: '+2.1%', positive: true, icon: 'chart' },
  { label: 'Avg. Session', value: '3m 42s', change: '+0.8%', positive: true, icon: 'globe' },
  { label: 'Bounce Rate', value: '38.2%', change: '-4.5%', positive: true, icon: 'users' },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[var(--color-bg-card)] border border-white/[0.08] rounded-lg px-3 py-2 text-xs shadow-xl">
      <p className="text-[var(--color-text-muted)] mb-1">{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} style={{ color: p.color }} className="font-medium">
          {p.name}: {p.value?.toLocaleString()}
        </p>
      ))}
    </div>
  );
};

export const AnalyticsDemo: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const [activeFilter, setActiveFilter] = useState('6M');

  return (
    <SectionWrapper
      id="analytics-demo"
      label="Analytics"
      title={
        <>
          Interactive Analytics <span className="gradient-text">Demo</span>
        </>
      }
      subtitle="An illustrative data dashboard demonstrating analytical and visualization capabilities."
    >
      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        {/* Disclaimer */}
        <motion.div
          variants={fadeInUp}
          className="mb-6 flex items-center gap-2 text-xs text-[var(--color-text-muted)] bg-white/[0.02] rounded-lg px-4 py-2.5 border border-white/[0.04]"
        >
          <Icon name="chart" size={14} className="text-[var(--color-accent-secondary)]" />
          <span>
            <strong className="text-[var(--color-text-secondary)]">Interactive Analytics Demo</strong>{' '}
            — Illustrative demo using sample data. Not production or client data.
          </span>
        </motion.div>

        {/* KPI Cards */}
        <motion.div variants={fadeInUp} className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {kpiCards.map((kpi) => (
            <div key={kpi.label} className="card-elevated p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-[var(--color-text-muted)]">{kpi.label}</span>
                <Icon name={kpi.icon} size={14} className="text-[var(--color-text-muted)]/50" />
              </div>
              <div className="text-xl font-bold text-[var(--color-text-primary)]">{kpi.value}</div>
              <div className={`text-xs font-medium mt-1 ${kpi.positive ? 'text-[var(--color-accent-green)]' : 'text-red-400'}`}>
                {kpi.change}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Filter controls */}
        <motion.div variants={fadeInUp} className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-[var(--color-text-secondary)]">
            Traffic & Conversions
          </h3>
          <div className="flex gap-1">
            {['1M', '3M', '6M', '1Y'].map((period) => (
              <button
                key={period}
                onClick={() => setActiveFilter(period)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer border-none ${
                  activeFilter === period
                    ? 'bg-[var(--color-accent-primary)]/15 text-[var(--color-accent-secondary)]'
                    : 'bg-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Charts Grid */}
        <motion.div variants={fadeInUp} className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Area Chart */}
          <div className="lg:col-span-2 card-elevated p-4">
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={demoLineData}>
                <defs>
                  <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorConversions" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis
                  dataKey="month"
                  tick={{ fill: '#6b6b80', fontSize: 11 }}
                  axisLine={{ stroke: 'rgba(255,255,255,0.06)' }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: '#6b6b80', fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="visitors"
                  stroke="#6366f1"
                  fill="url(#colorVisitors)"
                  strokeWidth={2}
                  name="Visitors"
                />
                <Area
                  type="monotone"
                  dataKey="conversions"
                  stroke="#22d3ee"
                  fill="url(#colorConversions)"
                  strokeWidth={2}
                  name="Conversions"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="card-elevated p-4 flex flex-col items-center justify-center">
            <h4 className="text-xs text-[var(--color-text-muted)] font-medium mb-3 self-start">
              Device Distribution
            </h4>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={demoPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  dataKey="value"
                  stroke="none"
                >
                  {demoPieData.map((_, index) => (
                    <Cell key={index} fill={pieColors[index]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex gap-4 mt-2">
              {demoPieData.map((item, i) => (
                <div key={item.name} className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)]">
                  <div className="w-2 h-2 rounded-full" style={{ background: pieColors[i] }} />
                  {item.name}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bar Chart + Data Table Row */}
        <motion.div variants={fadeInUp} className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
          {/* Bar Chart */}
          <div className="card-elevated p-4">
            <h4 className="text-xs text-[var(--color-text-muted)] font-medium mb-3">
              Traffic by Channel
            </h4>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={demoBarData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis
                  dataKey="channel"
                  tick={{ fill: '#6b6b80', fontSize: 11 }}
                  axisLine={{ stroke: 'rgba(255,255,255,0.06)' }}
                  tickLine={false}
                />
                <YAxis tick={{ fill: '#6b6b80', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" name="Share %" radius={[6, 6, 0, 0]}>
                  {demoBarData.map((_, i) => (
                    <Cell
                      key={i}
                      fill={i === 0 ? '#6366f1' : i === 1 ? '#818cf8' : i === 2 ? '#22d3ee' : '#a78bfa'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Data Table */}
          <div className="card-elevated p-4 overflow-x-auto">
            <h4 className="text-xs text-[var(--color-text-muted)] font-medium mb-3">
              Monthly Overview
            </h4>
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="text-left py-2 text-[var(--color-text-muted)] font-medium">Month</th>
                  <th className="text-right py-2 text-[var(--color-text-muted)] font-medium">Visitors</th>
                  <th className="text-right py-2 text-[var(--color-text-muted)] font-medium">Conversions</th>
                  <th className="text-right py-2 text-[var(--color-text-muted)] font-medium">Rate</th>
                </tr>
              </thead>
              <tbody>
                {demoLineData.map((row) => (
                  <tr key={row.month} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                    <td className="py-2.5 text-[var(--color-text-secondary)]">{row.month}</td>
                    <td className="py-2.5 text-right text-[var(--color-text-secondary)]">
                      {row.visitors.toLocaleString()}
                    </td>
                    <td className="py-2.5 text-right text-[var(--color-text-secondary)]">
                      {row.conversions}
                    </td>
                    <td className="py-2.5 text-right text-[var(--color-accent-green)]">
                      {((row.conversions / row.visitors) * 100).toFixed(1)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.div>
    </SectionWrapper>
  );
};
