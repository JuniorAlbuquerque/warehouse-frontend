import styled from "styled-components";

export const Container = styled.select`
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
`;
