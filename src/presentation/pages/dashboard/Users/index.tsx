import React, { useState, useCallback, useEffect } from "react";
import { useForm } from 'react-hook-form';
import { useHistory } from "react-router-dom";

//API
import api from "infra/services/api";
import { LIST_FUNCTION, CHECK_EMAIL, LIST_PLANT, LIST_DEPARTMENT, LIST_USER, ADD_EMPLOYEE } from "infra/config/api";
// STORAGE
import { store } from 'data/store';

//COMPONENTS
import TitlePage from 'presentation/components/TitlePage';
import { useToast } from "data/hooks/toast";
import ModalDelete from "./ModalDelete";

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
} from "../defaultStyles";

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

const Users: React.FC = () => {
  const { addToast } = useToast();
  const history = useHistory();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ValidateEntry>();
  const [controlLoading, setControlLoading] = useState<string>('no');
  const [datasUsers, setDatasUsers] = useState<InterfaceUser[]>([]);
  const [datasPlants, setDatasPlants] = useState<InterfacePlants[]>([]);
  const [datasDepartments, setDatasDepartments] = useState<InterfaceDepartment[]>([]);
  const [datasFunctions, setDatasFunctions] = useState<InterfaceFunction[]>([]);  
  const [updateEffect, setUpdateEffect] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [currentID, setCurrentID] = useState(9999);
  const currentUserSession =  store.getState().session.user.user_id;
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

  const controlModalDelete = () => {
    setModalDelete(!modalDelete);
  }

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
    style={{marginTop: 24}}
      onSubmit={handleSubmit(onSubmit)}
    >
    <ModalDelete
      id={String(currentID)}
      isOpen={modalDelete}
      onClose={() => controlModalDelete()}
      updateData={ () => setUpdateEffect(!updateEffect)}
    />
      {/* <Back>
        <img src={ArrowLeft} alt="Icon To BAck" />
        <span>BACK</span>
      </Back> */}

      <ContenHome>       
        <TitlePage
          title="USERS"
          titleButton="REGISTER"
          controlLoading={controlLoading}
        />
        <TitleTable>          
          <h1>USERS</h1>
        </TitleTable>
        <FormAdd>
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

        <TitleTable style={{marginTop: 20}} >
          <h1>REGISTERED</h1>
        </TitleTable>

        <HeaderTable>        
          <li style={{width: '20%'}}>Name</li>
          <li style={{width: '20%'}}>Plant</li>
          <li style={{width: '20%'}}>Profile</li>
          <li style={{width: '20%'}}>Department</li>
          <li style={{width: '20%'}}>Options</li>
        </HeaderTable>

        {
          datasUsers.map((elem, index) => {
           return(
            <ContentTable>
              <li style={{width: '20%'}}>{ elem.user_name }</li>
              <li style={{width: '20%'}}>{ elem.plant_name }</li>
              <li style={{width: '20%'}}>{ elem.profile_name }</li>
              <li style={{width: '20%'}}>{ elem.department_name }</li>
              <li style={{width: '20%'}} className="options">
                  <div className="option">
                    <svg width="14" height="3" viewBox="0 0 14 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.99992 2.16667C7.36811 2.16667 7.66659 1.86819 7.66659 1.5C7.66659 1.13181 7.36811 0.833336 6.99992 0.833336C6.63173 0.833336 6.33325 1.13181 6.33325 1.5C6.33325 1.86819 6.63173 2.16667 6.99992 2.16667Z" stroke="#5F5C6B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M11.6667 2.16667C12.0349 2.16667 12.3333 1.86819 12.3333 1.5C12.3333 1.13181 12.0349 0.833336 11.6667 0.833336C11.2985 0.833336 11 1.13181 11 1.5C11 1.86819 11.2985 2.16667 11.6667 2.16667Z" stroke="#5F5C6B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M2.33341 2.16667C2.7016 2.16667 3.00008 1.86819 3.00008 1.5C3.00008 1.13181 2.7016 0.833336 2.33341 0.833336C1.96522 0.833336 1.66675 1.13181 1.66675 1.5C1.66675 1.86819 1.96522 2.16667 2.33341 2.16667Z" stroke="#5F5C6B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span>Details</span>
                  </div>
                  {
                    elem.user_id !== currentUserSession &&
                  <div className="option" onClick={() => {setCurrentID(elem.user_id); controlModalDelete()}}>
                    <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 3.5H2.33333H13" stroke="#5F5C6B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M4.33325 3.5V2.16667C4.33325 1.81305 4.47373 1.47391 4.72378 1.22386C4.97383 0.973812 5.31296 0.833336 5.66659 0.833336H8.33325C8.68687 0.833336 9.02601 0.973812 9.27606 1.22386C9.52611 1.47391 9.66659 1.81305 9.66659 2.16667V3.5M11.6666 3.5V12.8333C11.6666 13.187 11.5261 13.5261 11.2761 13.7761C11.026 14.0262 10.6869 14.1667 10.3333 14.1667H3.66659C3.31296 14.1667 2.97382 14.0262 2.72378 13.7761C2.47373 13.5261 2.33325 13.187 2.33325 12.8333V3.5H11.6666Z" stroke="#5F5C6B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M5.66675 6.83334V10.8333" stroke="#5F5C6B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M8.33325 6.83334V10.8333" stroke="#5F5C6B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span>Delete</span>
                  </div>
                  }
              </li>
            </ContentTable>        
           ) 
          })
        }

      </ContenHome>
    </PageHomeContent>


  );
};

export default Users;