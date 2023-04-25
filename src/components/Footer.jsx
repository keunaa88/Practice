import styles from "./Footer.module.css";


const Footer = () =>{

    return (
        <footer className={styles.footer}>
            <ul className={styles.first}>
                <li><a href="#">Conditions of Use & Sale</a></li>
                <li><a href="#">Privacy Notice</a></li>
                <li><a href="#">Notice</a></li>
            </ul>
            <div className={styles.second}>
                <p>Copyright Kmall. All rights reserved</p>
            </div>
        </footer>
    )
}

export default Footer;