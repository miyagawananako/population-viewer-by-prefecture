import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../theme';
import { Title } from '../../atoms/title';
import { PopulationType, Prefecture, PopulationComposition } from '../../type';
import { Loading } from '../../atoms/loading';
import { PopulationTypeSelector } from './PopulationTypeSelector';
import { PopulationChart } from './PopulationChart';
import { PopulationTable } from './PopulationTable';

type PopulationDataViewProps = {
  populationData: PopulationComposition[];
  prefectures: Prefecture[];
  isLoading: boolean;
};

export const PopulationDataView: React.FC<PopulationDataViewProps> = ({
  populationData,
  prefectures,
  isLoading,
}) => {
  const [selectedPopulationType, setSelectedPopulationType] = useState<PopulationType>('総人口');

  return (
    <Wrapper>
      <Title>人口構成データ</Title>
      <PopulationTypeSelector
        selectedPopulationType={selectedPopulationType}
        onChange={setSelectedPopulationType}
      />
      {isLoading && <Loading />}
      <PopulationChart
        populationData={populationData}
        prefectures={prefectures}
        selectedPopulationType={selectedPopulationType}
      />
      <PopulationTable
        populationData={populationData}
        prefectures={prefectures}
        selectedPopulationType={selectedPopulationType}
      />
    </Wrapper>
  );
};

export default PopulationDataView;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.size.medium};
  padding: ${theme.size.large};
  background-color: ${theme.colors.background};
  border-radius: ${theme.borderRadius.medium};
  width: 90%;
  max-width: 1200px;
`;
