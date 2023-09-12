import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";
import Form from "../components/form/form";

import styles from "./cart.module.css";

//Context API:
import CartContext from "../cartContext";
import TotalContext from "../totalContext";

//Data to pass if the user has successfully verified their email:
import { useSuccessContext } from '../successContext';
import { useContext } from "react";

//Local Storage hook:
import { useLocalStorage } from '../utils/useLocalStorage.js';

import { useEffect, useState } from "react";

//redirect the user to a different page:
import { useRouter } from 'next/router';

import Image from "next/image";
import Link from "next/link";

function CartPage(){

  //email verification:
  const [emailVerificationVisible, setEmailVerificationVisible] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');

  //error message displayed if the code didnt match:
  const [errorMessage, setErrorMessage] = useState(false);

  //confirmation code
  const[confirmCode, setConfirmCode] = useState('')

  //total price of the prodcuts reserved
  const {totalPrice, updatePrice} = useContext(TotalContext);

  //redirect the user to a different page:
  const router = useRouter();

  //success data:
  const { setSuccessData } = useSuccessContext();

  //context API
  const {updateAmount} = useContext(CartContext);

  //Local Storage Hook
  const { viewData, incrementObject, decrementObject, removeObject } = useLocalStorage();

  //mysql products & localstorage data:
  const [products, setProducts] = useState([]);
  const [items, setItems] = useState([]);


  //user details:
  const [userDetails, setUserDetails] = useState([]);

  //async to retrieve the products from the database:
  async function getProducts(){
      const postData = {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
          },
      };
      const res = await fetch("/api/products", postData);

      const response = await res.json();

      setProducts(response.products);
  }

  //useEffect:
  useEffect(() => {
    getProducts();
    setItems(viewData());
  }, []);

  //generates a random number:
  function generateRandomNumber() {
      // Generate a random 6 digit number
      const randomNumber = Math.floor(Math.random() * 900000) + 100000;
      return randomNumber;
  }

  ///handles increment and decrement
  const handleIncrement = (data) => {
    for(let i = 0; i < items.length; i++){
      if(items[i].name == data){
        setItems(incrementObject(data));
        updatePrice();
      }
    }
  };

  const handleDecrement = (data) => {
    for(let i = 0; i < items.length; i++){
      if(items[i].name == data){
        setItems(decrementObject(data));
        updateAmount();
        updatePrice()
      }
    }
  };

  const handleRemove = (data) => {
    for(let i = 0; i < items.length; i++){
      if(items[i].name == data){
        setItems(removeObject(data));
        updateAmount();
        updatePrice();
      }
    }
  };


  //function to update the user's table:
  //function to add a reservation
  async function updateUsers(){
    const details = userDetails[0];
    const postData = {
          method: "POST",
          body: JSON.stringify({action: 'addUser', details}),
          headers: {
              "Content-Type": "application/json",
          },
      };
      const res = await fetch("/api/products", postData);

    const response = await res.json();
  }

  function gatherDetails (){
    let details = [];
    // Loop through products and items
    for (let i = 0; i < products.length; i++) {
        for (let j = 0; j < items.length; j++) {
            if (String(products[i].name) === String(items[j].name)) {
                details.push({
                    email: userDetails[0].email,
                    product_id: products[i].id,
                    quantity: items[j].amount
                });
            }
        }
    }
    return details;
  }


  //function to update the reservations table:
  async function addReservation() {
      let details = gatherDetails();
      
      for(let i = 0; i< details.length; i++){
        let newDetails = details[i]
        try {
          const postData = {
              method: "POST",
              body: JSON.stringify({ action: "addReservation", details: newDetails}),
              headers: {
                  "Content-Type": "application/json",
              },
          };
          // Send POST request to API
          const res = await fetch("/api/products", postData);

          // Check the response status and handle accordingly
          if (res.status === 200) {
              const response = await res.json();
              console.log("Reservation added:", response);
          } else {
              console.error("Error adding reservation:", res.statusText);
          }
        } catch (error) {
            console.error("Error sending request:", error);
        }
      }
  }

  //update the quantity inside the products table:
  async function updateProducts(){
    //generate the array of details
    let details = gatherDetails();

    //email, product id, quantity
    for(let i = 0; i< details.length; i++){
        let newDetails = details[i]
        try {
          const postData = {
              method: "PUT",
              body: JSON.stringify({action: "updateProduct", details: newDetails}),
              headers: {
                  "Content-Type": "application/json",
              },
          };
          // Send POST request to API
          const res = await fetch("/api/products", postData);

          // Check the response status and handle accordingly
          if (res.status === 200) {
              const response = await res.json();
              console.log("Reservation added:", response);
          } else {
              console.error("Error adding reservation:", res.statusText);
          }
        } catch (error) {
            console.error("Error sending request:", error);
        }
      }
  }

  //data to send to the user:
  function gatherData(){
    //DataToSend Obejct: [{name,email,}, [{product_name, quantity, location}, ...], totalPrice ]
    let dataToSend = [];
    //gather the data:
    let details = gatherDetails();

    //name and email pushed
    dataToSend.push({email: userDetails[0].email, name: userDetails[0].name})

    dataToSend.push([])

    //product_name, quantity and location
    for(let i = 0; i < products.length; i++){
      for(let j = 0; j < items.length; j++){
        if(products[i].name === items[j].name){
          dataToSend[1].push({
            product_name: products[i].name,
            quantity: items[j].amount,
            location: products[i].location
          })
        }
      }
    }
    //totalPrice
    dataToSend.push(totalPrice);

    return dataToSend;
  }

  //send an email to myself:
  async function sendEmailToSelf(){
    
    let dataToSend = gatherData();
    try {
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        body: JSON.stringify({action: "Own Email", details: dataToSend}),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Email sent successfully:', responseData);
      } else {
        console.error('Error sending email:', response.statusText);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }

  async function sendConfimationEmail(){
    let dataToSend = gatherData();

    try {
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        body: JSON.stringify({action: "Confirmation", details: dataToSend}),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const responseData = await response.json();
      } else {
        console.error('Error sending email:', response.statusText);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }

  }

  //email verified they have confirmed the order
  const handleVerifyEmail = () => {
    if(confirmCode == verificationCode){
      setErrorMessage(false);

      //send a confirmation email
      sendConfimationEmail()
      
      //send an email to myself so that I can contact this user
      sendEmailToSelf()

      /////////////////////
      /////Database:///////
      ////////////////////
      //update the database:
      try{
        //  add to reservations
        addReservation();
        //  update the quantity inside the products
        updateProducts();
        //  add a user
        updateUsers();
      }catch(error){
      }
      //update the database inside localstorage:
      //  clear it
      for(let i = 0; i < items.length; i++){
        items[i].name
        removeObject(items[i].name);
      }
      setItems([])

      // Pass the array as a query parameter named 'myArray'
      router.push('/success_page/success');
      console.log()
      setSuccessData(gatherData());

      //clear all other parameters -> useState parameters
      updateAmount();
      updatePrice();
      setConfirmCode('');
      setEmailVerificationVisible(false);

    }
    else{
      setErrorMessage(true);
    }
  };

  //function I want to be called after the form is submitted
  const handleSendingEmail = async (name,email) => {
    setEmailVerificationVisible(true);

    let number = generateRandomNumber();
    setVerificationCode(number);
    const data = {
      name: name.trim(),
      email: email.trim(),
      verificationCode: number
    };

    setUserDetails([data]);

    try {
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        body: JSON.stringify({action: "Validation Code", details: data}),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Email sent successfully:', responseData);
      } else {
        console.error('Error sending email:', response.statusText);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (<>
    <Navbar></Navbar>
    <br></br>
    <h1>My Cart</h1>
    <br></br>
    {items.length > 0 ? (<>
      <div className={styles.component_container}>
        <div className={styles.table_container}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => {
                for (let i = 0; i < items.length; i++) {
                  if (String(product.name) === String(items[i].name)) {
                    return (
                      <tr key={index}>
                        <td>
                          <div className={styles.horz_alignment}>
                            <div className={styles.product_image_container}>
                              <Image src={product.image} alt="honey" width={150} height={125} objectFit="cover" />
                            </div>
                            <h3>{product.name}</h3>
                          </div>
                        </td>
                        <td>
                          <button onClick={() => handleDecrement(items[i].name)} className={styles.selector_btn} style={{marginRight:'5px'}}>-</button>
                          {items[i].amount}
                          <button onClick={() => handleIncrement(items[i].name)} className={styles.selector_btn} style={{marginLeft:'5px'}}>+</button>
                          <div><button className={styles.remove_btn} onClick={() => handleRemove(items[i].name)}>Remove</button></div>
                        </td>
                        <td>£{(items[i].amount) * (items[i].price)}</td>
                      </tr>
                    );
                  }
                }
              })}
              <tr>
                <td></td>
                <td></td>
                <td>£{totalPrice}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <br></br>
    <div className={styles.reserve_component}>
      <h2>How to reserve our honey</h2>
      <br></br>
      <h3>You will recieve a confirmation email within within the next 10min</h3>
      <br></br>
      <h4>After your email is verified the beekeeper will contact you regarding your reservation where he will attempt to find the optimal time for you to collect the honey</h4>
      <br></br>
      {emailVerificationVisible && (
        <div className={styles.overlay}>
          <div className={styles.popup}>
            <button className={styles.close} onClick={() => setEmailVerificationVisible(false)}>
              <div className={`${styles.line} ${styles.line1}`}></div>
              <div className={`${styles.line} ${styles.line2}`}></div>
            </button>
            <h3 style={{fontWeight:'550'}}>Verify Your Email</h3>
            <br></br>
            <p className={styles.p_form_tag}>We have sent a verification code to your email address</p>
            <p className={styles.p_form_tag}>Please check your inbox and enter the code below</p>
            <br></br>
            <p className={styles.p_form_tag}>6-digits code*</p>
            { errorMessage &&(<h4 style={{color:'red'}}>Error, Incorrect Code</h4>)}
            <input className={styles.input_form_tag}
              type="text"
              value={confirmCode}
              onChange={(e) => {
                const inputText = e.target.value;
                if (inputText === '' || (inputText.length <= 6 && /^\d+$/.test(inputText))) {
                  setConfirmCode(inputText);
                }
              }}
              placeholder="Enter 6-digit code">
            </input>
            <br></br>
            <br></br>
            <button className="button_style" onClick={handleVerifyEmail}>Verify Email</button>
          </div>
        </div>
      )}
      <Form onFormSubmit={handleSendingEmail}></Form>
    </div>
    </>
    ):(
    <div className={styles.centerAlignment}>
      <br></br>
      <Image src="/icons/bcart.png" alt="Shopping cart" width={125} height={125}/>
      <br></br>
      <h3 style={{textAlign:"center", color:"#F6AE2D"}}>Your Cart is Empty</h3>
      <br></br>
      <Link href="/shop_page/shop" as="/Shop"><button className="button_style">View Products</button></Link>
    </div>
    )}
  </>
  )
};

export default CartPage;