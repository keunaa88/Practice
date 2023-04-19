import React from 'react';
import Dropbox from '../components/Dropbox';
import styles from "./Input.module.css";

function Input({labelText, type, value, placeholder, onChange}) {

    return (
        
        <div className={styles.field}>
            <label htmlFor={labelText}>{labelText}</label>
            { type == 'select' ? 
                <Dropbox select={value} onSelect={onChange}></Dropbox>
            : type != '' &&
                <input
                    type={type} 
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange} />
            }
        </div>
    );

}

export default Input;
