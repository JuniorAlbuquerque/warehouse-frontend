import styled from "styled-components";

export const Field = styled.div`
  margin-top: 18px;
  display: flex;
  flex-direction: column;

  label {
    font-size: 1.4rem;
    color: ${({ theme }) => theme.colors.gray};
    display: inline-block;
  }

  span {
    color: ${({ theme }) => theme.colors.error};
    font-size: 12px;    
    margin-top: .4rem;
  }
`;

export const Input = styled.input`
  width: 100%;
  height: 4.8rem;
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

export const SelectOption = styled.select`
  width: 100%;
  height: 4.8rem;
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
  option{
    /* font-family: ; */
  }
`;