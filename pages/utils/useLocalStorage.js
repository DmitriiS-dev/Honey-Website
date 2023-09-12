import { useEffect } from 'react';

export function useLocalStorage() {
  const productDataKey = 'productData';

  useEffect(() => {
    // Initialization logic
    const storedProductData = localStorage.getItem(productDataKey);
    if (!storedProductData) {
      const initialProductData = [];
      localStorage.setItem(productDataKey, JSON.stringify(initialProductData));
    }
  }, []);

  const addObject = (data) => {
    const storedProductData = viewData();
    for (let i = 0; i < storedProductData.length; i++) {
        const item = storedProductData[i];
        // Perform additional operations on the item
        if(item.name === data.name){
            alert("You already have this item in your cart");
            return false;
        }
    }
    storedProductData.push(data);
    localStorage.setItem(productDataKey, JSON.stringify(storedProductData));
    return true;
  };

  const incrementObject = (data) => {
    const storedProductData = viewData();
    const indexToUpdate = storedProductData.findIndex((obj => obj.name == data));

    let currentAmount = storedProductData[indexToUpdate].amount;
    if(currentAmount < 10){
      storedProductData[indexToUpdate].amount +=1;
      localStorage.setItem(productDataKey, JSON.stringify(storedProductData));
    }
    return viewData();
  }

  const decrementObject = (data) => {
    const storedProductData = viewData();
    const indexToUpdate = storedProductData.findIndex((obj => obj.name == data));

    let currentAmount = storedProductData[indexToUpdate].amount;
    if(currentAmount < 2){
      storedProductData.splice(indexToUpdate, 1);
      console.log("New Array: "+storedProductData)
      localStorage.setItem(productDataKey, JSON.stringify(storedProductData));
    }
    else{
      storedProductData[indexToUpdate].amount -=1;
      localStorage.setItem(productDataKey, JSON.stringify(storedProductData));
    }
    
    
    return viewData();
  }

  const viewData = () => {
    const storedProductData = JSON.parse(localStorage.getItem(productDataKey));
    return storedProductData;
  };

  const removeObject = (data) => {
    const storedProductData = viewData();
    const indexToUpdate = storedProductData.findIndex((obj => obj.name == data));
    storedProductData.splice(indexToUpdate, 1);
    localStorage.setItem(productDataKey, JSON.stringify(storedProductData));
    return viewData();
  };

  const cartAmount = () => {
    const storedProductData = viewData();
    return storedProductData.length;
  }

  return { addObject, viewData, incrementObject, decrementObject, removeObject, cartAmount};
}

