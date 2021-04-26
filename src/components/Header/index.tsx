import React, { useContext } from 'react';

import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';

import { ThemeContext } from 'styled-components';
import { Container } from './styles';

interface HeaderProps {
  toggleTheme(): void;
}

const Header: React.FC<HeaderProps> = ({ toggleTheme }: HeaderProps) => {
  const currentDate = format(new Date(), 'EEEEEE, d MMMM', { locale: ptBR });
  const theme = useContext(ThemeContext);

  return (
    <Container>
      {theme.title === 'light' ? (
        <img src="/logo.svg" alt="Podcastr" />
      ) : (
        <img src="/logo-light.svg" alt="Podcastr" />
      )}

      <p>O melhor para você ouvir, sempre</p>

      <span>{currentDate}</span>

      <button type="button" onClick={toggleTheme}>
        {theme.title === 'light' ? (
          <img src="/moon.png" alt="dark-mode" />
        ) : (
          <img src="/sun.png" alt="dark-mode" />
        )}
      </button>
    </Container>
  );
};

export default Header;
