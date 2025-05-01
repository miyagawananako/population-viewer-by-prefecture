import React from 'react';
import styled from 'styled-components';
import { Prefecture } from '../../App';

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
  row-gap: 16px;
  flex-direction: column;
  padding: 24px;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 24px;
  text-align: center;
`;

const List = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 16px;
  max-width: 1200px;
  padding: 16px;
  @media (max-width: 1200px) {
    grid-template-columns: repeat(5, 1fr);
  }
  @media (max-width: 900px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (max-width: 700px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 500px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const PrefectureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
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
  font-size: 16px;
`;
