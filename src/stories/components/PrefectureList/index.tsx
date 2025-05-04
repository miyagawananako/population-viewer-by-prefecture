import React from 'react';
import styled from 'styled-components';
import { Prefecture } from '../../../App';
import { STYLES } from '../../../const';
import { Title } from '../common/title';

interface PrefectureListProps {
  prefectures: Prefecture[];
  selectedPrefs: number[];
  onCheckboxChange: (prefCode: number) => void;
}

export const PrefectureList: React.FC<PrefectureListProps> = ({
  prefectures,
  selectedPrefs,
  onCheckboxChange,
}) => {
  return (
    <Wrapper>
      <Title>都道府県一覧</Title>
      <List>
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
      </List>
    </Wrapper>
  );
};

export default PrefectureList;

const Wrapper = styled.div`
  display: flex;
  row-gap: ${STYLES.size.small};
  flex-direction: column;
  padding: ${STYLES.size.large};
  align-items: center;
  width: 100%;
`;

const List = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: ${STYLES.size.medium};
  max-width: 1600px;
  padding: ${STYLES.size.medium};
  @media (max-width: 1600px) {
    grid-template-columns: repeat(8, 1fr);
  }
  @media (max-width: ${STYLES.breakpoints.xl}) {
    grid-template-columns: repeat(6, 1fr);
  }
  @media (max-width: ${STYLES.breakpoints.lg}) {
    grid-template-columns: repeat(5, 1fr);
  }
  @media (max-width: ${STYLES.breakpoints.md}) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (max-width: ${STYLES.breakpoints.sm}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const PrefectureItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${STYLES.size.small};
`;

const Checkbox = styled.input`
  width: ${STYLES.size.medium};
  height: ${STYLES.size.medium};
  cursor: pointer;
`;

const Label = styled.label`
  text-align: left;
  font-size: ${STYLES.fontSize.medium};
  white-space: nowrap;
`;
