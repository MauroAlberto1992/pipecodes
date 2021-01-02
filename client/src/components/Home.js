import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
//Components
import ErrorComponent from "./ErrorComponent";
//Config
import Text from "../config/Text";
//Actions
import { getQuestions } from "../action/auth"
//Styles
import styles from "../styles/Home.css"

const Home = ({ errorText, errorStatusCode, getQuestions, hasNextPage, hasPrevPage, questions }) => {
    const hasQuestions = (questions !== undefined)
    const history = useHistory();

    let [data, setData] = useState({
        page: 1,
    });

    useEffect(() => {
        if (!hasQuestions) {
            getQuestions(1)
        }
    });

    const onChange = (nav) => {
        if (nav === "next") {
            setData({ ...data, page: page + 1 });
            getQuestions(page + 1)
        }
        else if (nav === "back") {
            setData({ ...data, page: page - 1 });
            getQuestions(page - 1)
        }
    }


    const handleClick = () => {
        history.push("/questions");
    }

    let { page } = data;
    let hasErrors = (errorText !== undefined || errorStatusCode !== undefined)
    return (
        <div style={styles.container}>
            <div style={{ ...styles.gridContainer, ...{ paddingBottom: 20 } }}>
                <label style={styles.label}>{Text.nome}</label>
                <label style={styles.label}>{Text.email}</label>
                <label style={styles.label}>{Text.observações}</label>
                <label style={styles.label}>{Text.data}</label>
            </div>
            {hasQuestions && questions.map((question, index) => {
                return (
                    <div key={index} style={styles.gridContainer}>
                        <label>{`${index + 1} -  ${question.name}`}</label>
                        <label>{question.email}</label>
                        <label>{question.obs || "-"}</label>
                        <label>{question.questionDate.split("T")[0]}</label>
                    </div>)
            })}
            <div style={styles.buttonContainer}>
                <button onClick={() => handleClick()} >
                    {Text.novaQuestao}
                </button>
                <div style={{ marginRight: 50 }}>
                    {hasPrevPage && <button onClick={() => onChange("back")} >
                        {Text.back}
                    </button>}
                    {hasNextPage && <button onClick={() => onChange("next")} >
                        {Text.next}
                    </button>}
                </div>
            </div>
            {hasErrors &&
                <ErrorComponent errorMessage={errorText} statusCode={errorStatusCode} />}
        </div>
    );
}
const mapStateToProps = state => ({
    errorStatusCode: state.errorStatusCode,
    errorText: state.errorText,
    hasNextPage: state.hasNextPage,
    hasPrevPage: state.hasPrevPage,
    questions: state.questions,
});

export default connect(mapStateToProps, { getQuestions })(Home);

