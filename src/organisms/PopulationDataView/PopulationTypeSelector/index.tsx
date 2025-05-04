import React from 'react';
import styled from 'styled-components';
import { theme } from '../../../theme';
import { POPULATION_TYPES } from '../../../const';
import { PopulationType } from '../../../type';

type PopulationTypeSelectorProps = {
  selectedPopulationType: PopulationType;
  onChange: (type: PopulationType) => void;
};

export const PopulationTypeSelector: React.FC<PopulationTypeSelectorProps> = ({
  selectedPopulationType,
  onChange,
}) => {
  return (
    <Wrapper>
      <Select
        value={selectedPopulationType}
        onChange={(e) => {
          const value = e.target.value;
          if (POPULATION_TYPES.includes(value as PopulationType)) {
            onChange(value as PopulationType);
          }
        }}
      >
        {POPULATION_TYPES.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </Select>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${theme.size.medium};
`;

const Select = styled.select`
  padding: ${theme.size.small} ${theme.size.medium};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.small};
  background-color: ${theme.colors.background};
  color: ${theme.colors.text};
  font-size: ${theme.fontSize.medium};
  cursor: pointer;
  min-width: 200px;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right ${theme.size.small} center;
  background-size: ${theme.size.medium};
  padding-right: ${theme.size.large};

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }

  option {
    background-color: ${theme.colors.background};
    color: ${theme.colors.text};
  }
`;
