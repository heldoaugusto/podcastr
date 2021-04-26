import styled, { css } from 'styled-components';

interface ContainerProps {
  hasEpisodePlaying: boolean;
}

interface ButtonProps {
  isShuffling?: boolean;
  isLooping?: boolean;
}

export const Container = styled.div<ContainerProps>`
  width: 26.5rem;
  height: 100vh;

  padding: 3rem 4rem;

  background: ${props => props.theme.colors.secondary3};
  color: ${props => props.theme.colors.white};

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  header {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  strong {
    font-family: Lexend, sans-serif;
    font-weight: 600;
  }

  footer {
    align-self: stretch;

    ${props =>
      props.hasEpisodePlaying &&
      css`
        opacity: 0.5;
      `}
  }
`;

export const PlayingEpisode = styled.div`
  text-align: center;

  img {
    border-radius: 1.5rem;
  }

  strong {
    display: block;
    margin-top: 2rem;
    font: 600 1.25rem Lexend, sans-serif;
    line-height: 1.75rem;
  }

  span {
    display: block;
    margin-top: 1rem;
    opacity: 0.6;
    line-height: 1.5rem;
  }
`;

export const EmptyPlayer = styled.div`
  width: 100%;
  height: 20rem;

  border: 1.5px dashed ${props => props.theme.colors.secondary1};
  border-radius: 1.5rem;
  background: linear-gradient(
    143.8deg,
    ${props => props.theme.colors.secondary2} 0%,
    rgba(0, 0, 0, 0) 100%
  );

  padding: 4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const Progress = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  font-size: 0.875rem;

  span {
    display: inline-block;
    width: 4rem;
    text-align: center;
  }
`;

export const SliderContainer = styled.div`
  flex: 1;
`;

export const EmptySlider = styled.div`
  width: 100%;
  height: 4px;
  background: ${props => props.theme.colors.secondary1};
  border-radius: 2px;
`;

export const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2.5rem;
  gap: 1.5rem;

  button {
    &.isActive {
      filter: invert(0.35) sepia(1) saturate(3) hue-rotate(100deg);
    }

    &.isActive:hover {
      filter: brightness(0.6) invert(0.35) sepia(1) saturate(3)
        hue-rotate(100deg);
    }
  }
`;

export const Button = styled.button<ButtonProps>`
  background: transparent;
  border: none;
  font-size: 0;

  transition: filter 0.3s;

  &:disabled {
    cursor: default;
    opacity: 0.5;
  }

  ${props =>
    props.isShuffling || props.isLooping
      ? css`
          filter: invert(0.35) sepia(1) saturate(3) hue-rotate(100deg);

          &:hover {
            filter: brightness(0.6) invert(0.35) sepia(1) saturate(3)
              hue-rotate(100deg);
          }
        `
      : css`
          &:hover:not(:disabled) {
            filter: brightness(0.8);
          }
        `}
`;

export const PlayButton = styled.button`
  background: transparent;
  border: 0;
  font-size: 0;

  width: 4rem;
  height: 4rem;
  border-radius: 1rem;
  background: ${props => props.theme.colors.secondary2};

  transition: filter 0.3s;

  &:hover:not(:disabled) {
    filter: brightness(0.95);
  }
`;
