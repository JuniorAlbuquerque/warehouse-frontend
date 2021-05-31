import styled from "styled-components";

export const ContainerTopAndSide =  styled.div`
    width: 100%;
    background-color: ${({ theme }) => theme.colors.white01};
`;

export const Top = styled.div`
    height:  9.63855421686747vh;
    background-color: ${({ theme }) => theme.colors.white};
    border: 2px solid ${({ theme }) => theme.colors.white01};
    display: flex;
    .logo{
        width: 240px;
        max-width: 240px;
        height: 100%;
        border-right: 2px solid ${({ theme }) => theme.colors.white01};
        display: flex;
        justify-content: space-between;        
        align-items: center;
        padding: 0 1rem;
        h1{                        
            font-size: 18px;
            font-weight: 600;
        }
        img {
            height: 24px;
            width: 24px;
            cursor: pointer;
        }
    }
    .contenTop{
        max-width: 1136px;
        width: 75%;
        margin: auto;
        display: flex;
        justify-content: space-between;
        ul {
            list-style: none;
            display: flex;
            align-items: center;
            li{
                display: flex;
                flex-direction: row;
                span{
                    font-size: 12px;
                    color: ${({ theme }) => theme.colors.gray05};
                    font-weight: 400;
                }    
                img {
                    /* padding: 0 15px; */
                    margin: auto 15px;
                    width: 5px;
                    height: 10px;
                }
            }
        }
        .profile{
            cursor: pointer;
            z-index: 1;
            span{
                font-size: 14px;
                color: ${({ theme }) => theme.colors.gray03};
                font-weight: 400;
                margin-right: 1.1rem;
            }
            img {
                transform: rotate(90deg);
                width: 5px;
                height: 10px;
            }
        }
    }
`;


export const MainBody = styled.div`
    display: flex;
    height: 90.36144578313253vh;    
`;

export const Side = styled.div`
    background-color: ${({ theme }) => theme.colors.white};
    border: 2px solid ${({ theme }) => theme.colors.white01};
    border-top: none;
    width: 242px;
    max-width: 242px;
    height: 100%;
`;

export const OptionItem = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 1.625rem 2rem;
    align-items: center;
    
    .item{
        display: flex;
        align-items: center;
        span{
            margin-left: 10px;
            font-family: "Roboto";
            font-size: 14px;
            font-weight: 400;
            color: ${({ theme }) => theme.colors.gray02};
        }
        img{
            width: 20px;
            height: 20px;
        }
    }
    :hover{
        cursor: pointer;
    }
`;

export const Options = styled.ul`
    list-style: none;
    li{
        padding: 1rem 0;
        span{
            margin-left: 30px;
            font-family: "Roboto";
            font-size: 12px;
            font-weight: 400;
            color: ${({ theme }) => theme.colors.gray05};
        }
        :hover {
            cursor: pointer;
            span{
                color: ${({ theme }) => theme.colors.primary02};
            }
        }
    }

`;

export const Chieldren = styled.div`
    background-color: ${({ theme }) => theme.colors.white};
    max-width: 1136px;
    width: 75%;
    border-radius: 8px;
    margin: 2rem auto;    
    height: fit-content;
`;

