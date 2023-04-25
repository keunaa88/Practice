import React, { forwardRef } from 'react';
import styles from "./Input.module.css";

const Input = forwardRef((props, ref) => {

    return (
        <div className={styles.field}>
            { props.labelText && <label htmlFor={props.labelText}>{props.labelText}</label> }
            <input
                type={props.type} 
                value={props.value}
                name={props.name}
                placeholder={props.placeholder}
                onChange={props.onChange} 
                ref={ref}/>
            { props.errorMessage && <span className={styles.error}>{props.errorMessage}</span> }
        </div>
    );

});

export default Input;
