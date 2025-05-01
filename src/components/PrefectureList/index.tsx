import React from 'react';
import styled from 'styled-components';
import { Prefecture } from '../../App';
import { STYLES } from '../../const';

interface PrefectureListProps {
  prefectures: Prefecture[];
  selectedPrefs: number[];
  onCheckboxChange: (prefCode: number) => void;
}

const PrefectureList: React.FC<PrefectureListProps> = ({
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
  row-gap: ${STYLES.spacing.small};
  flex-direction: column;
  padding: ${STYLES.spacing.large};
  align-items: center;
  width: 100%;
`;

const Title = styled.h2`
  font-size: ${STYLES.fontSize.large};
  text-align: center;
  margin: 0;
`;

const List = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: ${STYLES.spacing.medium};
  max-width: 1600px;
  padding: ${STYLES.spacing.medium};
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
  gap: ${STYLES.spacing.small};
`;

const Checkbox = styled.input`
  width: 16px;
  height: 16px;
  cursor: pointer;
`;

const Label = styled.label`
  cursor: pointer;
  flex: 1;
  text-align: left;
  font-size: ${STYLES.fontSize.medium};
`;
