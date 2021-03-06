import React from 'react';
import Item from './Item';
import styled from 'styled-components';
import Custom  from './CustomItem/Custom';
import firebase from 'firebase';
import CustomizedItem from './CustomItem/CustomizedItem';
import Login from '../Authentication/Login';
const ItemList = ({products, custom}) => {
    const user = firebase.auth().currentUser;
    return (
        <ProductContainer>
            {custom?
                <>
                    {user?<>
                    {products?.map((product)=>{
                        return(<CustomizedItem key={product.id} item={product}/>)
                    })}
                    {products && <Custom/>}
                </>:
                    <Login/>}
                </>
                :
                <>
                    {products?.map((product)=>{
                        return(<Item key={product.id} item={product}></Item>)
                    })}
                    {products && <Custom/>}
                </>}
            
        </ProductContainer>
    )
}

const ProductContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  align-items: center;
`
export default ItemList;