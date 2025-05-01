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

interface Prefecture {
  prefCode: number;
  prefName: string;
}

interface PopulationData {
  year: number;
  value: number;
}

interface PopulationComposition {
  prefCode: number;
  data: PopulationData[];
}

interface PopulationDataContainerProps {
  populationData: PopulationComposition[];
  prefectures: Prefecture[];
}

const PopulationDataContainer: React.FC<PopulationDataContainerProps> = ({
  populationData,
  prefectures,
}) => {
  const getColorByPrefCode = (prefCode: number) => {
    const hue = (prefCode * 137.508) % 360;
    return `hsl(${hue}, 70%, 50%)`;
  };

  const formatChartData = () => {
    if (populationData.length === 0) return [];

    const years = populationData[0].data.map((item) => item.year);
    return years.map((year) => {
      const dataPoint: any = { year };
      populationData.forEach((data) => {
        const yearData = data.data.find((item) => item.year === year);
        const prefName = prefectures.find((p) => p.prefCode === data.prefCode)?.prefName;
        if (prefName && yearData) {
          dataPoint[prefName] = yearData.value;
        }
      });
      return dataPoint;
    });
  };

  return (
    <Container>
      <h2>人口構成データ</h2>
      <ChartContainer>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={formatChartData()} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="year"
              tickCount={10}
              interval="preserveStartEnd"
              tick={{ fontSize: 12 }}
            />
            <YAxis tick={{ fontSize: 12 }} />
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
      </ChartContainer>
      <DataTable>
        <thead>
          <tr>
            <th>年</th>
            {populationData.map((data) => (
              <th key={data.prefCode}>
                {prefectures.find((p) => p.prefCode === data.prefCode)?.prefName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {formatChartData().map((row, index) => (
            <tr key={index}>
              <td>{row.year}年</td>
              {populationData.map((data) => {
                const prefName = prefectures.find((p) => p.prefCode === data.prefCode)?.prefName;
                return <td key={data.prefCode}>{row[prefName!].toLocaleString()}人</td>;
              })}
            </tr>
          ))}
        </tbody>
      </DataTable>
    </Container>
  );
};

export default PopulationDataContainer;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  background-color: #f5f5f5;
  border-radius: 8px;
  width: 90%;
  max-width: 1200px;

  h2 {
    font-size: 24px;
  }
`;

const ChartContainer = styled.div`
  width: 100%;
`;

const DataTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;

  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: right;
  }

  th {
    background-color: #f5f5f5;
    text-align: center;
  }

  tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  tr:hover {
    background-color: #f0f0f0;
  }
`;
