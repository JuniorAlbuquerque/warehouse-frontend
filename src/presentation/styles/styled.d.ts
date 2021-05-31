import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    title: string;

    colors: {
      primary: string;
      primary02: string;
      blue: string;
      gray: string;
      gray01: string;
      gray02: string;
      gray03: string;
      gray05: string;

      white: string;
      white01: string;

      success: string;
      error: string;
      warning: string;
    };
  }
}
