import { createContext, useState, useEffect } from "react";

//Local Storage hook:
import { useLocalStorage } from './utils/useLocalStorage.js';

const TotalContext = createContext();


export function TotalProvider({children}){

    //Local Storage Hook
    const { viewData } = useLocalStorage();

    //Total Price:
    const [totalPrice, setTotalPrice] = useState(0);

    //total price
    const updatePrice = () => {
        let total = 0;
        const items = viewData();
        for(let i = 0; i < items.length; i++){
            total = total+parseFloat(items[i].price)*parseInt(items[i].amount)
        }
        setTotalPrice(total);
    }

    useEffect(()=>{
        updatePrice();
    }, [])


    return(
        <TotalContext.Provider value={{totalPrice, updatePrice}}>
            {children}
        </TotalContext.Provider>
    )
}


export default TotalContext;