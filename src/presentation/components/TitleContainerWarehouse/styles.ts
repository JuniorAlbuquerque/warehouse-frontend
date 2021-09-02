import styled, { css } from "styled-components";

export const ContainerTilePage = styled.div`
    padding-top: 2rem;
    margin-top: 2rem;
`;

export const ContentTitle = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    button {
        margin-top: 0;
    }
`;

export const TitlePage = styled.h1`

    font-size: 24px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.gray07};    
`;