import Footer from './components/footer/footer'
import Header from './components/header/header'
import Navbar from './components/navbar/navbar'
import styles from '@/styles/Home.module.css'
import Image from 'next/image';

//image swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {Autoplay} from 'swiper';
import 'swiper/css';

export default function Home() {

  SwiperCore.use([Autoplay]);
  return (
    <>
      {/* <Header></Header> */}
      <><Navbar></Navbar></>
      <br></br>
      <h1 style={{ fontSize: '50px' }} >Local Honey (Petts Wood & Halstead)</h1>
      <div style={{ display: 'flex', justifyContent: 'center'}}>
        <div className={styles.imageSlider}>
          {/* <Image src="/images/2products.png" alt="honey image 2" width='600' height='400'/> */}
          <Swiper
            slidesPerView={1}
            autoplay={{
              delay: 5000
            }}
            onSwiper={(swiper) => console.log(swiper)}>
            <SwiperSlide><div className={styles.imageStyle}><Image layout='fill' objectFit='cover' src="/images/DSC_0040.png"  alt="honey image 1" /></div></SwiperSlide>
            <SwiperSlide><div className={styles.imageStyle}><Image layout='fill' objectFit='cover'src="/images/DSC_0027.jpg" alt="honey image 2" /></div></SwiperSlide>
            <SwiperSlide><div className={styles.imageStyle}><Image layout='fill' objectFit='cover' src="/images/DSC_0030.jpg"  alt="honey image 3" /></div></SwiperSlide>
          </Swiper>
        </div>
      </div>

      <div>
        <p className={styles.parag}>Our honey is an organic, pure, and unheated natural sugar product. It is raw honey, which means it is obtained directly from the beehives without undergoing any heating or filtration processes. Produced by a local beekeeper, our honey is a testament to the craftsmanship and care put into its creation. Sourced from the surrounding landscapes, each jar of our honey encapsulates the unique flavors of the local flora, offering you a truly authentic and delightful experience.</p>
      </div>
      <div className={styles.caseStudy}>
        <h2>How it works</h2>
        <br></br>
        <div className={styles.steps}>
          <div className={styles.step}>
            <Image className={styles.img} src="/images/select.png" alt="select" width='140' height='110'/>
            <h3>Step 1</h3>
            <br></br>
            <h4 className={styles.step_h4}>Select the Product and Quantity</h4>
            <br></br>
            <p>Select the product and quantity that you wish to purchase</p>
          </div>
          <div className={styles.step}>
            <Image className={styles.img} src="/images/reserve.png" alt="reserve" width='110' height='110'/>
            <h3>Step 2</h3>
            <br></br>
            <h4 className={styles.step_h4}>Reserve and Confirm via Email</h4>
            <br></br>
            <p>After you select the product and quantity you will be sent a confirmation email</p>
          </div>
          <div className={styles.step}>
            <Image className={styles.img} src="/images/collect.png" alt="collect" width='110' height='110'/>
            <h3>Step 3</h3>
            <br></br>
            <h4 className={styles.step_h4}>Collect the Honey and Enjoy</h4>
            <br></br>
            <p>After email confirmation you can travel and collect your honey</p>
          </div>
        </div>
      </div>
      

      <Footer></Footer>
    </>
  )
}
