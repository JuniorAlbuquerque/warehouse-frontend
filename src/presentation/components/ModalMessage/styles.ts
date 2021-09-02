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
`;

interface PropsResult {
  colorBackground?: string,
}

export const Result  =  styled.div<PropsResult>`
  background-color: ${(props) => props.colorBackground} ;
  border-radius: 16px 16px 0 0;
  display: block;
  span {
    font-size: 20px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.white};
    cursor: pointer;
    width: 100%;
    display: block;
    text-align: right;
    padding: 1rem 1.5rem 0 0;
  }

  img {
    display: block;
    margin: auto;
  }
`;

export const TitleModal = styled.div`
  
  h1 {
    font-size: 18px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.white};
    text-align: center;
    padding: 1rem 0;
  }

`;
export const Description = styled.h2`
  font-weight : 400;
  color:  ${({ theme }) => theme.colors.gray05};
  font-size: 15px;
  margin-top: 1.5rem;
  padding: 1.5rem;
`;

export const ContainerControllers= styled.div<PropsResult>`
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;
  padding-bottom: 1.5rem;
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


  .confirm {
    background-color: ${(props) => props.colorBackground};
  }
`;
