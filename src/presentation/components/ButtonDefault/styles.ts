import styled, { css } from "styled-components";


export const ContainerButtonDefault = styled.div`
  button{
    width: 190px;    
    height: 4.8rem;

    margin-top: 1.8rem;
    border-radius: 0.8rem;
    border: 0;

    background-color: ${({ theme }) => theme.colors.primary};

    font-family: "Montserrat";
    color: ${({ theme }) => theme.colors.white};
    font-weight: 500;
    transition: filter 0.25s ease-out;

    &:hover {
        filter: brightness(90%);
    }
  }

`;