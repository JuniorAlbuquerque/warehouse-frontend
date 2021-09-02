import React from 'react';

// STORAGE
import { store } from 'data/store';



const Presentation : React.FC = () => {
    const datas: any = store.getState().session.user;
    return (
        <div>
            <h1>Dashboard</h1>

            <h4>Em aprovação</h4>
        </div>
    )
}


export default Presentation;