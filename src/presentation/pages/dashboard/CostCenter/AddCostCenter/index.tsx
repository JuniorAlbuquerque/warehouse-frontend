import React, { useState, useCallback, useEffect } from "react";
import { useForm } from 'react-hook-form';
import { useHistory } from "react-router-dom";
import Moment from "moment";

//API
import api from "infra/services/api";
import { ADD_COSTCENTER } from "infra/config/api";

//COMPONENTS
import TitlePage from 'presentation/components/TitlePage';
import NavigatorRegister from 'presentation/components/NavigatorRegister';
import { useToast } from "data/hooks/toast";

//STYLES
import {
  PageHomeContent,
  ContenHome,
  TitleTable,
  HeaderTable,
  ContentTable,
  Back,
  FormAdd
} from "../../defaultStyles";

import  {
  ControlOptions
} from "./styles";
import {
  Field,
  Input,
  SelectOption,
} from "presentation/styles/defaults";

//ASSETS
import ArrowLeft from 'assets/icons/arrow-left.svg';

//INTERFACES
import { InterfaceCostCenter } from "data/protocols/iCostCenter";
import Breadcrumb from "presentation/components/Breadcrumb";
import ButtonDefault from "presentation/components/ButtonDefault";
import ButtonCancel from "presentation/components/ButtonCancel";

type ValidateEntry = {
  name: string,  
};

const AddCostCenter: React.FC = (props: any) => {
  const { addToast } = useToast();
  const history = useHistory();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ValidateEntry>();
  const [controlLoading, setControlLoading] = useState<string>('no');
  const [cost_center_name, setPlantName] = useState('');
  const [datasPlants, setDatasPlants] = useState<InterfaceCostCenter[]>([]);
  const [updateEffect, setUpdateEffect] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [currentID, setCurrentID] = useState(9999);
  

  const onSubmit = (data: ValidateEntry) => {
    reset();
    handleSave();
  }

  const controlModalDelete = () => {
    setModalDelete(!modalDelete);
  }

  const handleSave = () => {
    setControlLoading('yes');
    const payload = {
      cost_center_name
    }
    api.post(ADD_COSTCENTER, payload)
    .then((res) =>{
      setControlLoading('no');
      setUpdateEffect(!updateEffect);
      addToast({
        type: "success",
        title: "Successfully registered!",
        message: `Sucess`,
      });
      history.push('/dashboard/costcenter');
      setPlantName('');
    })
    .catch((err) => {
      setControlLoading('no');
      setPlantName('');
      addToast({
        type: "error",
        title: "Error",
        message: "Error",
      });
    })
  }
  const handleDetails = (index : number) => {
    const payload = {
      id : String(datasPlants[index].cost_center_id),
      name : datasPlants[index].cost_center_name,
    }
    localStorage.setItem("datails-plants", JSON.stringify(payload));
    history.push('/dashboard/plants/details');
  }
  
  return (
    <PageHomeContent
      onSubmit={handleSubmit(onSubmit)}
    >

    <Breadcrumb
      before={["Home", "Cost Center"]}
      current="Add Cost Center"
      back={true}
    />
    
    <TitlePage
      title="Add Cost Center"      
    />
    {props.children}

      <ContenHome>        
        <FormAdd center="yes">
          <div className="two">
            <Field>
              <label>Name *</label>
              <Input
                autoComplete="off"
                placeholder="Name"
                {...register("name", { required: true })}
                onChange={(e) => setPlantName(e.target.value)}
                name="name"
                maxLength={45}
              />
              <span style={{opacity :  errors.name && errors.name.type === 'required' ? 1 : 0 }}>Required field</span>
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
        </FormAdd>
      </ContenHome>
    </PageHomeContent>
  );
};

export default AddCostCenter;