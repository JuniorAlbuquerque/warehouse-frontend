import React, { useState, useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

//API
import api from "infra/services/api";
import { LIST_CORRIDOR, LIST_WAREHOUSE, ADD_CORRIDOR, LIST_PALLET, ADD_PALLET, LIST_SHELF } from "infra/config/api";

//STYLES
import {
  PageHomeContent,
  ContenHome,
  TitleTable,
  HeaderTable,
  ContentTable,
  Back,
  FormAdd,
} from "../../defaultStyles";

import {
  Field,
  Input,
  SelectOption,
} from "presentation/styles/defaults";

//COMPONENTS
import TitlePage from 'presentation/components/TitlePage';
import NavigatorRegister from 'presentation/components/NavigatorRegister';
import { useToast } from "data/hooks/toast";

//ASSETS
import ArrowLeft from 'assets/icons/arrow-left.svg';

//INTERFACES
import { InterfacePallete } from "data/protocols/IPallete";
import { InterfaceCorridor } from "data/protocols/ICorridor";
import { Interfaceshelf  } from "data/protocols/IShelf";
import Breadcrumb from "presentation/components/Breadcrumb";
import { ControlOptions } from "./styles";
import ButtonCancel from "presentation/components/ButtonCancel";
import ButtonDefault from "presentation/components/ButtonDefault";
import Loading from "presentation/components/Loading";

type ValidateEntry = {
  pallet_name: string,
	shelf_shelf_id: number,
};

const AddPallet: React.FC = (props : any) => {
  const history = useHistory();
  const { addToast } = useToast();
  const [controlLoading, setControlLoading] = useState<string>('no');
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ValidateEntry>();
  const [datasPallete, setDatasPallete] = useState<InterfacePallete[]>([]);
  const [updateEffect, setUpdateEffect] = useState(false);
  const [datasShelf, setDatasShelf] = useState<Interfaceshelf[]>([]);
  const [currentShelf, setCurrentShelf] = useState<number>(0);
  const [modalDelete, setModalDelete] = useState(false);
  const [currentID, setCurrentID] = useState(9999);
  const [datas, setDatas] =  useState({
    pallet_name: '',
	  shelf_shelf_id: 0,
  })

  const updateData = (name: string, value: string) => {    
    if (name !== null && value !== null) {
        setDatas({ ...datas, [name]: value });
    }
  };

  useEffect(() => {
    api    
      .get(LIST_SHELF)
      .then((res) => {
        setDatasShelf(res.data);
      })
      .catch((err) => {
        addToast({
          type: "error",
          title: "Error when bringing the shelfs",
          message: "Error",
        });
      });
  }, []);

  useEffect(() => {
    let aux : number = 0;
    api    
      .get(LIST_PALLET)
      .then((res) => {
        setDatasPallete(res.data);
        aux = parseInt(res.data.length)+1;
        updateData('pallet_name', 'P'+ aux);
      })
      .catch((err) => {
        addToast({
          type: "error",
          title: "Error when bringing the pallets",
          message: "Error",
        });
      });
  }, [updateEffect]);

  const controlModalDelete = () => {
    setModalDelete(!modalDelete);
  }


  const onSubmit = (data: ValidateEntry) => {
    reset();
    handleSave();
  }

  const handleSave = () => {
    setControlLoading('yes');    
    const payload = {      
      pallet_name: datas.pallet_name,
      shelf_shelf_id: datas.shelf_shelf_id,
      shelf_cabinet_cabinet_id: datasShelf[currentShelf].cabinet_id,
      shelf_cabinet_corridor_corridor_id: datasShelf[currentShelf].corridor_id,
      shelf_cabinet_corridor_warehouse_warehouse_id: datasShelf[currentShelf].warehouse_id
    }

    api.post(ADD_PALLET, payload)
    .then((res) =>{
      setControlLoading('no');
      setUpdateEffect(!updateEffect);
      addToast({
        type: "success",
        title: "Successfully registered!",
        message: `Sucess`,
      });
      history.push('/dashboard/pallet');
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

  const [viewCabinet, setViewCabinet] = useState('SELECT SHELF');
  const [viewCorridor, setViewCorridor] = useState('SELECT SHELF');
  const [viewWareHouse, setViewWareHouse] = useState('SELECT SHELF');

  const handleCheckOtherDatas = (position : string) => {
    console.log('position: '+position);
    if(!position) {
      setViewCabinet('SELECT SHELF');
      setViewCorridor('SELECT SHELF');
      setViewWareHouse('SELECT SHELF');
      return;
    }

    
    datasShelf.map((elem, index) => {        
      if(elem.shelf_id == parseInt(position)){
        // alert('cheguei aqui');
        // console.log('shelf_id: '+elem.shelf_id);
        setCurrentShelf(index);
        return;
      }
    })

    setViewCabinet(datasShelf[currentShelf].cabinet_name);
    setViewCorridor(datasShelf[currentShelf].corridor_name);
    setViewWareHouse(datasShelf[currentShelf].warehouse_name);

  }


  const handleDetails = (index : number) => {
    const payload = {
      id : datasPallete[index].pallet_id,
      name : datasPallete[index].pallet_name,
      shelf : datasPallete[index].shelf_id,
    }
    localStorage.setItem("datails-pallet", JSON.stringify(payload));
    history.push('/dashboard/pallet/details');
  }

  return (
    <PageHomeContent
      onSubmit={handleSubmit(onSubmit)}
    >

    <Breadcrumb
      before={["Home", "Pallet"]}
      current="Add Pallet"
      back={true}
    />
    
    <TitlePage
      title="Add Pallet"
    />
    
    {props.children}
      <ContenHome>
        <FormAdd>
          <div className="tree">
            <Field>
              <label>Name *</label>
              <Input
                disabled
                value={datas.pallet_name}
                autoComplete="off"
                placeholder="Name"                
                // {...register("pallet_name", { required: true })}
                onChange={(e) => updateData(e.target.name, e.target.value)}
                name="pallet_name"
                maxLength={10}
              />
              {/* <span style={{opacity :  errors.pallet_name && errors.pallet_name.type === 'required' ? 1 : 0 }}>Required field</span> */}
            </Field>

            <Field>
              <label>Shelf *</label>
              <SelectOption              
                {...register("shelf_shelf_id", { required: true })}
                onChange={(e) => {updateData(e.target.name, e.target.value); handleCheckOtherDatas(e.target.value)}}
                name="shelf_shelf_id"
              >
                <option value=""  >SELECT</option>
                {
                  datasShelf.map((elem, index) => {
                    return(
                      <option value={ elem.shelf_id } key={index} >{ elem.shelf_name }</option>
                    )})
                }
              </SelectOption>
              <span style={{opacity :  errors.shelf_shelf_id && errors.shelf_shelf_id.type === 'required' ? 1 : 0 }}>Required field</span>
            </Field>

            <Field>
              <label>Cabinet *</label>
              <SelectOption disabled>
                <option value="">{viewCabinet}</option>                
              </SelectOption>
              {/* <span style={{opacity :  errors.user && errors.user.type === 'required' ? 1 : 0 }}>Required field</span> */}
            </Field>
          </div>
          <div className="two">
            <Field>
              <label>Corridor *</label>
              <SelectOption disabled>
                <option value="">{viewCorridor}</option>                
              </SelectOption>
              {/* <span style={{opacity :  errors.user && errors.user.type === 'required' ? 1 : 0 }}>Required field</span> */}
            </Field>

            <Field>
              <label>Warehouse *</label>
              <SelectOption disabled>
                <option value="">{ viewWareHouse}</option>                
              </SelectOption>
              {/* <span style={{opacity :  errors.user && errors.user.type === 'required' ? 1 : 0 }}>Required field</span> */}
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
          <Loading
            space="spaceTop"
            size= "small"
            visible={controlLoading}
          />
        </FormAdd>
      </ContenHome>
    </PageHomeContent>
  );
};

export default AddPallet;