import React from 'react';
//navbar:
import Navbar from '../components/navbar/navbar';
//css
import styles from './success.module.css';

import { useRouter } from 'next/router';


//Data to pass if the user has successfully verified their email:
import { useSuccessContext } from '../successContext';

function SuccessPage() {

    const router = useRouter();

    //retrieve the order details:
    const { successData } = useSuccessContext();
    let userDetails = successData;
    let userDetailsProduct = userDetails[1];

    let productsHtml = [];
    for (let i = 0; i < userDetailsProduct.length; i++) {
        productsHtml.push(
            <div key={i}>
                <h3>Product Name: {userDetailsProduct[i].product_name}</h3>
                <h3>Quantity: {userDetailsProduct[i].quantity}</h3>
                <h3>Pickup Location: {userDetailsProduct[i].location}</h3>
                <br />
            </div>
        );
    }

    // Function to handle redirect and clearSuccessData
    const handleBackToShop = () => {
        router.push('/');
    };

    return (
        <>
            <Navbar/>
            <div className={styles.successContainer}>
                <h1 className={styles.successHeader}>Success!</h1>
                <p className={styles.successMessage}>Your Reservation Was Successful. Thank You!</p>
                <p className={styles.successMessage}>Please Check your email inbox</p>
                <div className={styles.orderSummary}>
                    <h3 className={styles.productName}>Customer Name: {userDetails[0].name}</h3>
                    {productsHtml}
                    <h3 className={styles.quantity}>Total Price: £{userDetails[2]}</h3>
                </div>
                <button className={styles.backToShopButton} onClick={handleBackToShop}>Back to Shop</button>
            </div>
        </>
    );
}

export default SuccessPage;
