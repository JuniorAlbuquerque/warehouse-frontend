import React, { useState, useCallback, useEffect } from "react";
import { useForm } from 'react-hook-form';
import { useHistory } from "react-router-dom";

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

//API
import api from "infra/services/api";
import { LIST_FUNCTION, CHECK_EMAIL, LIST_PLANT, LIST_DEPARTMENT, LIST_USER, ADD_EMPLOYEE } from "infra/config/api";
// STORAGE
import { store } from 'data/store';

//COMPONENTS
import ModalMessage from "presentation/components/ModalMessage";
import Loading from "presentation/components/Loading";
import ButtonCancel from "presentation/components/ButtonCancel";
import ButtonDefault from "presentation/components/ButtonDefault";
import Breadcrumb from 'presentation/components/Breadcrumb';
import TitlePage from 'presentation/components/TitlePage';
import { useToast } from "data/hooks/toast";
//ASSETS

//STYLES
import {
  PageHomeContent,
  ContenHome,
  FormAdd, 
} from "../../defaultStyles";

import {
  Field,
  Input,
  SelectOption,
} from "presentation/styles/defaults";

import {
  ControlOptions
} from './styles';

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

const AddUser : React.FC = () => {
  const { addToast } = useToast();
  const history = useHistory();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ValidateEntry>();
  const [controlLoading, setControlLoading] = useState<string>('no');
  const [datasUsers, setDatasUsers] = useState<InterfaceUser[]>([]);
  const [datasPlants, setDatasPlants] = useState<InterfacePlants[]>([]);
  const [datasDepartments, setDatasDepartments] = useState<InterfaceDepartment[]>([]);
  const [datasFunctions, setDatasFunctions] = useState<InterfaceFunction[]>([]);  
  const [updateEffect, setUpdateEffect] = useState(false);
  const [currentID, setCurrentID] = useState(9999);
  const currentUserSession =  store.getState().session.user.user_id;
  const [controlModal, setControlModal] = useState(false);
  const [titleMessage, setTitleMessage] = useState('Teste');
  const [descriptionMessage, setDescriptionMessage] = useState('Minha mensagem aqui');
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

  const controlModalMessage = () => {
    setControlModal(!controlModal);
  }

 

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
      history.push('/dashboard/users');
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
    <ModalMessage

      title={titleMessage}
      description={descriptionMessage}
      isOpen={controlModal}
      onClose={() => controlModalMessage()}
      // updateData={ () => setUpdateEffect(!updateEffect)}
    />      
      <Breadcrumb
        before={["Home", "Users"]}
        current="Add Users"
        back={true}
      />
      <TitlePage
        title="Add Users"
        controlLoading={controlLoading}
      />

      <ContenHome>
        {/* <button onClick={}>click me </button> */}
        <FormAdd>
          <div className="title-current-aba">
          </div>
          <div className="tree">
            <Field>
              <label>Registration *</label>
              <Input
                autoComplete="off"
                placeholder="Registration"
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
                  datasPlants.map((elem, index) =>
                      <option value={elem.plant_id} key={index}>{elem.plant_name}</option>
                  )
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
                  datasDepartments.map((elem, index) => {
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
                  datasFunctions.map((elem, index) =>
                      <option value={elem.function_id} key={index}>{elem.function_name}</option>
                    )
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
          
          <ControlOptions>
            <ButtonCancel
              onClick={() => history.goBack()}
              title="CANCEL"
              disabled={controlLoading === 'yes' ?  true :  false }
            />
            
            <ButtonDefault
              title="REGISTER"
              disabled={controlLoading === 'yes' ?  true :  false }
            />
          </ControlOptions>
          <div>
          <Loading  
            space="spaceTop"
            size= "small"
            visible={controlLoading}
          />
          </div>
        </FormAdd>
      </ContenHome>
    </PageHomeContent>


  );
};

export default AddUser;