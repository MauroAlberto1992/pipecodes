import { ERROR_DIALOG, GET_QUESTIONS, SAVE_QUESTION } from "./constants/constants"
import axios from "axios";

const apiUrl = 'http://localhost:5000/api/questions';


export const getQuestions = (page) => async dispatch => {
    try {
        const response = await axios.get(`${apiUrl}/?page=${page}`);

        dispatch({
            type: GET_QUESTIONS,
            payload: response.data
        })

    } catch (error) {
        let errorContainer = {};
        errorContainer.statusText = undefined;
        errorContainer.status = "";

        let errorResponse = error && error.response;

        errorContainer.statusText = errorResponse && errorResponse.statusText;
        errorContainer.status = errorResponse && errorResponse.status;

        dispatch({
            type: ERROR_DIALOG,
            payload: error.response
        });
    }
}

export const saveQuestion = (data) => async dispatch => {
    const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(data)
    };

    //Found a problem with axios and the POST request, when trying to add 
    // a body, so I use the fetch version for this req

    fetch(apiUrl, options)
        .then(response => {
            console.log("response", response)
            dispatch({
                type: SAVE_QUESTION,
            })
        })
        .catch(error => {
            let errorContainer = {};
            errorContainer.statusText = undefined;
            errorContainer.status = "";

            let errorResponse = error && error.response;

            errorContainer.statusText = errorResponse && errorResponse.statusText;
            errorContainer.status = errorResponse && errorResponse.status;

            dispatch({
                type: ERROR_DIALOG,
                payload: error.response
            });
        })

}