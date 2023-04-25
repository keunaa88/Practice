import styles from "./Selectbox.module.css";

function Selectbox(props) {

    return (
        <div className={styles.field}>
            { props.labelText && <label htmlFor={props.labelText}>{props.labelText}</label> }
            <select
                name={props.name}
                value={props.value} 
                onChange={props.onChange}
            >
            { props.options.map((x, idx) => { 
                return <option key={idx} value={x.value}>{x.label}</option>
            })}
            </select>
            { props.errorMsg && <span className={styles.error}>{props.errorMsg}</span> } 
        </div>
    );
}
export default Selectbox;