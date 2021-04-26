import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string;

    colors: {
      background: string;

      primary1: string;
      primary2: string;
      primary3: string;
      primary4: string;
      primary5: string;

      highlight: string;

      secondary1: string;
      secondary2: string;
      secondary3: string;
      secondary4: string;

      white: string;
    };
  }
}
