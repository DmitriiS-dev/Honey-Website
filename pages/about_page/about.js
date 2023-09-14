import Navbar from "../components/navbar/navbar";

import styles from "./about.module.css";

import Image from 'next/image';

//Context API:


function AboutPage(){
  return (
    <>
      <Navbar></Navbar>
      <h1>About</h1>
      <div className={styles.container}>
        <div className={styles.section}>
          <Image className={styles.img} src="/images/close_up_honeycomb.jpg" alt="Close up honeycomb" width='300' height='300'/>
          <div className={styles.text}>
            <h4 className={styles.label}>Local Product</h4>
            <p className={styles.description}>Produced in Kent, our honey captures the distinct flavours of this region's flora. It's enriched with the natural sugars found in local nectar sources, providing a genuine taste of our surroundings</p> 
          </div> 
        </div>
        <div className={styles.section}>
          <div className={styles.text}>
            <h4 className={styles.label}>Honey Pureness</h4>
            <p className={styles.description}>Our Raw Honey is unheated and unpasteurised, retaining all of the nutritional properties and benefits of honey. Our products are high in antioxidants and antibacterial qualities</p>
          </div>
          <Image className={styles.img} src="/images/honeycomb.jpg" alt="Zoomed in honeycomb" width='300' height='300'/>
        </div>
        <div className={styles.section}>
          <Image className={styles.img} src="/images/top_honeycomb.jpg" alt="Top view honeycomb" width='300' height='300'/>
          <div className={styles.text}>
            <h4 className={styles.label}>Hayfeaver Relief</h4>
            <p className={styles.description}>Our locally-produced Honey is celebrated for its remarkable ability to inhibit hayfever symptoms in our local area, making it a favorite choice for those seeking natural relief</p> 
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
