import { createContext, useState, useEffect } from "react";

//Local Storage hook:
import { useLocalStorage } from './utils/useLocalStorage.js';

const CartContext = createContext();


export function CartProvider({children}){

    //Local Storage Hook
    const { viewData } = useLocalStorage();

    //Cart's amount: 
    const [cartAmount, setCartAmount] = useState(0);

    //navbar count updated
    const updateAmount = () => {
        setCartAmount((prev) => (viewData().length));
    }

     useEffect(() => {
        setCartAmount(viewData().length)
    }, []);


    return(
        <CartContext.Provider value={{cartAmount, updateAmount}}>
            {children}
        </CartContext.Provider>
    )
}


export default CartContext;