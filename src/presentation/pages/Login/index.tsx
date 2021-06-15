import React, { useState, useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { Link } from "react-router-dom";
import { Form as FormWeb } from "@unform/web";
import { useToast } from "data/hooks/toast"

import {
  Container,
  Background,
  Content,
  Form,
  Footer,
  Wrapper,  
  KeepConected,
  Button,
  NotAccount,
  ForgotPassword,
  Loader,
  ForgotContent,
  ForgotButtons,
  LoaderButton,
} from "./styles";

import { Field, Input  } from "presentation/styles/defaults";

//API
import api from "infra/services/api";
import { USER_LOGIN } from "infra/config/api";

// STORAGE
import { store } from 'data/store';
import { setSession } from 'data/store/reducers';

//COMPONENTS
// import Input from "presentation/components/Input";
import Modal from "presentation/components/Modal";
import ButtonDefault from "presentation/components/ButtonDefault";
import Loading from "presentation/components/Loading";

//ASSETS
//import keyIcon from "../../../assets/key-icon.svg";
import keyIcon from "assets/key-icon.svg";
import Logo from "assets/images/LOGO.png";


interface SignInCredentials {
  email: string;
  password: string;
}

interface IForgot {
  emailRecovery: string;
}

type ValidateEntry = {
  user: string;
  password: string;
};

const Login: React.FC = () => {
  const history = useHistory();
  const { register, handleSubmit, formState: { errors } } = useForm<ValidateEntry>();
  const { addToast } = useToast();  
  const [check, setCheck] = useState(false);
  const [disable, setDisable] = useState(false);
  const [open, setOpen] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const [controlLoading, setControlLoading] = useState<string>('no');
  const [datas, setDatas] =  useState({
    user: '',
    password: '',
  })

  const updateData = (name: string, value: string) => {
    if(name === 'email'){
        value =  value.toLowerCase();
    }
    if (name !== null && value !== null) {
        setDatas({ ...datas, [name]: value });
    }
  };

  const onSubmit = (data: ValidateEntry) => {
    handleLogin();
  };

  const handleCheck = () => {
    setCheck(!check);
  };
  
  const handleLogin = () => {
    // return;
    setControlLoading('yes');
    const payload = {
      user_name: datas.user,
      password: datas.password
    }
    
    setShowLoader(true);
    api.post(USER_LOGIN, payload)
    .then((res) =>{
      setControlLoading('no');
      // console.log('\n\n\n\n\n');
      // console.log(res.data);
      if (res.data) {
        store.dispatch(
            setSession({
                user: {
                    ...res.data,
                }
            })
        )
        history.push('/dashboard/plants');
      }
    })
    .catch((err) => {
      setControlLoading('no');
      addToast({
        type: "error",
        title: "Error",
        message: "Authentication failed",
      });
    })
  }


  const handleLoginJunior = useCallback(     
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
              message: `User ${response.data.results.userName} authenticated`,
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

  

  const handleForgot = useCallback(
    async (data: IForgot, { reset }) => {
      setShowLoader(true);
      console.log(data);

      setTimeout(() => {
        setShowLoader(false);

        addToast({
          type: "success",
          title: "Success",
          message: `E-mail has sent`,
        });

        setTimeout(() => {
          setOpen(false);
          reset();
        }, 500);
      }, 2000);
    },
    [addToast]
  );

  return (
    <Container>      
      <Content>
        <Wrapper>        
          <Form
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1>Welcome Back</h1>
            <p>Fill in the fields below and access your account</p>
            <hr/>

            <input type="email" hidden />
            <input type="password" hidden />
            {/* <FormWeb onSubmit={handleLogin}> */}
              <Field>
                <label>User *</label>
                <Input
                  autoComplete="off"
                  {...register("user", { required: true })}
                  onChange={(e) => updateData(e.target.name, e.target.value)}                  
                  name="user"
                  maxLength={30}
                />
                <span style={{opacity :  errors.user && errors.user.type === 'required' ? 1 : 0 }}>Required field</span>
              </Field>

              <Field>
                <label>Password *</label>
                <Input
                  type="password"
                  {...register("password", { required: true })}
                  autoComplete="off"
                  onChange={(e) => updateData(e.target.name, e.target.value)}
                  name="password"  maxLength={10}
                />
                <span style={{opacity :  errors.password && errors.password.type === 'required' ? 1 : 0 }}>Required field</span>
                

              </Field>
              <ForgotPassword>
                {/* <img src={keyIcon} alt="" /> */}
                {/* <span onClick={() => setOpen(true)}>I forgot my password</span> */}
                <span onClick={() => history.push('forgotpassword') }>I forgot my password</span>                
              </ForgotPassword>

              {/* <KeepConected>
                <input
                  type="checkbox"
                  checked={check}
                  onChange={handleCheck}
                  name=""
                  id="check"
                />
                <label htmlFor="check">Keep conected</label>
              </KeepConected> */}
              {/* <Button disabled={disable}>Sign In</Button>
               */}
                <Loading
                  size="small"
                  visible={controlLoading}
                  space="spaceTop"
                />
               <div className="control">
                <ButtonDefault
                  title="Sign In"
                  disabled={controlLoading === 'yes' ?  true :  false }
                />
               </div>
            {/* </FormWeb> */}

            {/* <NotAccount>
              <p>
                Don't you have an account?
                <Link to="/signup">
                  <span>Sign up</span>
                </Link>
              </p>
            </NotAccount>           */}
            {disable && <Loader />}
          </Form>

          {/* <Footer>
            <span>Develop by @jnr</span>
          </Footer> */}
        </Wrapper>
      </Content>
      <Background>
      {/* <h4>ICCT</h4> */}
      {/* <img src={Logo} alt="Logo ICCT" /> */}
      </Background>

      <Modal open={open} setOpen={setOpen}>
        <ForgotContent>
          <p>Forgot your password?</p>

          <span>Enter your email to receive recovery instructions</span>
          <FormWeb onSubmit={handleForgot}>
            <Field>
              <Input name="emailRecovery" type="email" required />
              <label>E-mail</label>
            </Field>

            <ForgotButtons>
              <Button
                type="button"
                typeBtn="cancel"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button typeBtn="send" type="submit">
                {showLoader ? <LoaderButton /> : "Send"}
              </Button>
            </ForgotButtons>
          </FormWeb>
        </ForgotContent>
      </Modal>      
    </Container>
  );
};

export default Login;