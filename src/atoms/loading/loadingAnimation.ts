import { keyframes } from 'styled-components';

export const lineDuration = '4800ms';

export const cogDuration = '1200ms';

export const spinnerEasing = 'cubic-bezier(0.4, 0, 0.2, 1)';

export const containerRotate = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const fillUnfillRotate = keyframes`
  12.5% {
    transform: rotate(135deg);
  }
  25% {
    transform: rotate(270deg);
  }
  37.5% {
    transform: rotate(405deg);
  }
  50% {
    transform: rotate(540deg);
  }
  62.5% {
    transform: rotate(675deg);
  }
  75% {
    transform: rotate(810deg);
  }
  87.5% {
    transform: rotate(945deg);
  }
  to {
    transform: rotate(1080deg);
  }
`;

const createFadeInOut = (start: number, end: number) => keyframes`
  0% { opacity: 0; }
  ${start}% { opacity: 0; }
  ${start + 10}% { opacity: 1; }
  ${end}% { opacity: 1; }
  ${end + 1}% { opacity: 0; }
  100% { opacity: 0; }
`;

export const line1FadeInOut = createFadeInOut(0, 25);
export const line2FadeInOut = createFadeInOut(15, 50);
export const line3FadeInOut = createFadeInOut(40, 75);
export const line4FadeInOut = createFadeInOut(65, 90);

export const leftSpin = keyframes`
  0% {
    transform: rotate(130deg);
  }
  50% {
    transform: rotate(-5deg);
  }
  to {
    transform: rotate(130deg);
  }
`;

export const rightSpin = keyframes`
  0% {
    transform: rotate(-130deg);
  }
  50% {
    transform: rotate(5deg);
  }
  to {
    transform: rotate(-130deg);
  }
`;
