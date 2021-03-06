import {useState, createContext, useContext, useEffect} from 'react';
export const CartContext = createContext();
export const useCart =()=> useContext(CartContext);
const INITIAL_STATE={addedItems:[], totalPrice: 0, totalQuantity:0};
const localStorageCart = JSON.parse(localStorage.getItem('userCart')) || INITIAL_STATE;

const totalSum = (cart, item) =>{
    return cart.addedItems.reduce(function (a,b){
        return a + (b.price * b.quantity)},0) + item.price * item.quantity;   
}

const substractTotalSum = (cart, item) =>{
    return cart.addedItems.reduce(function (a,b){
        return a + (b.price * b.quantity)},0) - item.price * item.quantity;   
}

const sumQuantity= (cart, item) =>{
    return cart.addedItems.reduce(function (a,b){
        return a + b.quantity},0) + item.quantity;   
}

const substractQuantity= (cart, item) =>{
    return cart.addedItems.reduce(function (a,b){
        return a + b.quantity},0) - item.quantity;   
}

export const CartProvider = ({children}) =>{
    const [cart, setCart]=useState(localStorageCart)

    useEffect(()=>{
        localStorage.setItem('userCart', JSON.stringify(cart));
    },[cart])

    //Cart functions:   

    const addItem = (item)=>{
        const itemInCart = cart.addedItems.find((cartProduct)=> cartProduct.id === item.id);
        const sum = totalSum(cart, item)
        const q = sumQuantity(cart, item)
        if(itemInCart){
            itemInCart.quantity += item.quantity
            setCart({...cart, totalPrice:sum, totalQuantity:q})
        }else{
            setCart({...cart, addedItems:[...cart.addedItems, item], totalPrice:sum, totalQuantity:q})
        }
    }

    const removeItem = (detail)=>{
        const idToRemove = cart.addedItems.find((cartProduct)=> cartProduct.id === detail.id);
        console.log(`idToRemove: ${idToRemove}`)
        if(idToRemove){
            const newCart = cart.addedItems.filter(function(x){return x.id !==idToRemove.id});
            const sum = substractTotalSum(cart, idToRemove)
            const q = substractQuantity(cart, idToRemove)
            console.log({...cart, addedItems:newCart, totalPrice:sum, totalQuantity:q})
            setCart({...cart, addedItems:newCart, totalPrice:sum, totalQuantity:q});

        }else{
            alert(`Item ${detail.title} is not in your cart`)
        }
    };

    const clearCart = ()=>{
        setCart(INITIAL_STATE)
        console.log('Cart correctly cleared!')
    };
    return <CartContext.Provider value={{cart, addItem, removeItem, clearCart,totalSum, sumQuantity, substractQuantity}}>{children}</CartContext.Provider> 
}