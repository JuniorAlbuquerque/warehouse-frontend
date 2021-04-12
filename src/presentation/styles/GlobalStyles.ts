import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    outline: 0;
  }

  body {
    background: #fff;
    color: ${({ theme }) => theme.colors.gray01};
    -webkit-font-smoothing: antialiased;
  }

  html {
    font-size: 62.5%;

    @media (max-width: 768px) {
      font-size: 40%;
    }
  }

  body, input, button, select {
    font-family: 'Roboto', sans-serif;
    font-size: 1.6rem;
  }

  button {
    cursor: pointer;
  }
`;
