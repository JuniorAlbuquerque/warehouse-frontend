import React, { useState } from "react";
import { useHistory } from "react-router-dom";

//API
import api from "infra/services/api";
import { DELETE_USER } from "infra/config/api";

//STYLES
import {
    DivModal,
    BoxModal,
    TitleModal,
    Description,
    ContainerControllers
} from "../../defaultStylesModal";

//COMPONENTS
import Loading from "presentation/components/Loading";
import { useToast } from "data/hooks/toast";

// //ASSETS
// import Close from "Assets/Icons/close.svg";

interface ModalProps {
    id: string,
    isOpen: boolean,
    onClose: () => void,
    updateData: () => void,
}

const ModalDelete: React.FC<ModalProps> = ({ id, isOpen, onClose, updateData }) => {
    const history = useHistory();
    const outsideRef = React.useRef(null);
    const [controlLoading, setControlLoading] = useState<string>('no');
    const { addToast } = useToast();

    const handleDelete = () => {
        setControlLoading('yes')
        api.delete(DELETE_USER+id)
        .then((res) => {
            addToast({
                type: "success",
                title: "Successful deletion!",
                message: `Sucess`,
            });
            setControlLoading('no')
            updateData();
            onClose();
        })
        .catch((err) => {
            console.log(err.response.data.message)
            addToast({
                type: "error",
                title: "Error",
                message: err.response.data.message? err.response.data.message : "Error",
            });
            setControlLoading('no')
        });
    }
    
    const handleCloseOnOverlay = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        if (e.target === outsideRef.current) {
            onClose();
        }
    };

    return isOpen ? (
        <DivModal>
            <div ref={outsideRef} className={"modal__overlay"} onClick={handleCloseOnOverlay} />
            <BoxModal>
                <TitleModal>
                    <h1>Delete Pallet</h1>
                    {/* <img src={Close} alt="Icon Close Modal" onClick={onClose} /> */}
                    <span onClick={onClose}>X</span>
                </TitleModal>
                <Description>
                        Are you sure you want to delete this user?  
                    {id}

                </Description>

                <Loading
                    size="small"
                    visible={controlLoading}
                    space="spaceTop"
                />

                <ContainerControllers>
                    <button className="cancel" disabled={ controlLoading === 'yes' ? true : false } onClick={onClose}>Cancel</button>
                    <button className="confirm" disabled={ controlLoading === 'yes' ? true : false } onClick={handleDelete}>Confirm</button>
                </ContainerControllers>
            </BoxModal>
        </DivModal>
    ) : null;
};

export default ModalDelete;
