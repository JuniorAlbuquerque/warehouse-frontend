import React from "react";
import { useHistory } from "react-router-dom";

//STYLES 
import  {
    ContainerBreadcrumb
} from './styles';

//ASSETS
import ArrowLeft from 'assets/icons/arrow-left.svg';


interface Props {
    before : string[],
    current : string,
    back : false | true;
}

const Breadcrumb : React.FC<Props> = ({ back, before, current }) => {
    const history = useHistory();
    return (
        <ContainerBreadcrumb state={back}>
                
                    <div                        
                        className="back"
                        onClick={() => history.goBack()}
                    >
                        <img src={ArrowLeft} alt="Arrow Back" />
                        <span>Back</span>
                    </div>
                

            <div className="cont-breadcrumb">
                {
                    before.map((elem, index) =>
                        <div key={index} className="format-font">
                            <span>{elem}</span>
                            <svg width="5" height="7" viewBox="0 0 5 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 6.5L4 3.5L1 0.5" stroke="#ADB5BD" strokeLinecap="round" strokeWidth="round"/>
                            </svg>
                        </div>
                    )
                }
                <div className="format-font">
                    <span className="current-font">{current}</span> 
                </div>
            </div>

        </ContainerBreadcrumb>
    );
}

export default Breadcrumb;