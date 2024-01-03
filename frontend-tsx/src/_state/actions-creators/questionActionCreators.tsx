import axios from "axios";

import { Dispatch } from "redux";
import { QuestionActionType } from "../actions-types/questions/types";
import { QuestionAction } from "../actions-types/questions";

export const createQuestion = (
    roomCode: string,
    currentIndex: number,
    questionText: string,
    choice1: string,
    choice2: string,
    choice3: string,
    correct_choice: string
) => async (dispatch: Dispatch<QuestionAction>) => {

    const config = {
        headers: {
            "Authorization": `JWT ${localStorage.getItem('access')}`,
        },
        withCredentials: true,
    };

    const body = {
        "room_code": roomCode,
        "current_index": currentIndex,
        "question_text": questionText,
        "choice1": choice1,
        "choice2": choice2,
        "choice3": choice3,
        "correct_choice": correct_choice
    }

    try {
        const res = await axios.post(
            `${import.meta.env.VITE_APP_API_URL}/questions-api/create-question/`,
            body,
            config
        );
        
        // console.log(res.data);

        dispatch({
            type: QuestionActionType.CREATE_QUESTION_SUCCESS,
            payload: res.data
        });

    } catch (err) {
        if (axios.isAxiosError(err)) {
            if(err.response?.data) {
                dispatch({
                    type: QuestionActionType.CREATE_QUESTION_FAIL,
                    errors: err.response.data
                });
            }
        }
        else {
            dispatch({
                type: QuestionActionType.CREATE_QUESTION_FAIL,
                errors: []
            });
        }
    }

};


export const deleteQuestion = (roomCode: string) => async (dispatch: Dispatch<QuestionAction>) => {

    const config = {
        headers: {
            "Authorization": `JWT ${localStorage.getItem('access')}`,
        },
        withCredentials: true,
    };

    try {
        const res = await axios.delete(
            `${import.meta.env.VITE_APP_API_URL}/questions-api/delete-question/${roomCode}`,
            config
        );
        
        // console.log(res.data);

        dispatch({
            type: QuestionActionType.DELETE_QUESTION_SUCCESS,
            payload: res.data
        });

        console.log(res.data.code);

    } catch (err) {
        if (axios.isAxiosError(err)) {
            if(err.response?.data) {
                dispatch({
                    type: QuestionActionType.DELETE_QUESTION_FAIL,
                    errors: err.response.data
                });
            }
        }
        else {
            dispatch({
                type: QuestionActionType.DELETE_QUESTION_FAIL,
                errors: []
            });
        }
    }

};

export const startQuestion = (roomCode: string) => async (dispatch: Dispatch<QuestionAction>) => {

    const config = {
        headers: {
            "Authorization": `JWT ${localStorage.getItem('access')}`,
        },
        withCredentials: true,
    };

    try {
        const res = await axios.get(
            `${import.meta.env.VITE_APP_API_URL}/questions-api/start-question/${roomCode}`,
            config
        );
        
        // console.log(res.data);

        dispatch({
            type: QuestionActionType.START_QUESTION_SUCCESS,
            payload: res.data
        });

        console.log(res.data.code);

    } catch (err) {
        if (axios.isAxiosError(err)) {
            if(err.response?.data) {
                dispatch({
                    type: QuestionActionType.START_QUESTION_FAIL,
                    errors: err.response.data
                });
            }
        }
        else {
            dispatch({
                type: QuestionActionType.START_QUESTION_FAIL,
                errors: []
            });
        }
    }

};

export const currentQuestion = (roomCode: string) => async (dispatch: Dispatch<QuestionAction>) => {

    const config = {
        headers: {
            "Authorization": `JWT ${localStorage.getItem('access')}`,
        },
        withCredentials: true,
    };

    try {
        const res = await axios.get(
            `${import.meta.env.VITE_APP_API_URL}/questions-api/current-question/${roomCode}`,
            config
        );
        
        // console.log(res.data);

        dispatch({
            type: QuestionActionType.CURRENT_QUESTION_SUCCESS,
            payload: res.data
        });

        console.log(res.data.code);

    } catch (err) {
        if (axios.isAxiosError(err)) {
            if(err.response?.data) {
                dispatch({
                    type: QuestionActionType.CURRENT_QUESTION_FAIL,
                    errors: err.response.data
                });
            }
        }
        else {
            dispatch({
                type: QuestionActionType.CURRENT_QUESTION_FAIL,
                errors: []
            });
        }
    }

};

export const roomQuestion = (roomCode: string) => async (dispatch: Dispatch<QuestionAction>) => {

    const config = {
        headers: {
            "Authorization": `JWT ${localStorage.getItem('access')}`,
        },
        withCredentials: true,
    };

    try {
        const res = await axios.get(
            `${import.meta.env.VITE_APP_API_URL}/questions-api/room-question/${roomCode}`,
            config
        );
        
        // console.log(res.data);

        dispatch({
            type: QuestionActionType.ROOM_QUESTION_SUCCESS,
            payload: res.data
        });

        console.log(res.data.code);

    } catch (err) {
        if (axios.isAxiosError(err)) {
            if(err.response?.data) {
                dispatch({
                    type: QuestionActionType.ROOM_QUESTION_FAIL,
                    errors: err.response.data
                });
            }
        }
        else {
            dispatch({
                type: QuestionActionType.ROOM_QUESTION_FAIL,
                errors: []
            });
        }
    }

};

export const numberOfQuestions = (roomCode: string) => async (dispatch: Dispatch<QuestionAction>) => {

    const config = {
        headers: {
            "Authorization": `JWT ${localStorage.getItem('access')}`,
        },
        withCredentials: true,
    };

    try {
        const res = await axios.get(
            `${import.meta.env.VITE_APP_API_URL}/questions-api/nr-of-questions/${roomCode}`,
            config
        );
        
        // console.log(res.data);

        dispatch({
            type: QuestionActionType.NR_OF_QUESTIONS_SUCCESS,
            payload: res.data
        });

        console.log(res.data.code);

    } catch (err) {
        if (axios.isAxiosError(err)) {
            if(err.response?.data) {
                dispatch({
                    type: QuestionActionType.NR_OF_QUESTIONS_FAIL,
                    errors: err.response.data
                });
            }
        }
        else {
            dispatch({
                type: QuestionActionType.NR_OF_QUESTIONS_FAIL,
                errors: []
            });
        }
    }

};

export const checkFirstQuestion = (roomCode: string) => async (dispatch: Dispatch<QuestionAction>) => {

    const config = {
        headers: {
            "Authorization": `JWT ${localStorage.getItem('access')}`,
        },
        withCredentials: true,
    };

    try {
        const res = await axios.get(
            `${import.meta.env.VITE_APP_API_URL}/questions-api/first-question/${roomCode}`,
            config
        );
        
        // console.log(res.data);

        dispatch({
            type: QuestionActionType.FIRST_QUESTION_SUCCESS,
            payload: res.data
        });

        console.log(res.data.code);

    } catch (err) {
        if (axios.isAxiosError(err)) {
            if(err.response?.data) {
                dispatch({
                    type: QuestionActionType.FIRST_QUESTION_FAIL,
                    errors: err.response.data
                });
            }
        }
        else {
            dispatch({
                type: QuestionActionType.FIRST_QUESTION_FAIL,
                errors: []
            });
        }
    }

};


export const answerQuestion = (currentIndex: string, roomCode: string, answer: string) => async (dispatch: Dispatch<QuestionAction>) => {

    const config = {
        headers: {
            "Authorization": `JWT ${localStorage.getItem('access')}`,
        },
        withCredentials: true,
    };

    try {
        const res = await axios.get(
            `${import.meta.env.VITE_APP_API_URL}/questions-api/first-question/${roomCode}`,
            config
        );
        
        // console.log(res.data);

        dispatch({
            type: QuestionActionType.FIRST_QUESTION_SUCCESS,
            payload: res.data
        });

        console.log(res.data.code);

    } catch (err) {
        if (axios.isAxiosError(err)) {
            if(err.response?.data) {
                dispatch({
                    type: QuestionActionType.FIRST_QUESTION_FAIL,
                    errors: err.response.data
                });
            }
        }
        else {
            dispatch({
                type: QuestionActionType.FIRST_QUESTION_FAIL,
                errors: []
            });
        }
    }

};
