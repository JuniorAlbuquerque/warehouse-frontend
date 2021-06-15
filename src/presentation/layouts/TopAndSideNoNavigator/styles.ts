import styled from "styled-components";

export const ContainerTopAndSide =  styled.div`
    width: 100%;
    background-color: ${({ theme }) => theme.colors.white01};    
`;

export const Top = styled.div`
    height:  9.63855421686747vh;
    background-color: ${({ theme }) => theme.colors.white};
    border-bottom: 2px solid ${({ theme }) => theme.colors.white01};
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
        background-color: ${({ theme }) => theme.colors.secondaryBlue};
        h1{                        
            font-size: 18px;
            font-weight: 600;
            color: ${({ theme }) => theme.colors.white01};
        }
        svg {
            height: 24px;
            width: 24px;
            cursor: pointer;
        }
    }

    .newOptions{
        /* max-width: 1136px; */
        width: 75%;
        display: flex;
        margin: auto;
    }
    .contenTop{    
        /* max-width: 1136px; */
        width: 75%;
        margin: auto;
        display: flex;
        justify-content: flex-end;
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
    /* background-color: ${({ theme }) => theme.colors.white}; */
    background-color: ${({ theme }) => theme.colors.secondaryBlue};
    border: none;
    border-right: 2px solid ${({ theme }) => theme.colors.white01};
    /* border-bottom: 2px solid ${({ theme }) => theme.colors.white01}; */
    width: 240px;
    max-width: 240px;
    height: 100%;
`;

interface Props {
    controlRegister? : boolean,
    controlDashboard? : boolean,
}

export const OptionItem = styled.div<Props>`
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
            color: ${({ theme }) => theme.colors.white};
        }
    }
    :hover {
        background-color: ${({ theme }) => theme.colors.white};
        span{            
            color: ${({ theme }) => theme.colors.secondaryBlue};
        }
        svg {            
            path {
                stroke: ${({ theme }) => theme.colors.secondaryBlue};
            }
        }
    }
    .item-icon-svg{
        width: 20px;
        height: 20px;        
        transition: transform 0.2s ease;
        transform: rotate(${(props) => props.controlRegister && 90}deg);
    }
    /* .register {
    } */
    :hover{
        cursor: pointer;
    }
`;


export const Options = styled.ul<Props>`
    list-style: none;            
    transition: transform 0.2s ease;
    transform: scaleY(${(props) => !props.controlRegister && 0});
    transform: scaleY(${(props) => props.controlRegister && 1});    
    transform-origin: top;    
    li{
        padding: 1rem 0;
        span{
            margin-left: 30px;
            font-family: "Roboto";
            font-size: 12px;
            font-weight: 400;
            color: ${({ theme }) => theme.colors.white};
        }        
        :hover {
            cursor: pointer;
            span{
                color: ${({ theme }) => theme.colors.primary02};
            }
            svg {
                filter: red;
            }
        }
        :hover {
            background-color: #E8E8E1;
        }
    }

`;

export const Chieldren = styled.div`
    /* max-width: 1136px;     */
    /* position: relative; */
    width: 75%;
    border-radius: 8px;
    margin: 2rem auto;    
    /* margin-left: 240px; */
    height: fit-content;    
`;