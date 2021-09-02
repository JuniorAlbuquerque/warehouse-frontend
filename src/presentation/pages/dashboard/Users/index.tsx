import React, { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import { useHistory } from "react-router-dom";

//API
import api from "infra/services/api";
import { LIST_USER} from "infra/config/api";
// STORAGE
import { store } from 'data/store';

//COMPONENTS
import Breadcrumb from 'presentation/components/Breadcrumb';
import TitlePage from 'presentation/components/TitlePage';
import { useToast } from "data/hooks/toast";
import ModalDelete from "./ModalDelete";

//ASSETS

//STYLES
import {
  PageHomeContent,
  ContenHome,
  FormRegistered,
  HeaderTable,
  ContentTable,
} from "../defaultStyles";

//INTERFACES
import { InterfaceUser } from "data/protocols/IUser";

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

const Users = () => {
  const { addToast } = useToast();
  const history = useHistory();
  const [datasUsers, setDatasUsers] = useState<InterfaceUser[]>([]);
  const [updateEffect, setUpdateEffect] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [currentID, setCurrentID] = useState<string>();
  const currentUserSession =  store.getState().session.user.user_id;

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



  return (
    <PageHomeContent
      style={{marginTop: 24}}
    >
    <ModalDelete
      id={String(currentID)}
      isOpen={modalDelete}
      onClose={() => controlModalDelete()}
      updateData={ () => setUpdateEffect(!updateEffect)}
    />

    <Breadcrumb
      before={["Home"]}
      current="Users"
      back={false}
    />

    <TitlePage
      title="Users"
      titleButton="REGISTER"
      controlLoading={'no'}
      onPress={() => history.push('/dashboard/users/add')}
    />

    <ContenHome>
      <FormRegistered>
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
            <ContentTable key={index}>
              <li style={{width: '20%'}}>{ elem.user_name }</li>
              <li style={{width: '20%'}}>{ elem.plant_name }</li>
              <li style={{width: '20%'}}>{ elem.profile_name }</li>
              <li style={{width: '20%'}}>{ elem.department_name }</li>
              <li style={{width: '20%'}} className="options">
                <div className="option">
                  <svg width="14" height="3" viewBox="0 0 14 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.99992 2.16667C7.36811 2.16667 7.66659 1.86819 7.66659 1.5C7.66659 1.13181 7.36811 0.833336 6.99992 0.833336C6.63173 0.833336 6.33325 1.13181 6.33325 1.5C6.33325 1.86819 6.63173 2.16667 6.99992 2.16667Z" stroke="#5F5C6B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M11.6667 2.16667C12.0349 2.16667 12.3333 1.86819 12.3333 1.5C12.3333 1.13181 12.0349 0.833336 11.6667 0.833336C11.2985 0.833336 11 1.13181 11 1.5C11 1.86819 11.2985 2.16667 11.6667 2.16667Z" stroke="#5F5C6B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2.33341 2.16667C2.7016 2.16667 3.00008 1.86819 3.00008 1.5C3.00008 1.13181 2.7016 0.833336 2.33341 0.833336C1.96522 0.833336 1.66675 1.13181 1.66675 1.5C1.66675 1.86819 1.96522 2.16667 2.33341 2.16667Z" stroke="#5F5C6B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Details</span>
                </div>
                {
                elem.user_id !== currentUserSession &&
                  <div className="option" onClick={() => {setCurrentID(elem.employee_registration); controlModalDelete()}}>
                    <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 3.5H2.33333H13" stroke="#5F5C6B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M4.33325 3.5V2.16667C4.33325 1.81305 4.47373 1.47391 4.72378 1.22386C4.97383 0.973812 5.31296 0.833336 5.66659 0.833336H8.33325C8.68687 0.833336 9.02601 0.973812 9.27606 1.22386C9.52611 1.47391 9.66659 1.81305 9.66659 2.16667V3.5M11.6666 3.5V12.8333C11.6666 13.187 11.5261 13.5261 11.2761 13.7761C11.026 14.0262 10.6869 14.1667 10.3333 14.1667H3.66659C3.31296 14.1667 2.97382 14.0262 2.72378 13.7761C2.47373 13.5261 2.33325 13.187 2.33325 12.8333V3.5H11.6666Z" stroke="#5F5C6B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M5.66675 6.83334V10.8333" stroke="#5F5C6B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8.33325 6.83334V10.8333" stroke="#5F5C6B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>Delete</span>
                  </div>
                }
              </li>
            </ContentTable>        
            ) 
          })
        }

      </FormRegistered>

    </ContenHome>
  </PageHomeContent>
 );
};

export default Users;