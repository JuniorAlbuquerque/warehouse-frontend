import React from 'react';

//STYLES
import {
    ContainerTopAndSide,
    Top,
    Side
} from './styles';

function TopAndSideStructure(props: any) {
    return(

        <ContainerTopAndSide>
           <Top>
               <div className="logo">
                   <h1>ICCT</h1>
               </div>
            </Top>
            
           <Side>
               <div>opção</div>
               <div>opção</div>
               <div>opção</div>
               <div>opção</div>
               <div>opção</div>

           </Side>
        </ContainerTopAndSide>
        
    )
}

export default TopAndSideStructure;