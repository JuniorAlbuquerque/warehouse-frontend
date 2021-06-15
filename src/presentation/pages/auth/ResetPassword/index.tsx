import React, { useState, useCallback, useEffect } from "react";
import { useForm } from 'react-hook-form';

import { useParams } from "react-router-dom";
import { useHistory } from 'react-router-dom';

//API
import api from "infra/services/api";
import { VALIDATE_TOKE, RESET_PASSWORD } from "infra/config/api";


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
import { useToast } from "data/hooks/toast";
import ButtonDefault from "presentation/components/ButtonDefault";
import Loading from "presentation/components/Loading";

//ASSETS
import ArrowLeft from "assets/icons/arrow-left.svg";

interface SignInCredentials {
  email: string;
  password: string;
}

interface ParamType {
  token : string
}

type ValidateEntry = {
  password: string,
  confirm_password: string,
};

interface IForgot {
  emailRecovery: string;
}

const ResetPassword: React.FC = () => {
  const { addToast } = useToast();
  const history = useHistory();
  const { register, handleSubmit, formState: { errors } } = useForm<ValidateEntry>();
  const { token } = useParams<ParamType>();
  const [check, setCheck] = useState(false);
  const [disable, setDisable] = useState(false);
  const [open, setOpen] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [controlLoading, setControlLoading] = useState<string>('no');
  const [id, setId] = useState <number>();
  const [datas, setDatas] =  useState({    
    password: '',
    confirm_password: ''
  })

  const updateData = (name: string, value: string) => {    
    if (name !== null && value !== null) {
        setDatas({ ...datas, [name]: value });
    }
  };

  const onSubmit = (data: ValidateEntry) => {
    handleCheckPassword();
    };

    const handleChangePassword = () => {        
      setControlLoading('yes');
        const payload = {
          password: datas.password,
          token: token,
        }
        api
        .put(RESET_PASSWORD+id, payload)
        .then((res) => {
          setControlLoading('no');
            console.log(res.data);
            addToast({
              type: "success",
              title: "Password changed successfully",
              message: `Sucess`,
            });
            history.push('/');
        })
        .catch((err) => {
          setControlLoading('no');
            addToast({
              type: "error",
              title: "Error",
              message: "Error",
            });
        })
    }


  const handleLogin = useCallback(
    async (data: SignInCredentials, { reset }) => {
      setDisable(true);
      try {
        const response = await api.post("/user/login", data);
        setTimeout(() => {
          setDisable(false);

          setTimeout(() => {
            addToast({
              type: "success",
              title: "Success",
              message: `User ${response.data.results[0].userName} authenticated`,
            });
          }, 300);
        }, 500);
      } catch (error) {
        setDisable(false);

        addToast({
          type: "error",
          title: "Error",
          message: "Authentication failed",
        });
      }
    },
    [addToast]
  );

  const handleCheckPassword = () => {
    if (datas.password === datas.confirm_password){
      handleChangePassword();
    }else{
      addToast({
        type: "error",
        title: "Error",
        message: "Passwords do not match",
      }); 
    }
  }

  useEffect(() => {
    let payload = {
        token
    }
    api
        .post(VALIDATE_TOKE, payload)

        .then((res) => {
            console.log(res.data);
            setId(res.data.user_id);
            // updatePayload('token', token);
        })
        .catch((err) => {
            history.push('/errorpage');
        });
}, []);

  return (
    <Container>
      <Background>
      <h4>ICCT</h4>
      </Background>
      <Content>
        <Wrapper>        
          <Form
              onSubmit={handleSubmit(onSubmit)}
            >
            <Back onClick={() => history.push('/')}>
              <img src={ArrowLeft} alt="Icon Back" />
              <h3>BACK TO LOGIN</h3>  
            </Back>
              <h1>Reset Password</h1>
              <p>Send a link to your email to reset you password</p>
              <hr/>

              <Field>
                  <label>New Password *</label>
                  <Input
                    type="password"
                    autoComplete="off"
                    {...register("password", { required: true })}
                    onChange={(e) => updateData(e.target.name, e.target.value)}
                    name="password"
                    maxLength={45}                    
                  />
                  <span style={{opacity :  errors.password && errors.password.type === 'required' ? 1 : 0 }}>Required field</span>
              </Field>

              <Field>
                  <label>Confirm Password *</label>
                  <Input
                    type="password"
                    autoComplete="off"
                    {...register("confirm_password", { required: true })}
                    onChange={(e) => updateData(e.target.name, e.target.value)}
                    name="confirm_password"
                    maxLength={45}                    
                  />
                  <span style={{opacity :  errors.confirm_password && errors.confirm_password.type === 'required' ? 1 : 0 }}>Required field</span>
              </Field>
              <div className="control">
                <ButtonDefault
                  title="Save New Password"
                  disabled={controlLoading === 'yes' ?  true :  false }
                />
               </div>              
              <Loading
                size="small"
                visible={controlLoading}
                space="spaceTop"
              />
          </Form>
        </Wrapper>
      </Content>
    </Container>
  );
};

export default ResetPassword;
