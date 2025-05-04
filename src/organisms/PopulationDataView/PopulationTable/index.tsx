import React from 'react';
import styled from 'styled-components';
import { theme } from '../../../theme';
import { Prefecture, PopulationComposition, PopulationType } from '../../../type';

type PopulationTableProps = {
  populationData: PopulationComposition[];
  prefectures: Prefecture[];
  selectedPopulationType: PopulationType;
};

type YearlyPopulationData = {
  year: number;
  [prefectureName: string]: number;
};

export const PopulationTable: React.FC<PopulationTableProps> = ({
  populationData,
  prefectures,
  selectedPopulationType,
}) => {
  const formatTableData = (): YearlyPopulationData[] => {
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
      <FixedTable>
        <thead>
          <tr>
            <th>年</th>
          </tr>
        </thead>
        <tbody>
          {formatTableData().map((row, index) => (
            <tr key={index}>
              <td>{row.year}年</td>
            </tr>
          ))}
        </tbody>
      </FixedTable>
      <ScrollableTableWrapper>
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
            {formatTableData().map((row, index) => (
              <tr key={index}>
                {populationData.map((data) => {
                  const prefName = prefectures.find((p) => p.prefCode === data.prefCode)?.prefName;
                  return <td key={data.prefCode}>{row[prefName!].toLocaleString()}人</td>;
                })}
              </tr>
            ))}
          </tbody>
        </ScrollableTable>
      </ScrollableTableWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  margin-top: ${theme.size.medium};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BaseTable = styled.table`
  border-collapse: collapse;
  font-size: ${theme.fontSize.medium};
  background-color: ${theme.colors.white};

  th,
  td {
    border: 1px solid ${theme.colors.border};
    padding: ${theme.size.small};
    text-align: center;
    white-space: nowrap;
  }

  th {
    background-color: ${theme.colors.white};
    border-bottom: 2px solid ${theme.colors.border};
  }

  tr:nth-child(odd) {
    background-color: ${theme.colors.tableRowOdd};
  }
`;

const FixedTable = styled(BaseTable)`
  border-right: 2px solid ${theme.colors.border};
`;

const ScrollableTableWrapper = styled.div`
  overflow-x: auto;
`;

const ScrollableTable = styled(BaseTable)`
  white-space: nowrap;

  td {
    text-align: right;
  }
`;
