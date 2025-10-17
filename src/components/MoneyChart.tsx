import { useState } from "react";
import {
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Bar,
  ComposedChart,
} from "recharts";
import type { BarProps, TooltipProps } from "recharts";
import type { WorkingCapital } from "@api/finance";
import { formatCurrency } from "@utils/format";
import { useTranslation } from "react-i18next";
import type { ActiveShape } from "recharts/types/util/types";

const CustomTooltip = ({
  active,
  payload,
  currency,
  hoveredLine,
}: TooltipProps<number, string> & {
  currency: string;
  hoveredLine: string | null;
}) => {
  if (active && payload && payload.length) {
    if (hoveredLine) {
      const data = payload.find((p) => p.dataKey === hoveredLine);
      if (data) {
        return (
          <div className="money-chart__tooltip">
            <p className="money-chart__tooltip-value">
              {formatCurrency(data.value ?? 0, currency)}
            </p>
          </div>
        );
      }
    }
  }
  return null;
};


const CustomBarShape = ({ x, y, width, height }: { x: number, y: number, width: number, height: number }) => {
  return (
    <g>
      <defs>
        <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(250, 251, 254, 0)" />
          <stop offset="66.56%" stopColor="#F2F6FC" />
        </linearGradient>
      </defs>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill="url(#barGradient)"
        rx={12}
        ry={12}
      />
    </g>
  );
};

export default function MoneyChart({
  data,
  currency,
  timePeriod,
  onTimePeriodChange,
}: {
  data: WorkingCapital["data"];
  currency: string;
  timePeriod: string;
  onTimePeriodChange: (period: string) => void;
}) {
  const { t } = useTranslation();
  const [hoveredLine, setHoveredLine] = useState<string | null>(null);
  const [hoveredBarIndex, setHoveredBarIndex] = useState<number | null>(null);

  const maxValue = Math.max(
    ...data.flatMap(item => [item.income, item.expense])
  );

  const dataWithHighlight = data.map((item, index) => ({
    ...item,
    highlight: index === hoveredBarIndex ? maxValue : 0,
  }));

  return (
    <div className="money-chart">
      <div className="money-chart__header">
        <h3>{t("app.workingCapital")}</h3>
        <div className="money-chart__controls">
          <div className="money-chart__legend">
            <div className="money-chart__legend-item">
              <span className="money-chart__legend-dot money-chart__legend-dot--income"></span>
              <span className="money-chart__legend-label">
                {t("app.income")}
              </span>
            </div>
            <div className="money-chart__legend-item">
              <span className="money-chart__legend-dot money-chart__legend-dot--expense"></span>
              <span className="money-chart__legend-label">
                {t("app.expense")}
              </span>
            </div>
          </div>
          <select
            className="money-chart__filter"
            value={timePeriod}
            onChange={(e) => onTimePeriodChange(e.target.value)}
          >
            <option value="7days">{t("app.last7days")}</option>
            <option value="30days">{t("app.last30days")}</option>
            <option value="1year">{t("app.last1year")}</option>
          </select>
        </div>
      </div>
      <div className="money-chart__chart">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={dataWithHighlight}
            margin={{ top: 10, right: 16, left: 0, bottom: 0 }}
            onMouseMove={(state: { activeTooltipIndex?: number }) => {
              if (state && state.activeTooltipIndex !== undefined) {
                setHoveredBarIndex(state.activeTooltipIndex);
              }
            }}
            onMouseLeave={() => {
              setHoveredLine(null);
              setHoveredBarIndex(null);
            }}
          >
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(250, 251, 254, 0)" />
                <stop offset="66.56%" stopColor="#F2F6FC" />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#E5E7EB"
              vertical={false}
            />
            <XAxis dataKey="month" stroke="#8B98A5" fontSize={12} />
            <YAxis
              tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`}
              stroke="#8B98A5"
              fontSize={12}
              width={60}
            />
            <Tooltip
              content={
                <CustomTooltip 
                  currency={currency} 
                  hoveredLine={hoveredLine}
                />
              }
              cursor={false}
              isAnimationActive={false}
              allowEscapeViewBox={{ x: false, y: true }}
            />
            <Bar
              dataKey="highlight"
              fill="url(#barGradient)"
              shape={CustomBarShape as ActiveShape<BarProps, SVGPathElement>}
              radius={[12, 12, 12, 12]}
              barSize={49}
              isAnimationActive={false}
            />
            <Area
              type="monotone"
              dataKey="income"
              stroke="#2D9F8E"
              strokeWidth={2}
              fill="transparent"
              name="Income"
              dot={false}
              activeDot={
                hoveredLine === "income"
                  ? {
                      r: 6,
                      fill: "#5243AA",
                      stroke: "white",
                      strokeWidth: 2,
                      onMouseEnter: () => setHoveredLine("income"),
                    }
                  : false
              }
              isAnimationActive={false}
              strokeOpacity={1}
              onMouseMove={() => setHoveredLine("income")}
            />
            <Area
              type="monotone"
              dataKey="expense"
              stroke="#FFD700"
              strokeWidth={2}
              fill="transparent"
              name="Expenses"
              dot={false}
              activeDot={
                hoveredLine === "expense"
                  ? {
                      r: 6,
                      fill: "#5243AA",
                      stroke: "white",
                      strokeWidth: 2,
                      onMouseEnter: () => setHoveredLine("expense"),
                    }
                  : false
              }
              isAnimationActive={false}
              strokeOpacity={1}
              onMouseMove={() => setHoveredLine("expense")}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
