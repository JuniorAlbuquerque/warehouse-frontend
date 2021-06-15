import styled from 'styled-components';


export const ContainerLoading = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    .no {
        display: none;
    }

    .yes {
        display: block;
    }

    .spaceTop {
        margin-top: 1rem;
    }
    .spaceBottom {
        margin-bottom: 1rem;
    }

    @keyframes rotate {
        from { transform: rotate(0deg);   }
        to   { transform: rotate(360deg); }
    }

    .spinner {
        animation: rotate 1s linear infinite;
        background: ${({ theme }) => theme.colors.blue};
        border-radius: 50%;    
        position: relative;    
    }

    .large {
        height: 94px;
        width: 94px;
    }

    .medium {
        height: 72px;
        width: 72px;
    }

    .small {
        height: 42px;
        width: 42px;
    }

    .min{
        height: 12px;
        width: 12px;
    }

    .extra-small {
        height: 30px;
        width: 30px;    
    }

    .spinner::before,
    .spinner::after {
        content: '';
        position: absolute;
    }

    .spinner::before {
        border-radius: 50%;
        background: 
            linear-gradient(0deg,   hsla(0, 0%, 100%, 1  ) 50%, hsla(0, 0%, 100%, 0.9) 100%)   0%   0%,
            linear-gradient(90deg,  hsla(0, 0%, 100%, 0.9)  0%, hsla(0, 0%, 100%, 0.6) 100%) 100%   0%,
            linear-gradient(180deg, hsla(0, 0%, 100%, 0.6)  0%, hsla(0, 0%, 100%, 0.3) 100%) 100% 100%,
            linear-gradient(360deg, hsla(0, 0%, 100%, 0.3)  0%, hsla(0, 0%, 100%, 0  ) 100%)   0% 100%
        ;
        background-repeat: no-repeat;
        background-size: 50% 50%;
        top: -1px;
        bottom: -1px;
        left: -1px;
        right: -1px;    
    }

    .spinner::after {
        background: white;
        border-radius: 50%;
        top: 8%;
        bottom: 8%;
        left: 8%;
        right: 8%;    
    }

`;

