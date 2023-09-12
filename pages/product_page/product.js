import Navbar from "../components/navbar/navbar"
import styles from './product.module.css'

//Local Storage hook:
import { useLocalStorage } from '../utils/useLocalStorage.js';

import Image from 'next/image';
import Link from 'next/link';

import {useRouter} from 'next/router';

//Context API:
import CartContext from "../cartContext";
import TotalContext from "../totalContext";
import { useContext } from "react";

//hooks:
import {useState, useEffect, useRef} from "react";

function ProductPage(){

    //context:
    const {updatePrice} = useContext(TotalContext);
    const {updateAmount} = useContext(CartContext);


    //local storage api:
    const { addObject } = useLocalStorage();

    //global product:
    let item = [];

    //Updating Products
    const [products, setProducts] = useState([]);

    //Retrieves the current product's ID
    const router = useRouter();
    const {id} = router.query;


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

        setProducts(response.products)
    }

    //retrieves the data from the database
    useEffect(() => {
        getProducts();
    }, [])


    //Quantity increment/decrement:
    const [count, setCount] = useState(1);

    const increment = () => {
        if (count < 10 && count < item.quantity) {
            setCount(prevCount => prevCount + 1);
        }
    };

    const decrement = () => {
        if (count > 1) {
            setCount(prevCount => prevCount - 1);
        }
    };


    //Handles Add to cart Button Click
    const handleCartClick = (event) =>{
        if(item.quantity < count){
            event.preventDefault();
        }
        else{
            //add the selected item to the cart page:
            addObject({'name':item.name,'amount':count, 'price':item.price})
            updateAmount();
            updatePrice();
        }
    }


    return (
    <>
        <Navbar></Navbar>
        <br></br>
        {products.map((product, index) => {
            if (product.id == id) {
                item = product;
                return (
                    <div className={styles.container} key={product.id}>
                        <div className={styles.img_container}>
                            <Image className={styles.picture} src={product.image} width={500} height={350} alt="image alt"></Image>
                        </div>
                        <div>
                            <div className={styles.text_container}>
                                <h2>{product.name} Jar, 1lb/454g</h2>
                                <h3 className={styles.column_location}></h3>
                                <h3>Collection Postcode:</h3>
                                <h4 className={styles.column_location}>{product.location}</h4>
                                <h3>Price:</h3>
                                <h4 className={styles.column_location}>£{product.price}</h4>
                                <h3>Available Stock:</h3>
                                <h4 className={styles.column_location}>{product.quantity}</h4>
                                <h3>Quantity:</h3>
                                <div className={styles.quantity_btn}>
                                    <button onClick={decrement} className={styles.selector_btn}>-</button>
                                    <h4 style={{ padding: '10px' }}>{count}</h4>
                                    <button onClick={increment} className={styles.selector_btn}>+</button>
                                </div>
                            </div>
                            <div className={styles.center}><Link href={`/cart_page/cart`} as="/Cart">
                                <button className="button_style" onClick={handleCartClick}>Add to Cart</button>
                            </Link></div>
                        </div>
                    </div>
                );
            }
        })}
        <br></br>
    </>
    );


}

export default ProductPage;