import { ERROR_DIALOG, GET_QUESTIONS, SAVE_QUESTION } from "./action/constants/constants"


const initialState = {
    hasNextPage: true,
    hasPrevPage: true,
    questions: [],
    errorStatusCode: 0,
    errorText: "",
    loadingQuestions: false,
    savedQuestion: false,
    token: localStorage.getItem('token'),
}

const authReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case ERROR_DIALOG:
            return {
                ...state,
                errorStatusCode: payload.status,
                errorText: payload.statusText,
                savedQuestion: false
            }
        case GET_QUESTIONS:
            return {
                ...state,
                hasNextPage: payload.hasNext,
                hasPrevPage: payload.hasPrev,
                loadingQuestions: true,
                questions: payload.resultQuestions,
                savedQuestion: false
            }

        case SAVE_QUESTION:
            return {
                ...state,
                savedQuestion: true
            }
        default:
            return state;

    }
}

export default authReducer;