import styled from 'styled-components';

export const ContainerSignUp = styled.div`
    label{
        display: block;
        font-family: "Montserrat";
        font-weight: 700;
        font-size: 2.4rem;
        margin-left: 2rem;
        margin-top: 2rem;
    }
`;

export const ImgLogo = styled.img` 
    margin-left: 5rem;
    height: 90px;
    width: 100px;
    left: 112px;
    margin-top: 2rem;
`;

export const Center = styled.form`    
    margin: auto;
    margin-top: 3rem;
    box-sizing: border-box;
    align-items: center;
    display: flex;
    flex-direction: column;
    width: 41.67%;
    max-width: 384px;    
    position: relative;
    button{
        margin: 2rem auto;
        
    }
`;
export const PasswordSecurity = styled.h1` 
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    progress {
        display: none;
    }
    span {
        height: 2px;
        border-radius: 20px;
        width: 23%;
    }
    .position-selected {
        background-color: ${({ theme }) => theme.colors.success};
    }
    label {
        margin-top: 1rem;
        color: ${({ theme }) => theme.colors.success};
        text-align: center;
        width: 100%;
        font-size: 0.875rem;
        font-weight: 400;
    }
`;

export const MesageEmpyCamp = styled.div` 
    margin-bottom: 1rem;
    span {
        color: ${({ theme }) => theme.colors.error};
        font-weight: 500; 
        font-size: 1rem;
    }
    .msg-error {
        display: block;
    }   
    .disabled {
        display: none;
    }
`;

export const Title = styled.h1` 
    color: ${({ theme }) => theme.colors.gray01};
    font-weight: 700;
    font-size: 2rem;
    width: 100%;
    text-align: center;
    margin-bottom: 2rem;
`;

export const SubTitle = styled.h1` 
    color: ${({ theme }) => theme.colors.gray01};
    font-weight: 500;
    font-size: 1.5rem;
    width: 100%;
    text-align: center;
    margin-top: 2rem;
`;




export const Member = styled.div`
    margin-top: 2.5rem;
    display: flex;
    justify-content: center;
    font-weight: 500;
    
    font-size: 1rem;
    span {
        color: ${({ theme }) => theme.colors.gray03};
    }
    a {
        margin-left: 5px;
        text-decoration: none;        
        color: ${({ theme }) => theme.colors.primary02};
    }
`;

export const ContFooter = styled.img`
    display: flex;
    justify-content: space-space-between;
    position: absolute;
    width: 100%;
    box-sizing: border-box;
    bottom: 0rem;
    
`;