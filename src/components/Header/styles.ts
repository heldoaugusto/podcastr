import styled from 'styled-components';

export const Container = styled.header`
  background: ${props => props.theme.colors.primary1};
  height: 6.5rem;

  display: flex;
  align-items: center;

  padding: 2rem 4rem;

  border-bottom: 1px solid ${props => props.theme.colors.primary2};

  p {
    margin-left: 2rem;
    padding: 0.25rem 0 0.25rem 2rem;
    border-left: 1px solid ${props => props.theme.colors.primary2};
  }

  span {
    margin-left: auto;
    text-transform: capitalize;
  }

  button {
    background: transparent;
    border: none;
    font-size: 0;

    margin-left: 1rem;

    img {
      width: 3rem;
      height: 3rem;
    }
  }
`;
