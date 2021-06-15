import React from 'react';

//STYLES
import { ContainerLoading } from './styles';

//INTERFACE

interface Load {
    size: 'large' | 'medium' | 'small' | 'extra-small' | 'min',
    visible: 'yes' | 'no' | string,
    space?: 'spaceTop' | 'spaceBottom',
}


export default function Loading({size, visible, space} : Load) {
    return (
        <ContainerLoading>
            <div className={'spinner ' + size + ' ' + visible + ' ' + space}></div>
        </ContainerLoading>
    );
}