import React, { useState, useCallback, useEffect } from "react";
import { useForm } from 'react-hook-form';
import { useHistory } from "react-router-dom";

//API
import api from "infra/services/api";
import { UPDATE_PLANT } from "infra/config/api";

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
  plant_name : string,	
};

const PlantsDetails: React.FC = () => {
  const { addToast } = useToast();
  const history = useHistory();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ValidateEntry>();
  const [controlLoading, setControlLoading] = useState<string>('no');
  const [updateEffect, setUpdateEffect] = useState(false);
  const details = localStorage.getItem('datails-plants');
  const [datas, setDatas] =  useState({
    plant_name : details ? JSON.parse(details).name : '',
    id : details ? JSON.parse(details).id : '',
  });


  const updateData = (name: string, value: string) => {
    if (name !== null && value !== null) {
        setDatas({ ...datas, [name]: value });
    }
  };

  useEffect(() => {
    if(!localStorage.getItem("datails-plants")){            
      history.push('/dashboard/plants');
    }
}, []);

  const onSubmit = (data: ValidateEntry) => {
    handleSave();
  }

  const handleSave = () => {
    const payload = {
      plant_name : datas.plant_name	
    }
    setControlLoading('yes');    
    api.put(UPDATE_PLANT + datas.id, payload)
    .then((res) =>{
      localStorage.removeItem("datails-plants");
      setControlLoading('no');
      setUpdateEffect(!updateEffect);
      reset();
      addToast({
        type: "success",
        title: "Successful editing!",
        message: `Sucess`,
      });
      history.push('/dashboard/plants');
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
          <div className="center">
            <h2>Plants</h2>
              {/* <div className="tree"> */}
                <Field>
                  <label>Matriculation *</label>
                  <Input
                    autoComplete="off"
                    placeholder="Matriculation"
                    {...register("plant_name", { required: true })}
                    onChange={(e) => updateData(e.target.name, e.target.value)}
                    name="plant_name"
                    value={datas.plant_name}
                    maxLength={10}
                  />
                  <span style={{opacity :  errors.plant_name && errors.plant_name.type === 'required' ? 1 : 0 }}>Required field</span>
                </Field>
              {/* </div> */}
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

export default PlantsDetails;