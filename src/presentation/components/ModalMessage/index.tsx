import React, { useState } from "react";
import { useHistory } from "react-router-dom";

//STYLES
import {
    DivModal,
    BoxModal,
    TitleModal,
    Description,
    ContainerControllers,
    Result
} from "./styles";


// //ASSETS
import IconSuccess from "assets/icons/success.png";
import Error from "assets/icons/error.png";

//COMPONENTS
import Loading from "presentation/components/Loading";
import { useToast } from "data/hooks/toast";


interface ModalProps {
    title: string,
    description: string,
    type?: 'Error' | 'Success',
    isOpen: boolean,
    onClose: () => void,
}

const ModalMessage: React.FC<ModalProps> = ({ title, description, type, isOpen, onClose }) => {
    const history = useHistory();
    const outsideRef = React.useRef(null);
    const [controlLoading, setControlLoading] = useState<string>('no');
    const { addToast } = useToast();

    const handleCloseOnOverlay = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        if (e.target === outsideRef.current) {
            onClose();
        }
    };

    return isOpen ? (
        <DivModal>
            <div ref={outsideRef} className={"modal__overlay"} onClick={handleCloseOnOverlay} />
            <BoxModal>
                <Result colorBackground="#3CB878" >
                    <span onClick={onClose}>X</span>
                    <img src={IconSuccess} alt="Result" />
                    <TitleModal>
                        <h1>{title}</h1>
                    </TitleModal>
                </Result>
                <Description>
                    {description}
                </Description>

                <Loading
                    size="small"
                    visible={controlLoading}
                    space="spaceTop"
                />

                <ContainerControllers colorBackground="#3CB878">
                    <button className="confirm" disabled={ controlLoading === 'yes' ? true : false } onClick={onClose}>Confirm</button>
                </ContainerControllers>
            </BoxModal>
        </DivModal>
    ) : null;
};

export default ModalMessage;
