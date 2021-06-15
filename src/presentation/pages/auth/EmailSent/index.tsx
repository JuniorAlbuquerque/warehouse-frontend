import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";


//STYLES
import {
    ContainerSignUp,
    Center,
    Title,
    SubTitle,
} from "./styles";


//COMPONENTS
import ButtonDefault from "presentation/components/ButtonDefault";


type ValidateEntry = {
    password: string,
};

const EmailSent: React.FC = () => {
    const history = useHistory();
    return (
        <ContainerSignUp>
            <label>ICCT</label>
            <Center>
                <Title>
                    E-mail sent
                </Title>

                <SubTitle>
                    An email with password recovery instructions has been sent.
                </SubTitle>

                <ButtonDefault
                    title="Go to login"
                    onClick={() => {history.push('/');}}
                />
            </Center>            
        </ContainerSignUp>
    );
}

export default EmailSent;
