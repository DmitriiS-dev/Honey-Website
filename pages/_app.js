import '@/styles/globals.css'

import dotenv from 'dotenv';
dotenv.config();

//Providers:
import { CartProvider } from './cartContext'
import { TotalProvider } from './totalContext';
import { SuccessProvider} from './successContext';
export default function App({ Component, pageProps }) {
  return <SuccessProvider><CartProvider><TotalProvider><Component {...pageProps} /></TotalProvider></CartProvider></SuccessProvider>
  
}
