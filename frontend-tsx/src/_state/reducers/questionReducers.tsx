import { QuestionState, QuestionAction } from "../actions-types/questions";
import { QuestionActionType } from "../actions-types/questions/types";

const initialState: QuestionState = {
    nrOfQuestions: 0,
    currentIndex: 0,
    isQuestionCreated: false,

    questionText: '',
    choice1: '',
    choice2: '',
    choice3: '',
    correctChoice: '',

    isFirstQuestion: false,

    errors: []
}

const questionReducer = (state: QuestionState = initialState, action: QuestionAction) => {
    switch (action.type) {
    case QuestionActionType.CREATE_QUESTION_SUCCESS:
        return {
            ...state,

            nrOfQuestions: state.nrOfQuestions + 1,
            isQuestionCreated: true,
        }

    case QuestionActionType.CREATE_QUESTION_FAIL:
        return {
            ...state,
            
            nrOfQuestions: state.nrOfQuestions,
            isQuestionCreated: false,

            errors: action.errors
        }

    case QuestionActionType.DELETE_QUESTION_SUCCESS:
        return {
            ...state,

            nrOfQuestions: initialState.nrOfQuestions,
            isQuestionCreated: false,
            isFirstQuestion: false,

            errors: []
        }
  
    case QuestionActionType.DELETE_QUESTION_FAIL:
        return {
            ...state,

            errors: action.errors
        }

    case QuestionActionType.START_QUESTION_SUCCESS:
        return {
            ...state,

            currentIndex: action.payload.current_index,

            questionText: action.payload.question_text,
            choice1: action.payload.choice1,
            choice2: action.payload.choice2,
            choice3: action.payload.choice3,
            correctChoice: action.payload.correct_choice,

            isFirstQuestion: true, 
        }


    case QuestionActionType.CURRENT_QUESTION_SUCCESS:
    case QuestionActionType.ROOM_QUESTION_SUCCESS:
        return {
            ...state,

            currentIndex: action.payload.current_index,

            questionText: action.payload.question_text,
            choice1: action.payload.choice1,
            choice2: action.payload.choice2,
            choice3: action.payload.choice3,
            correctChoice: action.payload.correct_choice,
        }

    case QuestionActionType.START_QUESTION_FAIL:
        return {
            ...state,

            isFirstQuestion: false,
            errors: action.errors
        }

    case QuestionActionType.NR_OF_QUESTIONS_SUCCESS:
        return {
            ...state,

            nrOfQuestions: action.payload.nr_of_questions,
        }

    case QuestionActionType.FIRST_QUESTION_SUCCESS:
        return {
            ...state,

            isFirstQuestion: action.payload.exists
        }

    case QuestionActionType.NR_OF_QUESTIONS_FAIL:
    case QuestionActionType.CURRENT_QUESTION_FAIL:
    case QuestionActionType.ROOM_QUESTION_FAIL:
        return {
            ...state,

            errors: action.errors
        }

      default:
        return state;
    }
  }

export default questionReducer;