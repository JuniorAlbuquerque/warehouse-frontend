import React, { useState, useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

//API
import api from "infra/services/api";
import { LIST_CORRIDOR, LIST_WAREHOUSE, ADD_CORRIDOR, LIST_PALLET, ADD_PALLET, LIST_SHELF, LIST_BOX, ADD_BOX } from "infra/config/api";

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
import { InterfaceBox } from "data/protocols/IBox";
import { Interfaceshelf  } from "data/protocols/IShelf";
import Breadcrumb from "presentation/components/Breadcrumb";
import { ControlOptions } from "./styles";
import ButtonCancel from "presentation/components/ButtonCancel";
import ButtonDefault from "presentation/components/ButtonDefault";
import Loading from "presentation/components/Loading";


type ValidateEntry = {
  box_name: string,
	shelf_shelf_id: number,
};
  
const AddBox: React.FC = (props: any) => {
  const history = useHistory();
  const { addToast } = useToast();
  const [controlLoading, setControlLoading] = useState<string>('no');
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ValidateEntry>();
  const [datasPallete, setDatasPallete] = useState<InterfacePallete[]>([]);
  const [datasBox, setDatasBox] = useState<InterfaceBox[]>([]);
  const [updateEffect, setUpdateEffect] = useState(false);
  const [currentShelf, setCurrentShelf] = useState<number>(0);
  const [datasShelf, setDatasShelf] = useState<Interfaceshelf[]>([]);
  const [modalDelete, setModalDelete] = useState(false);
  const [currentID, setCurrentID] = useState(9999);
  const [datas, setDatas] =  useState({
    box_name: '',
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
      .get(LIST_BOX)
      .then((res) => {
        setDatasBox(res.data);
        aux = parseInt(res.data.length)+1;
        updateData('box_name', 'B'+ aux);
      })
      .catch((err) => {
        addToast({
          type: "error",
          title: "Error when bringing the boxs",
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
      box_name: datas.box_name,
      shelf_shelf_id: datas.shelf_shelf_id,
      shelf_cabinet_cabinet_id: datasShelf[currentShelf].cabinet_id,
      shelf_cabinet_corridor_corridor_id: datasShelf[currentShelf].corridor_id,
      shelf_cabinet_corridor_warehouse_warehouse_id: datasShelf[currentShelf].warehouse_id
    }
    api.post(ADD_BOX, payload)
    .then((res) =>{
      setControlLoading('no');
      setUpdateEffect(!updateEffect);
      addToast({
        type: "success",
        title: "Successfully registered!",
        message: `Sucess`,
      });
      history.push('/dashboard/box');                    
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
    if(!position) {
      setViewCabinet('SELECT SHELF');
      setViewCorridor('SELECT SHELF');
      setViewWareHouse('SELECT SHELF');
      return;
    }

    datasShelf.map((elem, index) => {        
      if(elem.shelf_id == parseInt(position)){
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
      id : datasBox[index].box_id,
      name : datasBox[index].box_name,
      shelf : datasBox[index].shelf_id,
    }
    localStorage.setItem("datails-box", JSON.stringify(payload));
    history.push('/dashboard/box/details');
  }

  return (
    <PageHomeContent
      onSubmit={handleSubmit(onSubmit)}
    >
      
    <Breadcrumb
      before={["Home", "Box"]}
      current="Add Box"
      back={true}
    />
      
    <TitlePage
      title="Add Box"
    />

    {props.children}

      <ContenHome>
        <FormAdd>
          <div className="tree">
            <Field>
              <label>Name *</label>
              <Input
                disabled
                value={datas.box_name}
                autoComplete="off"
                placeholder="Name"                
                // {...register("box_name", { required: true })}
                onChange={(e) => updateData(e.target.name, e.target.value)}
                name="box_name"
                maxLength={10}
              />
              {/* <span style={{opacity :  errors.box_name && errors.box_name.type === 'required' ? 1 : 0 }}>Required field</span> */}
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

export default AddBox;