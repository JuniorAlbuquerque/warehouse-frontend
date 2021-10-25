import styled from 'styled-components';

export const PageHomeContent = styled.div`            

    /* @media (max-width: 2000px) {
        .control-over{
            max-height: 400px;
        }
    }

    @media (max-width: 1570px) {
        .control-over{
            max-height: 320px;            
        }
    }

    @media (max-width: 1370px) {
        .control-over{
            max-height: 160px;            
        }
    } */
`;

export const ContenHome = styled.div`
    background-color: ${({ theme }) => theme.colors.white};
    min-height: 50vh;    
    width: 100%;
    padding: 0 2rem;    
    /* background-color: ${({ theme }) => theme.colors.warning}; */
`;

export const FormRegistered = styled.div`
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 8px;
`;

export const Back = styled.div`
    display: inline-flex;
    align-items: center;
    cursor: pointer;    
    span{
        font-size: 12px;
        color: ${({ theme }) => theme.colors.gray05};
        font-weight: 500;
        margin-left: 1rem;
    }
`;

export const TitleTable = styled.div`
    padding: 0 2rem;

    h1{
        font-size: 1.5rem;
        color: ${({ theme }) => theme.colors.primary02};
        font-weight: 700;
        margin: 1rem 0;
    }
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray05};    

`;

interface PropsFormAdd {
    center?: 'yes';
}

export const FormAdd = styled.form<PropsFormAdd>`
    display: flex;
    flex-direction: column;
    align-items:  ${(props) => props.center === 'yes' ? 'center' : 'initial'} ;
    /* align-items: initial; */
    padding: 2rem;
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 8px;
    .title-current-aba{
        /* padding-top: 2rem; */
        h1{
            font-size: 1.75rem;
            font-weight: 500;
            color: ${({ theme }) => theme.colors.gray07};    
        }
    }
    
    .tree{
        display: flex;
        justify-content: space-between;
        div{
            width: 30%;
        }
    }
    .two{
        width: 65%;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        div{
            width: 46%;
        }
    }    
    `;

export const HeaderTable = styled.ul`    
    padding: 0 2rem;
    list-style: none;
    display: flex;
    justify-content: space-between;
    margin-top: 1.5rem;        
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray08};
    li{
        font-weight: 600;
        padding: 1rem;
        font-size: 14px;
        color: ${({ theme }) => theme.colors.gray07};        
    }    
`;

export const ScroolContentTable = styled.ul`  
    height: 35vh;
    overflow-x: auto;
    scrollbar-width: thin;          /* "auto" or "thin" */
    scrollbar-color: ${({ theme }) => theme.colors.white};
    ::-webkit-scrollbar {
        width: 5px;
        height: 8px;
        background-color: ${({ theme }) => theme.colors.white};
        border-radius: 20px;
    }

    ::-webkit-scrollbar-thumb {
        background: ${({ theme }) => theme.colors.gray05};
    }
`;

export const ContentTable = styled.ul`
    padding: 0 2rem;
    list-style: none;
    display: flex;
    justify-content: space-between;
    margin-top: 1.5rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray08};    
    li{
        padding: 1rem;
        font-size: 14px;
        color: ${({ theme }) => theme.colors.gray03};

    }
    .options{
        display: flex;
        justify-content: space-between;
        padding: 0;
        .option{
            padding: 0;
            display: flex;
            align-items: center;
            width: 40%;
            svg {
                margin-right: 5px;
            }
            span{
                font-size: 12px;
                color: ${({ theme }) => theme.colors.gray03};
            }
            cursor: pointer;
            :hover {
                span{
                    color: ${({ theme }) => theme.colors.blue};
                }
            }
        }
    }
    :hover {
        background-color: #E8E8E1;
        cursor: pointer;
    }
`;



