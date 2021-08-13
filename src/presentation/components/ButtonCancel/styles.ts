import styled, { css } from "styled-components";


export const ContainerButtonDefault = styled.div`
  width: 100%;
  button{
    /* width: 190px;     */
    width: 30%;
    height: 4.8rem;
    margin-top: 1.8rem;
    border-radius: 0.8rem;
    border: 0;
    background-color: ${({ theme }) => theme.colors.white};
    border: 1px solid ${({ theme }) => theme.colors.gray07};
    font-family: "Montserrat";
    color: ${({ theme }) => theme.colors.gray07};
    font-weight: 500;
    transition: filter 0.25s ease-out;
    /* &:hover {
        filter: brightness(90%);
    } */
  }

`;