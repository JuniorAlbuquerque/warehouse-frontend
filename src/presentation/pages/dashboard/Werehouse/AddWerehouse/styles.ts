import styled from 'styled-components';

export const PlantHomeContent = styled.div`    
    min-height: 60vh;
`;

export const ContenHome = styled.div`
    background-color: ${({ theme }) => theme.colors.white};
    margin-top: 1rem;
    border: 1px solid blueviolet;
    padding: 1rem;
`;

export const TitleTable = styled.div`
    span{
        font-size: 12px;
        color: ${({ theme }) => theme.colors.gray05};
        font-weight: 500;        
    }

    h1{
        font-size: 24px;
        color: ${({ theme }) => theme.colors.gray02};
        font-weight: 700;
        margin-top: 1rem;
    }
`;

export const ControlOptions = styled.div`
    width: 65%;
    display: flex;
    justify-content: space-between;
    div {
        width: 46%;
        button {
            width: 100%;
        }
    }
`;