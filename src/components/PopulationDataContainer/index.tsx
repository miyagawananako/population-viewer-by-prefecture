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
import { POPULATION_TYPES, STYLES } from '../../const';
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
        {POPULATION_TYPES.map((type) => (
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
  gap: ${STYLES.spacing.medium};
  padding: ${STYLES.spacing.large};
  background-color: ${STYLES.colors.background};
  border-radius: ${STYLES.borderRadius.medium};
  width: 90%;
  max-width: 1200px;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;

  h2 {
    font-size: ${STYLES.fontSize.large};
    margin: 0;
  }
`;

const PopulationTypeSelector = styled.div`
  display: flex;
  justify-content: center;
  gap: ${STYLES.spacing.small};
  margin-bottom: ${STYLES.spacing.medium};
`;

const PopulationTypeButton = styled.button<{ selected: boolean }>`
  padding: ${STYLES.spacing.small} ${STYLES.spacing.medium};
  border: none;
  border-radius: ${STYLES.borderRadius.small};
  background-color: ${({ selected }) =>
    selected ? STYLES.colors.primary : STYLES.colors.buttonInactive};
  color: ${({ selected }) => (selected ? 'white' : STYLES.colors.text)};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ selected }) =>
      selected ? STYLES.colors.primaryHover : STYLES.colors.buttonInactiveHover};
  }
`;

const ChartContainer = styled.div`
  width: 100%;
`;

const DataTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: ${STYLES.fontSize.medium};

  th,
  td {
    border: 1px solid ${STYLES.colors.border};
    padding: ${STYLES.spacing.small};
    text-align: right;
  }

  th {
    background-color: ${STYLES.colors.background};
    text-align: center;
  }

  tr:nth-child(even) {
    background-color: ${STYLES.colors.background};
  }

  tr:hover {
    background-color: ${STYLES.colors.hover};
  }
`;
