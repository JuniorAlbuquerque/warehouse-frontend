import styled, { css } from "styled-components";
import bg from "../../../assets/warehouse.png";

interface IButton {
  typeBtn?: string;
}

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;
`;

export const Background = styled.div`
  background-image: url(${bg});
  background-repeat: no-repeat;
  background-size: cover;
  display: initial;

  width: 100%;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const Content = styled.div`
  width: 100%;

  max-width: 740px;
  display: flex;
  padding: 20px 0px;
`;
export const Wrapper = styled.div`
  display: flex;
  margin: 0 auto;
  width: 52.5%;

  @media (max-width: 1024px) {
    width: 65%;
  }

  flex-direction: column;
  justify-content: space-between;

  h4 {
    font-family: "Montserrat";
    font-weight: 700;

    font-size: 2.4rem;
  }
`;

const anime = css`
  @keyframes slide {
    from {
      opacity: 0;
      transform: translateX(-40px);
    }
    to {
      opacity: 1;
      transform: translateX(0px);
    }
  }
`;

export const Form = styled.div`
  h1 {
    font-family: "Montserrat";
    margin-bottom: 14px;
  }

  p {
    margin-bottom: 18px;
  }

  animation: slide 0.55s cubic-bezier(0.68, -0.55, 0.27, 1.75) forwards;
  ${anime}
`;

export const Field = styled.div`
  margin-top: 18px;
  display: flex;
  flex-direction: column-reverse;

  label {
    font-size: 1.4rem;
    color: ${({ theme }) => theme.colors.gray};

    display: inline-block;
  }
`;

export const Input = styled.input`
  width: 100%;
  height: 5.4rem;
  padding: 4px 14px;

  margin-top: 8px;
  border-radius: 0.8rem;
  border: 1px solid ${({ theme }) => theme.colors.gray};

  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.blue};

    + label {
      color: ${({ theme }) => theme.colors.gray01};
    }
  }
`;

export const KeepConected = styled.div`
  margin-top: 14px;
  display: flex;
  align-items: center;

  input[type="checkbox"] {
    position: relative;
    width: 1.5em;
    height: 1.5em;
    color: ${({ theme }) => theme.colors.white};
    border: 1px solid ${({ theme }) => theme.colors.gray};
    border-radius: 4px;
    appearance: none;
    outline: 0;
    cursor: pointer;
    transition: background 275ms cubic-bezier(0.1, 0.1, 0.25, 1);

    &::before {
      position: absolute;
      content: "";
      display: block;
      top: 0.4rem;
      left: 0.8rem;
      width: 0.6rem;
      height: 1rem;
      border-style: solid;
      border-color: ${({ theme }) => theme.colors.white};
      border-width: 0 3px 3px 0;
      border-radius: 2px;
      transform: rotate(45deg);
      opacity: 0;
    }

    &:checked {
      color: ${({ theme }) => theme.colors.white};
      border: 0;
      background: ${({ theme }) => theme.colors.primary};

      &::before {
        opacity: 1;
      }
    }
  }

  label {
    position: relative;
    color: ${({ theme }) => theme.colors.gray};
    cursor: pointer;
    padding: 0 0.75em 0;
    user-select: none;

    font-size: 1.4rem;
  }
`;

const CancelButton = css`
  border: 1px solid #8c8a97;
  box-sizing: border-box;
  border-radius: 8px;
  background: none;
  font-size: 1.4rem;
  position: relative;

  color: ${({ theme }) => theme.colors.gray03};

  &:hover {
    /* background: ${({ theme }) => theme.colors.error};
    transition: 0.2s ease-out;
    color: ${({ theme }) => theme.colors.white};
    border: 1px solid ${({ theme }) => theme.colors.error}; */
  }
`;

const SendButton = css`
  font-size: 1.4rem;
  background: #4e2ec3;
  position: relative;
`;

export const Button = styled.button<IButton>`
  width: 100%;
  height: 4.8rem;

  margin-top: 1.8rem;
  border-radius: 0.8rem;
  border: 0;

  background: ${({ theme }) => theme.colors.primary};

  font-family: "Montserrat";
  color: ${({ theme }) => theme.colors.white};
  font-weight: 500;
  transition: filter 0.25s ease-out;

  &:hover {
    filter: brightness(90%);
  }

  ${(props) => props.typeBtn === "cancel" && CancelButton}
  ${(props) => props.typeBtn === "send" && SendButton}
`;

export const NotAccount = styled.div`
  display: flex;
  flex: 1;

  margin-top: 28px;
  justify-content: center;

  font-family: "Inter";
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.gray};

  span {
    color: ${({ theme }) => theme.colors.blue};
    font-weight: 500;

    cursor: pointer;
  }

  a {
    margin-left: 0.4rem;
    text-decoration: none;
  }
`;

export const ForgotPassword = styled.div`
  display: flex;
  margin-top: 8px;

  align-items: center;
  justify-content: center;

  span {
    color: ${({ theme }) => theme.colors.blue};
    font-family: "Inter";
    font-size: 1.4rem;
    cursor: pointer;

    font-weight: 500;
    margin-left: 8px;
  }
`;

export const Footer = styled.footer``;

export const Loader = styled.div`
  align-self: center;
  margin: 40px auto;
  position: absolute;
  left: 45.5%;

  background: linear-gradient(270deg, #623cea 0%, rgba(0, 0, 0, 0.1) 20%);
  /* Show only 10px from the border */
  -webkit-mask: linear-gradient(270deg, #623cea 0%, rgba(98, 60, 234, 0) 50%);

  mask: radial-gradient(farthest-side, transparent calc(100% - 3.5px), #fff 0);

  width: 45px;
  height: 45px;
  border-radius: 50%;
  animation: rot 0.7s linear infinite;

  @keyframes rot {
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const LoaderButton = styled.div`
  align-self: center;
  margin: 0px auto;

  background: linear-gradient(270deg, #fefefe 0%, rgba(0, 0, 0, 0.1) 20%);
  /* Show only 10px from the border */
  -webkit-mask: linear-gradient(270deg, #fefefe 0%, rgba(98, 60, 234, 0) 50%);

  mask: radial-gradient(farthest-side, transparent calc(100% - 3px), #fff 0);

  width: 30px;
  height: 30px;
  border-radius: 50%;
  animation: rot 0.45s linear infinite;

  @keyframes rot {
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const ForgotContent = styled.div`
  width: 100%;
  background: #fff;
  padding: 28px 32px;
  max-width: 50rem;

  border-radius: 8px;
  display: flex;
  flex-direction: column;

  p {
    font: 2rem Montserrat;
    font-weight: 700;
    margin-bottom: 24px;
  }

  span {
    color: ${({ theme }) => theme.colors.gray02};
    margin-bottom: 4px;
  }
`;

export const ForgotButtons = styled.div`
  display: flex;

  button {
    margin-right: 8px;

    & + button {
      margin-right: 0px;
    }
  }
`;
