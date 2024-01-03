import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
 
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { roomActionCreators, questionActionCreators, State} from "@/_state";
import { useEffect, useState } from "react";
import { toast, useToast } from "@/components/ui/use-toast"


const FormSchema = z
.object({
    question: z.enum(["choice1", "choice2", "choice3"], {
        required_error: "You must select an answer to the question above.",
    }),
})

const RoomQuestion = () => {

    const [skipVote, setSkipVote] = useState(false);

    const [checkedErrors, setCheckedErrors] = useState(false);
    const [errorsFlag, setErrorsFlag] = useState(false);

    //------------------------------------------------------------------------------

    const dispatch = useDispatch();
    const { startQuestion, roomQuestion, currentQuestion} = bindActionCreators(questionActionCreators, dispatch);

    const roomState = useSelector((state: State) => state.roomState);
    const { roomCode, roomStarted } = roomState;

    const questionState = useSelector((state: State) => state.questionState);
    const { nrOfQuestions, currentIndex, isQuestionCreated, questionText, choice1, choice2, choice3, correctChoice, isFirstQuestion, errors } = questionState;

    //------------------------------------------------------------------------------

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            question: undefined,
          },
    });

    useEffect(() => {
        // This useEffect will be triggered whenever 'errors' in the state changes
        if(checkedErrors){
            for (let type in errors) {
                if(type === 'code' || errors[type].toString() ==='[object Object]')
                    continue;
                toast({
                    title: "Make Quizz Failed!",
                    variant: "destructive",
                    description: errors[type].toString(),
                });
                console.log(errors[type]);
            }
            setCheckedErrors(false);
            setErrorsFlag(true);
        }
    
      }, [errors]);

    useEffect(() => {

        if(roomStarted) {
            if(!isFirstQuestion) {
                startQuestionRequest();
            }
            else {
                currentQuestionRequest();
            }
        }

    }, []);

    const startQuestionRequest = () => {
        try {

            startQuestion(roomCode);

        } catch(err) {
            toast({
                title: "Start Question Failed!",
                variant: "destructive",
                description: "Failed, to load the questions", // Assuming the error object has a message property
            });
            console.error(err);
        }
    }

    const currentQuestionRequest = () => {
        try {

            currentQuestion(roomCode);

        } catch(err) {
            toast({
                title: "Current Question Failed!",
                variant: "destructive",
                description: "Failed, to load the questions", // Assuming the error object has a message property
            });
            console.error(err);
        }
    }

    const roomQuestionRequest = () => {
        try {

            roomQuestion(roomCode);

        } catch(err) {
            toast({
                title: "Room Question Failed!",
                variant: "destructive",
                description: "Failed, to load the questions", // Assuming the error object has a message property
            });
            console.error(err);
        }
    }

    const onSubmit = (data: z.infer<typeof FormSchema>) => {

        let correctChoice = "";

        switch (data.question) {
            case "choice1":
                correctChoice = choice1;
                break;
            case "choice2":
                correctChoice = choice2;
                break;
            case "choice3":
                correctChoice = choice3;
                break;
            default:
                break;
        }

        console.log(correctChoice);
        console.log(currentIndex);
        console.log(nrOfQuestions);
        
        if(currentIndex < nrOfQuestions) {
            roomQuestionRequest();
        }

    }

    const skipClick = () => {
        setSkipVote(!skipVote);
    }

    const passClick = () => {
        toast({
            title: "Pass Success!",
            variant: "success",
            description: `You have successfully passed the question.`,
        });
    }

    return (
        <Form {...form}>
        <form 
        onSubmit={form.handleSubmit(onSubmit)} 
        className="flex-center flex-col gap-5">
            
            <FormField
            control={form.control}
            name="question"
            render={({ field }) => (
                <FormItem className="space-y-3">
                <FormLabel className="font-bold text-lg">{questionText}</FormLabel>
                <FormControl className="">
                    <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                    >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                            <RadioGroupItem value="choice1" />
                            </FormControl>
                            <FormLabel className="font-normal text-lg">{choice1}</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                            <RadioGroupItem value="choice2" />
                            </FormControl>
                            <FormLabel className="font-normal text-lg">{choice2}</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                            <RadioGroupItem value="choice3" />
                            </FormControl>
                            <FormLabel className="font-normal text-lg">{choice3}</FormLabel>
                        </FormItem>
                    </RadioGroup>
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />

            <div className="flex flex-row mt-2">
                <Button type="button" 
                    className="shad-button_blue m-1" 
                    onClick={passClick}
                >
                    PASS
                </Button>
                
                <Button type="button" 
                    className={skipVote ? "shad-button_orange m-1" : "shad-button_purple m-1"} 
                    onClick={skipClick}
                >
                    {skipVote ? "UNVOTE SKIP" : "VOTE SKIP"}
                </Button>

                <Button type="submit" className="shad-button_green m-1">
                    ANSWER
                </Button>
            </div>    
        </form>
        </Form>
    );
}

export default RoomQuestion