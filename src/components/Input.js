import React, {forwardRef} from 'react';
import Dropbox from '../components/Dropbox';
import styles from "./Input.module.css";

const Input = forwardRef((props, ref) => {

    return (
        <div className={styles.field}>
            <label htmlFor={props.labelText}>{props.labelText}</label>
            { props.type == 'select' ? 
                <Dropbox select={props.value} onSelect={props.onChange}></Dropbox>
            : props.type != '' &&
                <input
                    type={props.type} 
                    value={props.value}
                    placeholder={props.placeholder}
                    onChange={props.onChange} 
                    ref={ref}/>
            }
        </div>
    );

});

export default Input;
