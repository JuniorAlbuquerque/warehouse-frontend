import styled, { css } from "styled-components";


export const ContainerTilePage = styled.ul`
    border: 1px solid red;
    margin-top: 1.5rem;
    list-style: none;
    display: flex;
    justify-content: space-between;    
    li {
        width: 14.28%;
        padding: 1.5rem .9rem;
        cursor: pointer;
        z-index: 2;
        text-align: center;
        :hover{
            background-color: ${({ theme }) => theme.colors.secondaryBlue} !important;
            color: ${({ theme }) => theme.colors.white};
        }
    }
`;
