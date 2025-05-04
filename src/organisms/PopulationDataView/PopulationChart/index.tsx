import React from 'react';
import styled from 'styled-components';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Prefecture, PopulationComposition, PopulationType } from '../../../type';

type PopulationChartProps = {
  populationData: PopulationComposition[];
  prefectures: Prefecture[];
  selectedPopulationType: PopulationType;
};

type YearlyPopulationData = {
  year: number;
  [prefectureName: string]: number;
};

export const PopulationChart: React.FC<PopulationChartProps> = ({
  populationData,
  prefectures,
  selectedPopulationType,
}) => {
  const getColorByPrefCode = (prefCode: number) => {
    const hue = (prefCode * 137.508) % 360;
    return `hsl(${hue}, 70%, 50%)`;
  };

  const formatChartData = (): YearlyPopulationData[] => {
    if (populationData.length === 0) return [];

    const years = populationData[0].data[selectedPopulationType].map((item) => item.year);
    return years.map((year) => {
      const yearlyPopulationData: YearlyPopulationData = { year };
      populationData.forEach((data) => {
        const yearData = data.data[selectedPopulationType].find((item) => item.year === year);
        const prefName = prefectures.find((p) => p.prefCode === data.prefCode)?.prefName;
        if (prefName && yearData) {
          yearlyPopulationData[prefName] = yearData.value;
        }
      });
      return yearlyPopulationData;
    });
  };

  return (
    <Wrapper>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={formatChartData()} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="year"
            tickCount={10}
            interval="preserveStartEnd"
            tick={{ fontSize: 12 }}
          />
          <YAxis
            tick={{ fontSize: 12 }}
            tickFormatter={(value: number) => {
              if (value >= 100000000) {
                return `${(value / 100000000).toFixed(1)}億`;
              }
              if (value >= 10000) {
                return `${(value / 10000).toFixed(1)}万`;
              }
              return value.toString();
            }}
            width={40}
          />
          <Tooltip contentStyle={{ fontSize: 12 }} />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          {populationData.map((data) => {
            const prefName = prefectures.find((p) => p.prefCode === data.prefCode)?.prefName;
            return (
              <Line
                key={data.prefCode}
                type="monotone"
                dataKey={prefName}
                name={prefName}
                stroke={getColorByPrefCode(data.prefCode)}
              />
            );
          })}
        </LineChart>
      </ResponsiveContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
`;
