import React, { useMemo } from "react";
import { dataToArea } from "./helpers";
import { IChartView } from "@/components/ChartView";

interface ISVGCoordinates {
  multiplier?: number;
  data: number[];
}

export interface ISVGPath extends ISVGCoordinates {
  area: IChartView;
  stroke: string;
  style?: React.CSSProperties;
  strokeWidth: string;
  transform?: string;
  isActive?: boolean;
  maxY: number;
}

export const ChartLine: React.FC<ISVGPath> = ({
  area,
  style,
  stroke,
  strokeWidth,
  isActive = false,
  data,
  maxY,
}) => {
  const stylePath = { ...style, opacity: isActive ? "1" : "0" };
  const toSVGCoordinates = useMemo(() => {
    const chartData = dataToArea(data, area, 0, maxY);
    const d = [`M ${chartData[0][0]} ${chartData[0][1]}`];
    const collection = chartData.map((section: number[]): string => {
      const xSection = section[0];
      const ySection = section[1];
      return `L ${xSection} ${ySection}`;
    });
    return d.concat(collection).join(" ");
  }, [data, area, maxY]);
  return (
    <path
      strokeWidth={strokeWidth}
      style={stylePath}
      fill="none"
      stroke={stroke}
      vectorEffect="non-scaling-stroke"
      strokeLinejoin="round"
      d={toSVGCoordinates}
    ></path>
  );
};
