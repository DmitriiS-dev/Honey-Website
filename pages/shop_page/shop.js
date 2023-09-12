import Navbar from "../components/navbar/navbar"
import styles from './shop.module.css'

import Link from 'next/link';
import Image from 'next/image';

function ShopPage(){

    return( <>
    <Navbar></Navbar>
    <br></br>
    <h1 className={styles.h1}>Shop Page</h1>
    <br></br>
    <br></br>
    <div className={styles.container}>
        <article className={styles.item}>
            <Link href={`/product_page/product?id=${1}`} as="/Product">
            <Image src="/images/test23.png" alt="petts wood" width={500} height={500} layout="responsive" objectFit="contain"/>
            <div className={styles.info}>
                <div className={styles.head}>
                    <h5>Petts Wood Honey</h5>
                    <span>£8.00</span>
                </div>
                <p>About the honey</p>
            </div>
            </Link>
        </article>
        <article className={styles.item}>
            <Link href={`/product_page/product?id=${2}`} as="/Product">
            <Image src="/images/test25.png" alt="halstead" width={500} height={500} layout="responsive" objectFit="contain"/>
            <div className={styles.info}>
                <div className={styles.head}>
                    <h5>Halstead Honey</h5>
                    <span>£8.00</span>
                </div>
                <p>About the honey</p>
            </div>
            </Link>
        </article>
    </div>
    <br></br><br></br><br></br>
    </>)
}

export default ShopPage;