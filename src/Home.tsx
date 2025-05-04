import React from 'react';
import styled from 'styled-components';
import { PrefectureList } from './organisms/PrefectureList';
import { PopulationDataContainer } from './organisms/PopulationDataContainer';
import { Prefecture, PopulationComposition } from './type';
import { theme } from './theme';

interface HomeProps {
  prefectures: Prefecture[];
  selectedPrefs: number[];
  populationData: PopulationComposition[];
  onCheckboxChange: (prefCode: number) => void;
  error: string | null;
}

export const Home: React.FC<HomeProps> = ({
  prefectures,
  selectedPrefs,
  populationData,
  onCheckboxChange,
  error,
}) => {
  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return (
    <Wrapper>
      <PrefectureList
        prefectures={prefectures}
        selectedPrefs={selectedPrefs}
        onCheckboxChange={onCheckboxChange}
      />
      {populationData.length > 0 && (
        <PopulationDataContainer populationData={populationData} prefectures={prefectures} />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${theme.size.large};
`;

const ErrorMessage = styled.div`
  color: ${theme.colors.error};
  font-size: ${theme.fontSize.medium};
`;
