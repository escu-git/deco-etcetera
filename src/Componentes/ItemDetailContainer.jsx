import React, { useState, useEffect} from 'react';
import styled from 'styled-components';
import ItemDetail from '../Componentes/ItemDetail';


const ItemDetailContainer = (objects) => {
    const[details, setDetails]=useState(objects)


    return (
        <DetailsContainer>
            <ItemDetail/>
        </DetailsContainer>
    )
}

const DetailsContainer = styled.div`
width:100%;
`

export default ItemDetailContainer;
