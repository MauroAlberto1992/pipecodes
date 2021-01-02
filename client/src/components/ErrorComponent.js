import React from "react"
//Styles
import styles from "../styles/ErrorComponent.css"

const ErrorComponent = ({ errorMessage, statusCode }) => {
    return (
        <div style={styles.errorContainer}>
            <label style={{ fontWeight: 500 }}> {`${statusCode} - `}</label>
            <label>{errorMessage}</label>
        </div >
    );
}


export default (ErrorComponent);

