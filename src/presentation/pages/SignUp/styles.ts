import styled, { css } from "styled-components";

interface SelectTypeUser {
  active?: boolean;
}

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;
`;

export const Background = styled.div`
  position: fixed;
  width: 100%;
  bottom: -10px;
  pointer-events: none;

  img {
    width: 100%;
  }

  animation: up 0.55s cubic-bezier(0.68, -0.55, 0.27, 1.75) forwards;

  @keyframes up {
    from {
      opacity: 0;
      transform: translateY(40px);
    }
    to {
      opacity: 1;
      transform: translateY(0px);
    }
  }
`;

export const Wrapper = styled.div`
  width: 100%;
  display: flex;

  flex-direction: column;
  align-items: center;
  padding: 20px 0px;
`;

export const Header = styled.div`
  width: 100%;
  max-width: 1295px;

  @media (max-width: 1280px) {
    max-width: 1080px;
  }

  @media (max-width: 1024px) {
    max-width: 900px;
  }

  h4 {
    font-family: "Montserrat";
    font-weight: 700;

    font-size: 2.4rem;
    cursor: pointer;
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
  width: 100%;
  max-width: 400px;
  margin-top: 4.8rem;

  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    font-family: "Montserrat";
    font-size: 3.2rem;

    font-weight: 700;
    margin-bottom: 1.8rem;
  }

  animation: slide 0.55s cubic-bezier(0.68, -0.55, 0.27, 1.75) forwards;
  ${anime}

  form {
    width: 100%;

    margin-top: 8px;

    p {
      text-align: center;
      margin-top: 24px;

      color: ${({ theme }) => theme.colors.gray03};
      font-family: "Inter";

      span {
        color: ${({ theme }) => theme.colors.blue};
        font-weight: 500;
        cursor: pointer;
      }
    }
  }
`;

export const Tabs = styled.div`
  display: flex;
  margin-top: 3.2rem;

  width: 100%;
`;

export const Tab = styled.div<SelectTypeUser>`
  padding: 0.5rem 0 0.9rem;
  width: 50%;
  font-weight: 400;

  cursor: pointer;

  color: ${(props) =>
    props.active ? props.theme.colors.primary : props.theme.colors.gray};
  border-bottom: 1px solid #8c8a97;
  border-bottom-right-radius: 1px;

  position: relative;

  &:last-child {
    span {
      width: 100%;

      &:after {
        content: "";
        position: absolute;
        left: ${(props) => (props.active ? "0px" : "-100%")};
        bottom: -1px;
        width: inherit;
        height: 2px;
        background: ${({ theme }) => theme.colors.primary};
        border-radius: 3px;
        pointer-events: none;

        -webkit-transition: all 0.25s ease;
        -moz-transition: all 0.25s ease;
        -o-transition: all 0.25s ease;
        transition: all 0.25s ease;
      }
    }
  }
`;

export const Field = styled.div`
  margin-top: 18px;
  display: flex;
  flex-direction: column-reverse;
  position: relative;

  label {
    font-size: 1.4rem;
    color: ${({ theme }) => theme.colors.gray03};

    display: inline-block;
  }

  select {
    padding: 1.5rem;
    border-radius: 8px;
    background: #fff;

    border: 1px solid ${({ theme }) => theme.colors.gray};

    border-radius: 8px;
    margin-top: 8px;

    -webkit-appearance: none;
    -moz-appearance: none;

    cursor: pointer;

    &:focus {
      border: 1px solid ${({ theme }) => theme.colors.blue};

      + label {
        color: ${({ theme }) => theme.colors.gray01};
      }
    }
  }

  svg {
    position: absolute;
    right: 10px;
    top: 42px;

    pointer-events: none;
  }
`;

export const Button = styled.button`
  width: 100%;
  height: 5.4rem;

  margin-top: 28px;
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
`;
