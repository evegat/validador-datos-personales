import React from 'react';
import type { DimensionAssessmentResult } from '../types';

interface RadarChartProps {
  dimensionResults: DimensionAssessmentResult[];
  size?: number;
}

export const RadarChart: React.FC<RadarChartProps> = ({ dimensionResults, size = 360 }) => {
  const center = size / 2;
  const radius = (size / 2) - 45;
  const validDims = dimensionResults.filter(d => d.maxScorePossible > 0);
  const totalAxes = validDims.length;
  
  if (totalAxes < 3) {
    return <div className="text-xs text-slate-500 text-center p-4">Dimensiones insuficientes para gráfico radar.</div>;
  }

  const angleSlice = (Math.PI * 2) / totalAxes;
  const levels = [0.25, 0.50, 0.75, 1.0];

  const points = validDims.map((dim, i) => {
    const r = (Math.max(dim.percentage, 5) / 100) * radius;
    const angle = i * angleSlice - Math.PI / 2;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="flex flex-col items-center justify-center p-2">
      <svg width={size} height={size} className="overflow-visible" aria-label="Gráfico radar de cumplimiento por dimensión">
        {/* Background Grid Levels */}
        {levels.map((level, idx) => {
          const levelPoints = validDims.map((_, i) => {
            const r = level * radius;
            const angle = i * angleSlice - Math.PI / 2;
            const x = center + r * Math.cos(angle);
            const y = center + r * Math.sin(angle);
            return `${x},${y}`;
          }).join(' ');

          return (
            <g key={`level-${idx}`}>
              <polygon
                points={levelPoints}
                fill={idx % 2 === 0 ? 'rgba(241, 245, 249, 0.7)' : 'rgba(255, 255, 255, 0.9)'}
                stroke="#cbd5e1"
                strokeWidth="1"
                strokeDasharray={idx < 3 ? '3 3' : undefined}
              />
              <text
                x={center + 4}
                y={center - level * radius + 10}
                className="text-[9px] font-medium fill-slate-400 select-none"
              >
                {Math.round(level * 100)}%
              </text>
            </g>
          );
        })}

        {/* Axis Lines & Labels */}
        {validDims.map((dim, i) => {
          const angle = i * angleSlice - Math.PI / 2;
          const x = center + radius * Math.cos(angle);
          const y = center + radius * Math.sin(angle);

          const labelR = radius + 22;
          const labelX = center + labelR * Math.cos(angle);
          const labelY = center + labelR * Math.sin(angle);

          let textAnchor = 'middle';
          if (Math.abs(Math.cos(angle)) > 0.3) {
            textAnchor = Math.cos(angle) > 0 ? 'start' : 'end';
          }

          return (
            <g key={`axis-${dim.dimensionId}`}>
              <line
                x1={center}
                y1={center}
                x2={x}
                y2={y}
                stroke="#94a3b8"
                strokeWidth="1"
              />
              <text
                x={labelX}
                y={labelY}
                textAnchor={textAnchor}
                className="text-[11px] font-bold fill-slate-700 select-none"
              >
                {dim.shortTitle} ({dim.percentage}%)
              </text>
            </g>
          );
        })}

        {/* Municipal Score Area */}
        <polygon
          points={points}
          fill="rgba(29, 78, 216, 0.2)"
          stroke="#1d4ed8"
          strokeWidth="2.5"
        />

        {/* Data Point Dots */}
        {validDims.map((dim, i) => {
          const r = (Math.max(dim.percentage, 5) / 100) * radius;
          const angle = i * angleSlice - Math.PI / 2;
          const x = center + r * Math.cos(angle);
          const y = center + r * Math.sin(angle);

          return (
            <circle
              key={`dot-${dim.dimensionId}`}
              cx={x}
              cy={y}
              r="4.5"
              className="fill-blue-700 stroke-white stroke-2"
            />
          );
        })}
      </svg>
      <div className="flex items-center gap-6 mt-4 text-xs font-semibold text-slate-600">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-blue-700 rounded-sm inline-block"></span>
          <span>Nivel de Preparación Actual</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-0.5 border-t border-dashed border-slate-400 inline-block"></span>
          <span>Estándar Pleno (100%)</span>
        </div>
      </div>
    </div>
  );
};
