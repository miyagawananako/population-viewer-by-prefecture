import React from 'react';
import styled from 'styled-components';
import { Prefecture } from '../../type';
import { theme } from '../../theme';
import { Title } from '../../atoms/title';
import { Loading } from '../../atoms/loading';
interface PrefectureListProps {
  prefectures: Prefecture[];
  selectedPrefs: number[];
  onCheckboxChange: (prefCode: number) => void;
  isLoading: boolean;
}

export const PrefectureList: React.FC<PrefectureListProps> = ({
  prefectures,
  selectedPrefs,
  onCheckboxChange,
  isLoading,
}) => {
  return (
    <Wrapper>
      <Title>都道府県一覧</Title>
      {isLoading ? (
        <Loading />
      ) : (
        <CheckboxList>
          {prefectures.map((pref) => (
            <PrefectureItem key={pref.prefCode}>
              <Checkbox
                type="checkbox"
                id={`pref-${pref.prefCode}`}
                checked={selectedPrefs.includes(pref.prefCode)}
                onChange={() => onCheckboxChange(pref.prefCode)}
              />
              <Label htmlFor={`pref-${pref.prefCode}`}>{pref.prefName}</Label>
            </PrefectureItem>
          ))}
        </CheckboxList>
      )}
    </Wrapper>
  );
};

export default PrefectureList;

const Wrapper = styled.div`
  display: flex;
  row-gap: ${theme.size.small};
  flex-direction: column;
  padding: ${theme.size.large};
  align-items: center;
  width: 100%;
`;

const CheckboxList = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: ${theme.size.medium};
  max-width: 1600px;
  padding: ${theme.size.medium};
  @media (max-width: 1600px) {
    grid-template-columns: repeat(8, 1fr);
  }
  @media (max-width: ${theme.breakpoints.xl}) {
    grid-template-columns: repeat(6, 1fr);
  }
  @media (max-width: ${theme.breakpoints.lg}) {
    grid-template-columns: repeat(5, 1fr);
  }
  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const PrefectureItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.size.small};
`;

const Checkbox = styled.input`
  width: ${theme.size.medium};
  height: ${theme.size.medium};
  cursor: pointer;
`;

const Label = styled.label`
  text-align: left;
  font-size: ${theme.fontSize.medium};
  white-space: nowrap;
`;
