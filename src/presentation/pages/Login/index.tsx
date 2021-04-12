import React, { useState, useCallback } from "react";

import Input from "../../components/Input";
import { Link } from "react-router-dom";
import { Form as FormWeb } from "@unform/web";
import api from "../../../infra/services/api";

import {
  Container,
  Background,
  Content,
  Form,
  Footer,
  Wrapper,
  Field,
  KeepConected,
  Button,
  NotAccount,
  ForgotPassword,
  Loader,
} from "./styles";

import keyIcon from "../../../assets/key-icon.svg";

import { useToast } from "../../../data/hooks/toast";

interface SignInCredentials {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { addToast } = useToast();

  const [check, setCheck] = useState(false);
  const [disable, setDisable] = useState(false);

  const handleCheck = () => {
    setCheck(!check);
  };

  const handleLogin = useCallback(
    async (data: SignInCredentials) => {
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

  return (
    <Container>
      <Content>
        <Wrapper>
          <h4>ICCT</h4>

          <Form>
            <h1>Welcome Back</h1>

            <p>Fill in the fields below and access your account</p>

            <FormWeb onSubmit={handleLogin}>
              <Field>
                <Input required name="userName" />
                <label>User</label>
              </Field>

              <Field>
                <Input type="password" required name="password" />
                <label>Password</label>
              </Field>

              <KeepConected>
                <input
                  type="checkbox"
                  checked={check}
                  onChange={handleCheck}
                  name=""
                  id="check"
                />
                <label htmlFor="check">Keep conected</label>
              </KeepConected>

              <Button disabled={disable}>Sign In</Button>
            </FormWeb>

            <NotAccount>
              <p>
                Don't you have an account?
                <Link to="/signup">
                  <span>Sign up</span>
                </Link>
              </p>
            </NotAccount>

            <ForgotPassword>
              <img src={keyIcon} alt="" />
              <span>I forgot my password</span>
            </ForgotPassword>

            {disable && <Loader />}
          </Form>

          <Footer>
            <span>Develop by @jnr</span>
          </Footer>
        </Wrapper>
      </Content>
      <Background></Background>
    </Container>
  );
};

export default Login;
