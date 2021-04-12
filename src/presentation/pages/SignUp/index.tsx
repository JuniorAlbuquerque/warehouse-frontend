import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import api from "../../../infra/services/api";

import Input from "../../components/Input";
import { Form as FormWeb } from "@unform/web";

import {
  Container,
  Background,
  Wrapper,
  Header,
  Form,
  Tabs,
  Tab,
  Field,
  Button,
} from "./styles";

import { FiChevronDown as IconArrow } from "../../styles/Icons";

import bgWaves from "../../../assets/footer-waves.svg";

import { useToast } from "../../../data/hooks/toast";
import Select from "../../components/Select";

const SignUp: React.FC = () => {
  const { addToast } = useToast();

  const history = useHistory();
  const [activeTab, setActiveTab] = useState(0);
  const [plants, setPlants] = useState([] as any);
  const [deps, setDeps] = useState([] as any);
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [dataCreate, setDataCreate] = useState({
    employeeName: "",
    employeeId: "",
    functionEmployee: "1",
    plantEmployee: "1",
    departmentEmployee: "1",
    ramal: "",
    sector: "",
    userName: "",
    password: "",
  });
  const [plantId, setPlantId] = useState(1);
  const [depId, setDepId] = useState(1);

  const tabs = [
    { id: 0, tab: "Supervisor", component: "" },
    { id: 1, tab: "Funcionário", component: "" },
  ];

  const handleBack = () => {
    history.push("/");
  };

  const getPlantsAndDeps = async () => {
    const response = await api.get("/plant/list");
    const responseDeps = await api.get("/department/list");

    setPlants(response.data);
    setDeps(responseDeps.data);

    setPlantId(response.data[0].id);
    setDepId(responseDeps.data[0].id);
  };

  const handleCreate = async (data: any) => {
    if (step !== 2) {
      setStep(step + 1);
    }

    if (step === 2) {
      if (activeTab === 0) {
        setDataCreate({ ...dataCreate, functionEmployee: "1" });
      } else {
        setDataCreate({ ...dataCreate, functionEmployee: "2" });
      }

      try {
        await api.post("/user/register", dataCreate);

        handleBack();

        addToast({
          type: "success",
          title: "Success",
          message: `User created`,
        });
      } catch (error) {
        setStep(0);

        addToast({
          type: "error",
          title: "Error",
          message: "Error",
        });
      }
    }
  };

  useEffect(() => {
    getPlantsAndDeps();
  }, []);

  return (
    <Container>
      <Wrapper>
        <Header>
          <h4 onClick={handleBack}>ICCT</h4>
        </Header>

        <Form>
          <h2>Sign Up</h2>
          <Tabs>
            {tabs.map((item) => (
              <Tab
                key={item.id}
                active={item.id === activeTab}
                onClick={() => setActiveTab(item.id)}
              >
                <span>{item.tab}</span>
              </Tab>
            ))}
          </Tabs>

          <FormWeb onSubmit={handleCreate}>
            {(step === 0 || step === 2) && (
              <Field>
                <Input
                  name="name"
                  value={dataCreate.employeeName}
                  required
                  onChange={(e) =>
                    setDataCreate({
                      ...dataCreate,
                      employeeName: e.target.value,
                    })
                  }
                />
                <label htmlFor="">Name</label>
              </Field>
            )}

            {step === 0 && (
              <Field>
                <Input
                  name="employeeId"
                  value={dataCreate.employeeId}
                  onChange={(e) =>
                    setDataCreate({
                      ...dataCreate,
                      employeeId: e.target.value,
                    })
                  }
                />
                <label htmlFor="">Registration</label>
              </Field>
            )}

            {(step === 0 || step === 1) && (
              <>
                <Field>
                  <Select
                    name="plantEmployee"
                    value={dataCreate.plantEmployee}
                    required
                    onChange={(e) =>
                      setDataCreate({
                        ...dataCreate,
                        plantEmployee: e.target.value,
                      })
                    }
                  >
                    {plants.map((item: any) => (
                      <option key={item.id} value={item.id}>
                        {item.plantName}
                      </option>
                    ))}
                  </Select>

                  <IconArrow size={20} />

                  <label htmlFor="">Plant</label>
                </Field>

                <Field>
                  <Select
                    name="departmentEmployee"
                    value={dataCreate.departmentEmployee}
                    required
                    onChange={(e) =>
                      setDataCreate({
                        ...dataCreate,
                        departmentEmployee: e.target.value,
                      })
                    }
                  >
                    {deps.map((item: any) => (
                      <option key={item.id} value={item.id}>
                        {item.departmentName}
                      </option>
                    ))}
                  </Select>

                  <IconArrow size={20} />

                  <label htmlFor="">Department</label>
                </Field>
              </>
            )}

            {step === 1 && (
              <>
                <Field>
                  <Input
                    name="ramal"
                    value={dataCreate.ramal}
                    onChange={(e) =>
                      setDataCreate({
                        ...dataCreate,
                        ramal: e.target.value,
                      })
                    }
                  />
                  <label htmlFor="">Ramal</label>
                </Field>

                <Field>
                  <Input
                    name="sector"
                    value={dataCreate.sector}
                    onChange={(e) =>
                      setDataCreate({
                        ...dataCreate,
                        sector: e.target.value,
                      })
                    }
                  />
                  <label htmlFor="">Sector</label>
                </Field>
              </>
            )}

            {step === 2 && (
              <>
                <Field>
                  <Input
                    name="userName"
                    required
                    value={dataCreate.userName}
                    onChange={(e) =>
                      setDataCreate({
                        ...dataCreate,
                        userName: e.target.value,
                      })
                    }
                  />
                  <label htmlFor="">User</label>
                </Field>

                <Field>
                  <Input
                    name="password"
                    type="password"
                    required
                    value={dataCreate.password}
                    onChange={(e) =>
                      setDataCreate({
                        ...dataCreate,
                        password: e.target.value,
                      })
                    }
                  />
                  <label htmlFor="">Password</label>
                </Field>
              </>
            )}

            {step !== 2 ? <Button>Continue</Button> : <Button>Sign Up</Button>}
            <p>
              Already a member? <span onClick={handleBack}>Log in</span>
            </p>
          </FormWeb>
        </Form>
      </Wrapper>

      <Background>
        <img src={bgWaves} alt="" />
      </Background>
    </Container>
  );
};

export default SignUp;
