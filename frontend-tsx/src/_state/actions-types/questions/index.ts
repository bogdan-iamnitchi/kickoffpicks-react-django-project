import { QuestionActionType } from "./types"

interface CreateQuestionSuccessAction {
    type: QuestionActionType.CREATE_QUESTION_SUCCESS,
    payload: any
}

interface CreateQuestionFailAction {
    type: QuestionActionType.CREATE_QUESTION_FAIL,
    errors: any
}

interface DeleteQuestionSuccessAction {
    type: QuestionActionType.DELETE_QUESTION_SUCCESS,
    payload: any
}

interface DeleteQuestionFailAction {
    type: QuestionActionType.DELETE_QUESTION_FAIL,
    errors: any
}

interface StartQuestionSuccessAction {
    type: QuestionActionType.START_QUESTION_SUCCESS,
    payload: any
}

interface StartQuestionFailAction {
    type: QuestionActionType.START_QUESTION_FAIL,
    errors: any
}

interface CurrentQuestionSuccessAction {
    type: QuestionActionType.CURRENT_QUESTION_SUCCESS,
    payload: any
}

interface CurrentQuestionFailAction {
    type: QuestionActionType.CURRENT_QUESTION_FAIL,
    errors: any
}

interface RoomQuestionSuccessAction {
    type: QuestionActionType.ROOM_QUESTION_SUCCESS,
    payload: any
}

interface RoomQuestionFailAction {
    type: QuestionActionType.ROOM_QUESTION_FAIL,
    errors: any
}

interface NrOfQuestionsSuccessAction {
    type: QuestionActionType.NR_OF_QUESTIONS_SUCCESS,
    payload: any
}

interface NrOfQuestionsFailAction {
    type: QuestionActionType.NR_OF_QUESTIONS_FAIL,
    errors: any
}

interface FirstQuestionSuccessAction {
    type: QuestionActionType.FIRST_QUESTION_SUCCESS,
    payload: any
}

interface FirstQuestionFailAction {
    type: QuestionActionType.FIRST_QUESTION_FAIL,
    errors: any
}

interface AnswerQuestionSuccessAction {
    type: QuestionActionType.ANSWER_QUESTION_SUCCESS,
    payload: any
}

interface AnswerQuestionFailAction {
    type: QuestionActionType.ANSWER_QUESTION_FAIL,
    errors: any
}

interface FinalScoreSuccessAction {
    type: QuestionActionType.FINAL_SCORE_SUCCESS,
    payload: any
}

interface FinalScoreFailAction {
    type: QuestionActionType.FINAL_SCORE_FAIL,
    errors: any
}

export type QuestionAction = 
    CreateQuestionSuccessAction
    | CreateQuestionFailAction
    | DeleteQuestionSuccessAction
    | DeleteQuestionFailAction
    | StartQuestionSuccessAction
    | StartQuestionFailAction
    | CurrentQuestionSuccessAction
    | CurrentQuestionFailAction
    | RoomQuestionSuccessAction
    | RoomQuestionFailAction
    | NrOfQuestionsSuccessAction
    | NrOfQuestionsFailAction
    | FirstQuestionSuccessAction
    | FirstQuestionFailAction

    | AnswerQuestionSuccessAction
    | AnswerQuestionFailAction

    | FinalScoreSuccessAction
    | FinalScoreFailAction
    


export type Errors = Array<{ [key: string]: string[] }>

export type QuestionState = {
    nrOfQuestions: number,
    currentIndex: number,
    isQuestionCreated: boolean,

    questionText: string,
    choice1: string,
    choice2: string,
    choice3: string,
    correctChoice: string,

    score: number,
    isFinal: boolean,
    isFirstQuestion: false,

    errors: Errors,
}