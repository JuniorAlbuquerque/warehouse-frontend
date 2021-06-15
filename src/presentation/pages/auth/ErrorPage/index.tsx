import React, { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { useHistory } from "react-router-dom";


//STYLES
import {
    ContainerSignUp,
    Center,
    MesageEmpyCamp,
    ImgLogo,
    Title,
    SubTitle,
    Member,
    ContFooter,
    PasswordSecurity,
} from "./styles";


//COMPONENTS
import ButtonDefault from "presentation/components/ButtonDefault";

//ASSETS
// import Logo from "Assets/Images/LOGO.png";
// import Footer from "Assets/Images/footer.svg";



type ValidateEntry = {
    password: string,
};

const ErrorPage: React.FC = () => {
    const history = useHistory();
    return (
        <ContainerSignUp>
            <label>ICCT</label>
            <Center>
                <Title>
                    Token invalid
                </Title>

                <SubTitle>
                    The url you use is no longer valid for, to get another ...
                </SubTitle>

                <ButtonDefault
                    title="Go to login"                    
                    onClick={() => {history.push('/');}}
                />
            </Center>
            {/* <ContFooter
                src={Footer}
            /> */}
        </ContainerSignUp>
    );
}

export default ErrorPage;
