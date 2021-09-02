import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    title: string;

    colors: {
      black: string;
      primary: string;
      primary02: string;
      blue: string;
      blue7: string;
      gray: string;
      gray00: string;
      gray01: string;
      gray02: string;
      gray03: string;
      gray05: string;
      gray07: string;
      gray08: string;
      secondaryBlue: string;

      white: string;
      white01: string;

      success: string;
      error: string;
      warning: string;
    };
  }
}
