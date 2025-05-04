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
import { POPULATION_TYPES, STYLES } from '../../../const';
import { Title } from '../common/title';
import { PopulationType, Prefecture, PopulationComposition } from '../../../App';

interface PopulationDataContainerProps {
  populationData: PopulationComposition[];
  prefectures: Prefecture[];
}

export const PopulationDataContainer: React.FC<PopulationDataContainerProps> = ({
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
      <Title>人口構成データ</Title>
      <PopulationTypeSelector>
        <PopulationTypeSelect
          value={selectedPopulationType}
          onChange={(e) => setSelectedPopulationType(e.target.value as PopulationType)}
        >
          {POPULATION_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </PopulationTypeSelect>
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
      </ChartContainer>
      <TableContainer>
        <FixedTable>
          <thead>
            <tr>
              <th>年</th>
            </tr>
          </thead>
          <tbody>
            {formatChartData().map((row, index) => (
              <tr key={index}>
                <td>{row.year}年</td>
              </tr>
            ))}
          </tbody>
        </FixedTable>
        <ScrollableTableContainer>
          <ScrollableTable>
            <thead>
              <tr>
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
                  {populationData.map((data) => {
                    const prefName = prefectures.find(
                      (p) => p.prefCode === data.prefCode
                    )?.prefName;
                    return <td key={data.prefCode}>{row[prefName!].toLocaleString()}人</td>;
                  })}
                </tr>
              ))}
            </tbody>
          </ScrollableTable>
        </ScrollableTableContainer>
      </TableContainer>
    </Container>
  );
};

export default PopulationDataContainer;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${STYLES.size.medium};
  padding: ${STYLES.size.large};
  background-color: ${STYLES.colors.background};
  border-radius: ${STYLES.borderRadius.medium};
  width: 90%;
  max-width: 1200px;
`;

const PopulationTypeSelector = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${STYLES.size.medium};
`;

const PopulationTypeSelect = styled.select`
  padding: ${STYLES.size.small} ${STYLES.size.medium};
  border: 1px solid ${STYLES.colors.border};
  border-radius: ${STYLES.borderRadius.small};
  background-color: ${STYLES.colors.background};
  color: ${STYLES.colors.text};
  font-size: ${STYLES.fontSize.medium};
  cursor: pointer;
  min-width: 200px;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right ${STYLES.size.small} center;
  background-size: ${STYLES.size.medium};
  padding-right: ${STYLES.size.large};

  &:focus {
    outline: none;
    border-color: ${STYLES.colors.primary};
  }

  option {
    background-color: ${STYLES.colors.background};
    color: ${STYLES.colors.text};
  }
`;

const ChartContainer = styled.div`
  width: 100%;
`;

const TableContainer = styled.div`
  width: 100%;
  margin-top: ${STYLES.size.medium};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BaseTable = styled.table`
  border-collapse: collapse;
  font-size: ${STYLES.fontSize.medium};
  background-color: ${STYLES.colors.white};

  th,
  td {
    border: 1px solid ${STYLES.colors.border};
    padding: ${STYLES.size.small};
    text-align: center;
    white-space: nowrap;
  }

  th {
    background-color: ${STYLES.colors.white};
    border-bottom: 2px solid ${STYLES.colors.border};
  }

  tr:nth-child(odd) {
    background-color: ${STYLES.colors.tableRowOdd};
  }
`;

const FixedTable = styled(BaseTable)`
  border-right: 2px solid ${STYLES.colors.border};
`;

const ScrollableTableContainer = styled.div`
  overflow-x: auto;
`;

const ScrollableTable = styled(BaseTable)`
  min-width: 700px;
  white-space: nowrap;

  td {
    text-align: right;
  }
`;
