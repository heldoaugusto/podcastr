import { ThemeProvider } from 'styled-components';

import { useCallback, useState } from 'react';

import light from '../styles/themes/light';
import dark from '../styles/themes/dark';

import Header from '../components/Header';
import Player from '../components/Player';

import { PlayerContextProvider } from '../contexts/PlayerContext';

import GlobalStyle from '../styles/global';
import { Wrapper } from '../styles/app';

function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState(light);

  const toggleTheme = useCallback(() => {
    setTheme(theme.title === 'light' ? dark : light);
  }, [theme.title]);

  return (
    <ThemeProvider theme={theme}>
      <PlayerContextProvider>
        <GlobalStyle />
        <Wrapper>
          <main>
            <Header toggleTheme={toggleTheme} />
            <Component {...pageProps} />
          </main>

          <Player />
        </Wrapper>
      </PlayerContextProvider>
    </ThemeProvider>
  );
}

export default MyApp;
