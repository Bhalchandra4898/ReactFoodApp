import React, { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim().length === 0;
const isFiveChars = (value) => value.trim().length >= 5;

const Checkout = (props) => {
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();
  const [formValidity, setFormValidity] = useState({
    nameIsValid: true,
    streetIsValid: true,
    postalIsValid: true,
    cityIsValid: true,
  });

  const formSubmitHandler = (event) => {
    event.preventDefault();

    const nameInput = nameInputRef.current.value;
    const streetInput = streetInputRef.current.value;
    const postalInput = postalInputRef.current.value;
    const cityInput = cityInputRef.current.value;

    const nameInputIsValid = !isEmpty(nameInput);
    const streetInputIsValid = !isEmpty(streetInput);
    const cityInputIsValid = !isEmpty(cityInput);
    const postalInputIsValid = isFiveChars(postalInput);

    setFormValidity({
      nameIsValid: nameInputIsValid,
      streetIsValid: streetInputIsValid,
      postalIsValid: postalInputIsValid,
      cityIsValid: cityInputIsValid,
    });

    if (
      !nameInputIsValid ||
      !streetInputIsValid ||
      !postalInputIsValid ||
      !cityInputIsValid
    ) {
      return;
    }

    props.onCheckout({
      name: nameInput,
      street: streetInput,
      postalode: postalInput,
      city: cityInput,
    });
  };

  const nameClasses = `${classes.control} ${
    !formValidity.nameIsValid ? classes.invalid : ""
  }`;
  const streetClasses = `${classes.control} ${
    !formValidity.streetIsValid ? classes.invalid : ""
  }`;
  const postalClasses = `${classes.control} ${
    !formValidity.postalIsValid ? classes.invalid : ""
  }`;
  const cityClasses = `${classes.control} ${
    !formValidity.cityIsValid ? classes.invalid : ""
  }`;

  return (
    <form className={classes.form} onSubmit={formSubmitHandler}>
      <div className={nameClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formValidity.nameIsValid && <p>Enter a valid name</p>}
      </div>
      <div className={streetClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formValidity.streetIsValid && <p>Enter a valid street</p>}
      </div>
      <div className={postalClasses}>
        <label htmlFor="pincode">Postal code</label>
        <input type="text" id="pincode" ref={postalInputRef} />
        {!formValidity.postalIsValid && (
          <p>Enter a valid postal code (minimum 5 characters)</p>
        )}
      </div>
      <div className={cityClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formValidity.cityIsValid && <p>Enter a valid city</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
