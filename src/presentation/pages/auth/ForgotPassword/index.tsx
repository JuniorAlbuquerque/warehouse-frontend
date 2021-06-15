import React, { useState, useCallback } from "react";
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

//API
import api from "infra/services/api";
import { FORGOT_PASSWORD } from "infra/config/api";

//STYLES
import {
  Container,
  Background,
  Content,
  Form,
  Back,
  Footer,
  Wrapper,
  KeepConected,
  Button,
  NotAccount,
  Loader,
  ForgotContent,
  ForgotButtons,
  LoaderButton,
} from "./styles";

import { Field, Input  } from "presentation/styles/defaults";

//COMPONENTS
// import Input from "presentation/components/Input";
import ButtonDefault from "presentation/components/ButtonDefault";
import Loading from "presentation/components/Loading";
import { useToast } from "data/hooks/toast";

//ASSETS
import ArrowLeft from "assets/icons/arrow-left.svg";

type ValidateEntry = {
  user_email: string;  
};

const ForgotPassword: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<ValidateEntry>();
  const history = useHistory();
  const [controlLoading, setControlLoading] = useState<string>('no');
  const { addToast } = useToast();
  const [check, setCheck] = useState(false);
  const [disable, setDisable] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const handleCheck = () => {
    setCheck(!check);
  };

  const onSubmit = (data: ValidateEntry) => {
    handleSend();
  }

  const handleSend = () => {
    setControlLoading('yes');
    const payload = {
      employee_email: userEmail,
    }
    api.post(FORGOT_PASSWORD, payload)
    .then((res) =>{
      setControlLoading('no');
      history.push('/emailsent');
    })
    .catch((err) => {
      setControlLoading('no');
      console.log(err);
    })
  }

  return (
    <Container>      
      <Content>
        <Wrapper>
            <Form
                onSubmit={handleSubmit(onSubmit)}
              >
            <Back onClick={() => history.push('/')}>
              <img src={ArrowLeft} alt="Icon Back" />
              <h3>BACK TO LOGIN</h3>  
            </Back>
              <h1>Forgot Password</h1>
              <p>Send a link to your email to reset you password</p>
              <hr/>

            <div>
              <Field>
                  <label>E-mail *</label>
                  <Input
                    type="email"
                    autoComplete="off"
                    {...register("user_email", { required: true })}
                    onChange={(e) => setUserEmail(e.target.value)}
                    name="user_email"
                    maxLength={45}                    
                  />
                  <span style={{opacity :  errors.user_email && errors.user_email.type === 'required' ? 1 : 0 }}>Required field</span>
              </Field>
              <div className="control">
                <ButtonDefault
                  title="Send"
                  disabled={controlLoading === 'yes' ?  true :  false }
                />
               </div>              
              <Loading
                size="small"
                visible={controlLoading}
                space="spaceTop"
              />
            </div>
            
            {disable && <Loader />}
          </Form>
        </Wrapper>
      </Content>
      <Background>
      {/* <h4>ICCT</h4> */}
      </Background>
    </Container>
  );
};

export default ForgotPassword;
