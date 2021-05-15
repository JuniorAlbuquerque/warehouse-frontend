import styled, { css } from "styled-components";
import { animated } from "react-spring";

interface Type {
  type?: "success" | "error" | "warning";
  show?: boolean;
  style?: object;
}

const toastVariations = {
  success: css`
    background: ${({ theme }) => theme.colors.success};
  `,
  error: css`
    background: ${({ theme }) => theme.colors.error};
  `,
  warning: css`
    background: ${({ theme }) => theme.colors.warning};
  `,
};

export const Container = styled(animated.div)`
  position: absolute;

  overflow: hidden;
  padding: 30px 24px;

  right: 0;
  top: 0;

  font-family: "Roboto";
`;

export const ToastContent = styled(animated.div)<Type>`
  position: relative;
  z-index: 9999;

  width: 300px;

  padding: 24px;

  background: #ffffff;
  border: 1px solid #f4f4f4;
  box-sizing: border-box;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25);
  border-radius: 8px;

  display: flex;
  align-items: center;

  svg {
    margin-right: 14px;
  }

  &:after {
    content: "";

    width: 8px;
    height: 101.8%;

    ${(props) => toastVariations[props.type || "success"]};

    position: absolute;
    top: -1px;
    left: -0.7px;
    border-radius: 8px;
  }

  div {
    flex: 1;

    p {
      margin-bottom: 8px;
    }

    span {
      font-size: 14px;
      opacity: 0.8;
      line-height: 20px;
      margin-right: 4px;
    }
  }

  button {
    position: absolute;
    background: none;
    border: 0;

    right: 0px;
    top: 10px;

    cursor: pointer;
    outline: none;

    opacity: 0.6;
  }
`;
