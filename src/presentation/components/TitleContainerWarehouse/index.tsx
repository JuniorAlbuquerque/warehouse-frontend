import React, { useEffect } from "react";

//STYLES
import {
  ContainerTilePage,
  ContentTitle,
  TitlePage,
} from './styles';

//COMPONENTS
import ButtonDefault from 'presentation/components/ButtonDefault';


interface TilePageMessage {
  routerBack?: string,
  title: string,
  onAdd?: () => void,    
  titleButton?: string,
  onPress?: () => void,    
  controlLoading? : string,
}

const TilePage: React.FC<TilePageMessage> = ({ routerBack, title, onAdd, titleButton, onPress, controlLoading}) => {
  return (
    <ContainerTilePage>                 
      <ContentTitle>
        <TitlePage>
          {title}
        </TitlePage>
        {
          titleButton &&
          <ButtonDefault 
            onClick={onPress}
            title={titleButton}
            disabled={controlLoading === 'yes' ?  true :  false }
          />
        }
      </ContentTitle>
    </ContainerTilePage>
  );
};

export default TilePage;
