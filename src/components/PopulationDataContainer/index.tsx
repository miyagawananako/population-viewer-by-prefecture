import React, { useState } from 'react';
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
import { PopulationType, Prefecture, PopulationComposition } from '../../App';

interface PopulationDataContainerProps {
  populationData: PopulationComposition[];
  prefectures: Prefecture[];
}

const PopulationDataContainer: React.FC<PopulationDataContainerProps> = ({
  populationData,
  prefectures,
}) => {
  const [selectedPopulationType, setSelectedPopulationType] = useState<PopulationType>('総人口');

  const getColorByPrefCode = (prefCode: number) => {
    const hue = (prefCode * 137.508) % 360;
    return `hsl(${hue}, 70%, 50%)`;
  };

  const formatChartData = () => {
    if (populationData.length === 0) return [];

    const years = populationData[0].data[selectedPopulationType].map((item) => item.year);
    return years.map((year) => {
      const dataPoint: any = { year };
      populationData.forEach((data) => {
        const yearData = data.data[selectedPopulationType].find((item) => item.year === year);
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
      <Header>
        <h2>人口構成データ</h2>
      </Header>
      <PopulationTypeSelector>
        {(['総人口', '年少人口', '生産年齢人口', '老年人口'] as PopulationType[]).map((type) => (
          <PopulationTypeButton
            key={type}
            selected={selectedPopulationType === type}
            onClick={() => setSelectedPopulationType(type)}
          >
            {type}
          </PopulationTypeButton>
        ))}
      </PopulationTypeSelector>
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
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 8px;

  h2 {
    font-size: 24px;
    margin: 0;
  }
`;

const PopulationTypeSelector = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 16px;
`;

const PopulationTypeButton = styled.button<{ selected: boolean }>`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: ${({ selected }) => (selected ? '#4CAF50' : '#e0e0e0')};
  color: ${({ selected }) => (selected ? 'white' : '#333')};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ selected }) => (selected ? '#45a049' : '#d0d0d0')};
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
