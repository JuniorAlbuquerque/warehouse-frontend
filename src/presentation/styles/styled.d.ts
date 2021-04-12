import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string

    colors: {
      primary: string

      blue: string

      gray: string
      gray01: string
      gray02: string
      gray03: string

      white: string
    }
  }
}
