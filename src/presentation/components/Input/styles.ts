import styled from 'styled-components'

export const Container = styled.input`
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
`
