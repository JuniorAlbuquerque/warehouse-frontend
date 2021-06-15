import React, { useState, useCallback, useEffect } from "react";
import { useForm } from 'react-hook-form';
import { useHistory } from "react-router-dom";

//API
import api from "infra/services/api";
import { LIST_FUNCTION, CHECK_EMAIL, LIST_PLANT, LIST_DEPARTMENT, LIST_USER, ADD_EMPLOYEE } from "infra/config/api";

//COMPONENTS
import TitlePage from 'presentation/components/TitlePage';
import { useToast } from "data/hooks/toast";

//ASSETS
import ArrowLeft from 'assets/icons/arrow-left.svg';

//STYLES
import {
  PageHomeContent,
  ContenHome,
  TitleTable,
  HeaderTable,
  ContentTable,
  Back,
  FormAdd,
  NavInfo,
  NavFooter,
} from "../../defaultStylesDetails";

import {
  Field,
  Input,
  SelectOption,
} from "presentation/styles/defaults";

//INTERFACES
import { InterfaceUser } from "data/protocols/IUser";
import { InterfacePlants } from "data/protocols/IPlants";
import { InterfaceDepartment } from "data/protocols/IDepartment";
import { InterfaceFunction } from "data/protocols/IFunction";
import ButtonDefault from "presentation/components/ButtonDefault";

type ValidateEntry = {
  registration : string,
	employee_name : string,
	user_name : string,
	password : string,
	employee_email: string,
	function_function_id: number,
	department_department_id: number,
	profile_profile_id : number,
	plant_plant_id : number
};

const UsersDetails: React.FC = () => {
  const { addToast } = useToast();
  const history = useHistory();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ValidateEntry>();
  const [controlLoading, setControlLoading] = useState<string>('no');
  const [datasUsers, setDatasUsers] = useState<InterfaceUser[]>([]);
  const [datasPlants, setDatasPlants] = useState<InterfacePlants[]>([]);
  const [datasDepartments, setDatasDepartments] = useState<InterfaceDepartment[]>([]);
  const [datasFunctions, setDatasFunctions] = useState<InterfaceFunction[]>([]);  
  const [updateEffect, setUpdateEffect] = useState(false);
  const [datas, setDatas] =  useState({
    registration : '',
    employee_name : '',
    user_name : '',
    password : '',
    employee_email: '',
    function_function_id: 0,
    department_department_id: 0,
    profile_profile_id : 0,
    plant_plant_id : 0
  });


  const updateData = (name: string, value: string) => {
    if (name !== null && value !== null) {
        setDatas({ ...datas, [name]: value });
    }
  };

  useEffect(() => {
    //GET PLANTS
      api
        .get(LIST_PLANT)

        .then((res) => {
          setDatasPlants(res.data);
        })
        .catch((err) => {
          addToast({
            type: "error",
            title: "Error when bringing the plants",
            message: "Error",
          });
        });

      //GET DEPARTMENTS
      api
      .get(LIST_DEPARTMENT)

      .then((res) => {
        setDatasDepartments(res.data);
      })
      .catch((err) => {
        addToast({
          type: "error",
          title: "Error when bringing the departments",
          message: "Error",
        });
      });

      //GET FUNCTIONS
      api
      .get(LIST_FUNCTION)

      .then((res) => {
        setDatasFunctions(res.data);
      })
      .catch((err) => {
        addToast({
          type: "error",
          title: "Error when bringing the functions",
          message: "Error",
        });
      });

      
        
  }, []);

  useEffect(() => {
    api
      .get(LIST_USER)
      .then((res) => {
        setDatasUsers(res.data);
      })
      .catch((err) => {
        addToast({
          type: "error",
          title: "Error when bringing the users",
          message: "Error",
        });
      });
  }, [updateEffect]);

  const onSubmit = (data: ValidateEntry) => {
    const payload = {
      employee_email : datas.employee_email
    }
    setControlLoading('yes');
    api.post(CHECK_EMAIL, payload)
    .then((res) =>{
      setControlLoading('no');      
      handleSave();
    })
    .catch((err) => {
      setControlLoading('no');      
      addToast({
        type: "error",
        title: err.response.data.message,
        message: "E-mail already registered.",
      });
    })
  }

  const handleSave = () => {
    setControlLoading('yes');    
    api.post(ADD_EMPLOYEE, datas)
    .then((res) =>{
      setControlLoading('no');
      setUpdateEffect(!updateEffect);
      reset();
      addToast({
        type: "success",
        title: "Successfully registered!",
        message: `Sucess`,
      });
    })
    .catch((err) => {
      setControlLoading('no');      
      addToast({
        type: "error",
        title: err.response.data.message,
        message: "Error",
      });
    })
  }

  return (
    <PageHomeContent
      onSubmit={handleSubmit(onSubmit)}
    >
      <NavInfo>
        <h1
        onClick={() => {
          history.goBack();
        }}
        >X</h1>
        <span>Details</span>
      </NavInfo>
      <ContenHome>       
        <FormAdd>
        <h2>Users</h2>
          <div className="tree">
            <Field>
              <label>Matriculation *</label>
              <Input
                autoComplete="off"
                placeholder="Matriculation"
                {...register("registration", { required: true })}
                onChange={(e) => updateData(e.target.name, e.target.value)}
                name="registration"
                maxLength={10}
              />
              <span style={{opacity :  errors.registration && errors.registration.type === 'required' ? 1 : 0 }}>Required field</span>
            </Field>

            <Field>
              <label>Name *</label>
              <Input
                autoComplete="off"
                placeholder="Name"
                {...register("employee_name", { required: true })}
                onChange={(e) => updateData(e.target.name, e.target.value)}
                name="employee_name"
                maxLength={45}
              />
              <span style={{opacity :  errors.employee_name && errors.employee_name.type === 'required' ? 1 : 0 }}>Required field</span>
            </Field>

            <Field>
              <label>E-mail *</label>
              <Input
                type="email"
                autoComplete="off"
                placeholder="e-mail"
                {...register("employee_email", { required: true })}
                onChange={(e) => updateData(e.target.name, e.target.value)}
                name="employee_email"
                maxLength={45}
              />
              <span style={{opacity :  errors.employee_email && errors.employee_email.type === 'required' ? 1 : 0 }}>Required field</span>
            </Field>
          </div>

          <div className="tree">
            <Field>
              <label>Plant *</label>
              <SelectOption
                {...register("plant_plant_id", { required: true })}
                onChange={(e) => updateData(e.target.name, e.target.value)}
                name="plant_plant_id"
              >
                <option value="">SELECT</option>
                {
                  datasPlants.map((elem, index) =>{
                    return (
                      <option value={elem.plant_id} key={index}>{elem.plant_name}</option>
                    )})
                }
              </SelectOption>
              <span style={{opacity :  errors.plant_plant_id && errors.plant_plant_id.type === 'required' ? 1 : 0 }}>Required field</span>
            </Field>

            <Field>
              <label>Department *</label>
              <SelectOption
                {...register("department_department_id", { required: true })}
                onChange={(e) => updateData(e.target.name, e.target.value)}
                name="department_department_id"
              >
                <option value="">SELECT</option>
                {
                  datasDepartments.map((elem, index) =>{
                    return (
                      <option value={elem.department_id} key={index}>{elem.department_name}</option>
                    )})
                }
              </SelectOption>
              <span style={{opacity :  errors.department_department_id && errors.department_department_id.type === 'required' ? 1 : 0 }}>Required field</span>
            </Field>

            <Field>
              <label>Profile *</label>
              <SelectOption
                {...register("profile_profile_id", { required: true })}
                onChange={(e) => updateData(e.target.name, e.target.value)}
                name="profile_profile_id"
              >
                <option value="">SELECT</option>
                <option value={1}>ADMINISTRATOR</option>
                <option value={2}>EMPLOYEE</option>
              </SelectOption>
              <span style={{opacity :  errors.profile_profile_id && errors.profile_profile_id.type === 'required' ? 1 : 0 }}>Required field</span>
            </Field>
          </div>

          <div className="two">
            <Field>
              <label>Function *</label>
              <SelectOption
                {...register("function_function_id", { required: true })}
                onChange={(e) => updateData(e.target.name, e.target.value)}
                name="function_function_id"
              >
                <option value="">SELECT</option>                
                {
                  datasFunctions.map((elem, index) =>{
                    return (
                      <option value={elem.function_id} key={index}>{elem.function_name}</option>
                    )})
                }
              </SelectOption>
              <span style={{opacity :  errors.function_function_id && errors.function_function_id.type === 'required' ? 1 : 0 }}>Required field</span>
            </Field>

            <Field>
              <label>User *</label>
              <Input
                autoComplete="off"
                placeholder="User"
                {...register("user_name", { required: true })}
                onChange={(e) => updateData(e.target.name, e.target.value)}
                name="user_name"
                maxLength={30}
              />
              <span style={{opacity :  errors.user_name && errors.user_name.type === 'required' ? 1 : 0 }}>Required field</span>
            </Field>
          </div>
        </FormAdd>
      </ContenHome>
      <NavFooter>
        <ButtonDefault title="Save"
        />
      </NavFooter>
    </PageHomeContent>


  );
};

export default UsersDetails;