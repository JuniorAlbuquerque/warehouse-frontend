import styled from 'styled-components';

export const PageHomeContent = styled.form`    

`;

export const NavInfo = styled.div`    
    background-color: #3B5BDB;
    display: flex;
    padding: 1rem 2rem;
    /* align-items: center; */
    /* border: 1px solid red; */
    
    h1{
        font-size: 15px;
        color: ${({ theme }) => theme.colors.white};
        cursor: pointer;
    }
    
    span{
        margin-left: 16px;
        font-size: 18px;
        color: ${({ theme }) => theme.colors.white};
    }
`;

export const NavFooter = styled.div`    
    background-color: #8C8A97;
    position: absolute;
    bottom: 0;
    width: 99.9%;
    display: flex;
    padding-bottom: 2rem;
    justify-content : center;
    h1{
        font-size: 15px;
        color: ${({ theme }) => theme.colors.white};
        cursor: pointer;
    }
    span{
        margin-left: 16px;
        font-size: 18px;
        color: ${({ theme }) => theme.colors.white};
    }
`;

export const ContenHome = styled.div`
    background-color: ${({ theme }) => theme.colors.white};
    margin-top: 1.5rem;
    min-height: 60vh;
    padding: 1rem 2rem;
    width: 100%;
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
    h1{
        font-size: 1.5rem;
        color: ${({ theme }) => theme.colors.primary02};
        font-weight: 700;
        margin: 1rem 0;
    }
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray05};
`;

export const FormAdd = styled.div`
    max-width: 1136px;
    width: 75%;
    margin: auto;
    .center{
        width: 33%;
        margin: 0 auto;
    }
    h2{
        font-size: 24px;
        font-weight: 700;
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
        div{
            width: 46%;
        }
    }    
`;

interface TableSizes {
    tam: number;
}
export const HeaderTable = styled.ul`
    list-style: none;
    display: flex;
    justify-content: space-between;
    margin-top: 1.5rem;
    li{
        padding: 1rem;
        font-size: 14px;
        color: ${({ theme }) => theme.colors.gray02};
    }
`;

export const ContentTable = styled.ul`
    list-style: none;
    display: flex;
    justify-content: space-between;
    margin-top: 1.5rem;
    li{
        padding: 1rem;
        font-size: 14px;
        color: ${({ theme }) => theme.colors.gray03};
    }
    .options{
        display: flex;
        justify-content: space-between;        
        .option{
            display: flex;
            align-items: center;            
            width: 50%;
            svg {
                margin-right: 5px;
            }
            span{
                font-size: 14px;
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



