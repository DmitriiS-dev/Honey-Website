import styles from './form.module.css';

import {useState} from 'react';

//Form API:
import { useContext } from 'react';

//import {callMethod} from '../../cart_page/cart'

const initValues = {name: "", email: ""};

const initState = {values: initValues, errors: {}};


function Form({ onFormSubmit }) {

  //Controls the values inside the input fields;
  const [state, setState] = useState(initState);

  const {values, errors} = state

  //updates the email and name
  const handleChange = ({target}) => {
    setState((prev)=> ({...prev, values:{
      ...prev.values,
      [target.name]: target.value,
    }
  }));
  };

  const handleReserve = async () => {
    const validationErrors = {}; // Initialize validation errors

    // Validates fields:
    if (!values.name) {
      validationErrors.name = 'Name is required.';
    }
    // Email validation using regex
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!values.email) {
      validationErrors.email = 'Email is required.';
    } else if (!emailRegex.test(values.email)) {
      validationErrors.email = 'Invalid email format.';
    }

    // If there are validation errors, update the state
    if (Object.keys(validationErrors).length > 0) {
      setState((prev) => ({ ...prev, errors: validationErrors }));
    }   
    else {
      validationErrors.email = '';
      setState((prev) => ({...prev, errors: validationErrors }));

      //validate the email is displayed:
      //setUserEmail(values.email);
      //updateVerification();

      //call the function and pass the data:

      onFormSubmit(values.name, values.email);
    }
  };

  return (<>
    <div className={styles.formContainer}>
      <form className={styles.detailsBox}>
        <div>
          {errors.name && <div className={styles.error}>{errors.name}</div>}
          <label className={styles.labelField}>Name:</label>
          <input className={styles.inputField}
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </div>

        <div>
          <br></br>
          {errors.email && <div className={styles.error}>{errors.email}</div>}
          <label className={styles.labelField}>Email:</label>
          <input className={styles.inputField}
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>
      </form>
    </div>
    <br></br>
    <button className="button_style" onClick={handleReserve}>Reserve Honey</button>
  </>);
}

export default Form;
