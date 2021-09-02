import styled from 'styled-components';


interface visibilityBack {
    state? : boolean;
}
export const ContainerBreadcrumb = styled.div<visibilityBack>`

    
.back{
    visibility: ${(props) => props.state ? 'visible' : 'hidden' }  ;
    margin-bottom: 1.8rem;
    display: inline-flex;
    align-items: center;
    img {
        display: block;
        width: 16px;
        height: 16px;
    }
    span {
        margin-left: 1.2rem;
    }

    :hover {
        cursor: pointer;
        svg {            
            path {
                stroke: ${({ theme }) => theme.colors.secondaryBlue};
            }
        }
    }

}
span {
    color: ${({theme}) => theme.colors.gray05};
    font-size: 12px;
}

    .cont-breadcrumb{
        display: flex;
        .format-font{
            display: flex;
            align-items: center;        
            .current-font{
                color: ${({theme}) => theme.colors.gray07};
                font-weight: 500;
            }
    
            svg {
                margin: 0 1.2rem;
                width: 15px;
                height: 10px;
            }
        }
    }    
`;