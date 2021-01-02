import React from "react"
//Config
import Text from "../config/Text";
//Styles
import styles from "../styles/ValidComponent.css"

const ValidComponent = () => {
    return (
        <div style={styles.validContainer}>
            <label style={styles.label}> {Text.questionSaved}</label>
        </div >
    );
}


export default (ValidComponent);

