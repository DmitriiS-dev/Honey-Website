import Link from 'next/link';
import styles from './navbar.module.css';
import Image from 'next/image';

//hooks:
import {useState, useEffect} from 'react';

//Context API:
import CartContext from '@/pages/cartContext';
import { useContext } from 'react';

function Navbar(){

  //Display the amount:
  const {cartAmount} = useContext(CartContext);

  //use state hook (hamburger):
  const [isOpen, setIsOpen] = useState(false);

  //const [amount, setAmount] = useState(0);

  //use state hook to determine whether the page has just been reloaded
  const [canAnimate, setCanAnimate] = useState(false);

  //handle click:
  const handleClick = () => {
    setIsOpen(!isOpen);
    setCanAnimate(true);
  };

  return (
    <>
    <nav className={styles.navbar}>
      <ul className={styles.navbarMenu}>
        <li className={styles.navbarItem}>
          <Link href="/" >
            Home
          </Link>
        </li>
        <li className={styles.navbarItem}>
          <Link href="/shop_page/shop" as="/Shop">Shop
          </Link>
        </li>
        <li className={styles.navbarItem}>
          <Link href="/about_page/about" as="/About">About
          </Link>
        </li>
        <li className={styles.navbarItem}>
          <Link href="/faq_page/faq" as="/FAQ">
            FAQ
          </Link>
        </li>
      </ul>
    </nav>

    <div className={`${styles.hamburger} ${isOpen ? styles.active : ""}`} onClick={handleClick}>
        <div className={styles.line} style={{ marginTop: '5px' }}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
    </div>

    {canAnimate && (
        <div className={`${styles.menu} ${isOpen ? styles['slide-in'] : styles['slide-out']}`}>
            <ul>
                <li className={styles.navbarItem}><Link href="/" >Home</Link></li>
                <li className={styles.navbarItem}><Link href="/shop_page/shop" as="/Shop">Shop</Link></li>
                <li className={styles.navbarItem}><Link href="/about_page/about" as="/About">About</Link></li>
                <li className={styles.navbarItem}><Link href="/faq_page/faq" as="/FAQ">FAQ</Link></li>
            </ul>
        </div>
      )}
    
    <div className={styles.icon}>
        <Link href="/cart_page/cart" as="/Cart">
            <h3 className={styles.cart_amount}>{cartAmount}</h3>
            <Image src="/icons/scart.png" alt="/shopping cart icon" width={48} height={48} style={{ marginRight: '20px' }}/>
        </Link>
    </div>
  </>);
};

export default Navbar;
