import styled, { css } from "styled-components";


export const ContainerTilePage = styled.ul`
    margin-top: 1.5rem;
    list-style: none;
    display: flex;
    margin-bottom: 1rem;
    position: relative;
    li {        
        transition: all .3s;
        width: 10%;
        text-align: left;
        padding: 1.5rem 0;
        margin-right: 1%;
        cursor: pointer;
        z-index: 2;
        :hover{
            color: ${({ theme }) => theme.colors.blue7};
        }
    }

    .current-tab{
        color: ${({ theme }) => theme.colors.blue7};
        font-weight: 500;
    }

    .costcenter {
        left: 0px;
    }

    .purchasingsector {
        left: 11%;
    }
    .plants {
        left: 22%;
    }
    .warehouse {
        left: 33%;
    }
    .corridor {
        left: 44%;
    }
    .cabinet {
        left: 55%;
    }
    .shelf {
        left: 66%;
    }
    .pallet {
        left: 77%;
    }
    .box {
        left: 88%;
    }

    .line {
        transition: all .3s;
        display: block;
        position: absolute;
        bottom: 2px;
        height: 3px;
        width: 10%;
        min-width: 100px;
        background-color: ${({ theme }) => theme.colors.blue7};
        transition: all .3s;
    }
`;
