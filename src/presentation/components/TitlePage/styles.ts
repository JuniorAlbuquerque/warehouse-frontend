import styled, { css } from "styled-components";

export const ContainerTilePage = styled.div`
    /* padding: 0 2rem; */
    margin: 2rem 0;
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