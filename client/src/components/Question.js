import React, { useState } from "react"
import Text from "../config/Text";
import { connect } from "react-redux";
//Actions
import { saveQuestion } from "../action/auth"
//Styles
import styles from "../styles/Question.css"
import ValidComponent from "./ValidComponent";
//Helpers
const validateEmail = require("../helpers/validations");


const Question = ({ saveQuestion, savedQuestion }) => {
    let [data, setData] = useState({
        name: "",
        email: "",
        obs: "",
        questionDate: ""
    });

    const onChange = e => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const submitQuestion = () => {

        if (name === "") {
            return alert(Text.alerts.emptyName)
        } else if (email === "") {
            return alert(Text.alerts.emptyEmail)
        } else if (questionDate === "") {
            return alert(Text.alerts.emptyDate)
        }

        if (!validateEmail(email)) {
            return alert(Text.alerts.notValidEmail)
        }
        else {
            saveQuestion(data)
        }
    }

    let { name, email, obs, questionDate } = data;
    return (
        <div style={styles.container}>
            <label>{Text.nome}</label>
            <br />
            <input onChange={(e) => onChange(e)} value={name} name="name" type="text" />
            <br />
            <label>{Text.email}</label>
            <br />
            <input onChange={(e) => onChange(e)} value={email} name="email" type="email" />
            <br />
            <label>{Text.observações}</label>
            <br />
            <input onChange={(e) => onChange(e)} value={obs} name="obs" type="text" />
            <br />
            <label>{Text.data}</label>
            <br />
            <input title="Fromat is YYYY/MM/DD" onChange={(e) => onChange(e)} value={questionDate} name="questionDate" type="text" />
            <br />
            <br />
            <button onClick={() => submitQuestion()}>
                {Text.submeter}
            </button>
            {savedQuestion &&
                <ValidComponent />}
        </div>
    );
}

const mapStateToProps = state => ({
    savedQuestion: state.savedQuestion,
});

export default connect(mapStateToProps, { saveQuestion })(Question);
