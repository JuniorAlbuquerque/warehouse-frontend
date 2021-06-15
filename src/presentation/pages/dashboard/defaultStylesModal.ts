import styled from "styled-components";

export const DivModal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;  
    z-index: 99;
    .modal__overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, .8);
      cursor: pointer;      
    }
    `;

export const BoxModal = styled.div`
    position: relative;
    width: 328px;
    box-sizing: border-box;
    border-radius: 16px;
    background-color: white;
    padding: 1.5rem;
`;

export const TitleModal = styled.div`
    display: flex;
    justify-content: space-between;

    h1 {
      font-size: 18px;
      font-weight: 700;
      color: ${({ theme }) => theme.colors.black};
    }

    span {
      font-size: 20px;
      font-weight: 700;
      color: ${({ theme }) => theme.colors.black};
      cursor: pointer;
    }

    img {
      cursor: pointer;
    }
`;
export const Description = styled.h2`
  font-weight : 400;
  color:  ${({ theme }) => theme.colors.gray05};
  font-size: 15px;
  margin-top: 1.5rem;
`;

export const ContainerControllers= styled.div`
  margin-top: 1.5rem;
  display: flex;
  justify-content: space-between;
  button {
    border: none;
    width: 48%;
    border-radius: 5px;
    padding-top: .7rem;
    padding-bottom: .9rem;
    cursor: pointer;
    transition: all .3s;
    color:  ${({ theme }) => theme.colors.white};
    font-size: 16px;
    /* font-weight: 600; */
  }

  .cancel {
    background-color:  ${({ theme }) => theme.colors.gray05};

    &:hover{
      background-color:  ${({ theme }) => theme.colors.gray03};
    }
  
  }

  .confirm {
    background-color:  ${({ theme }) => theme.colors.error};

    /* &:hover{
      background-color:  ${({ theme }) => theme.colors.black};
    } */

  }
`;
