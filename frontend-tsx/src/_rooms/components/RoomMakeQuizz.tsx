
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { useToast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { questionActionCreators, State} from "@/_state";
import { useEffect, useState } from "react";
 
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
  } from "@/components/ui/command"
  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"

  const frameworks = [
    {
      value: "choice1",
      label: "Answer number 1",
    },
    {
      value: "choice2",
      label: "Answer number 2",
    },
    {
      value: "choice3",
      label: "Answer number 3",
    },
  ]

const FormSchema = z
.object({
    question: z.string().min(1, {
        message: "You must give a question text"
    }),
    answer1: z.string().min(1, {
        message: "Must give the answer 1"
    }),
    answer2: z.string().min(1, {
        message: "Must give the answer 2"
    }),
    answer3: z.string().min(1, {
        message: "Must give the answer 3"
    }),
    
})

interface CreateUpdateRoomProps {
    backCallback?: () => void;
}

const RoomMakeQuizz: React.FC<CreateUpdateRoomProps> = ({ backCallback }) => {

    const { toast } = useToast()
    const [checkedErrors, setCheckedErrors] = useState(false);
    const [errorsFlag, setErrorsFlag] = useState(false);

    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")

    //------------------------------------------------------------------------------

    const dispatch = useDispatch();
    const { createQuestion } = bindActionCreators(questionActionCreators, dispatch);

    const roomState = useSelector((state: State) => state.roomState);
    const { roomCode } = roomState;
    
    const questionState = useSelector((state: State) => state.questionState);
    const { nrOfQuestions, isQuestionCreated, errors} = questionState;

    //------------------------------------------------------------------------------

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            question: '',
            answer1: '',
            answer2: '',
            answer3:''
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
    
        if(errorsFlag){
            toast({
                title: "Question Saved Success!",
                variant: "success",
                description: `You have successfully created a question.`,
            });

            form.reset(); setValue("");

            setErrorsFlag(false);
        } 
        else if(isQuestionCreated){
            
            toast({
                title: "Question Saved Success!",
                variant: "success",
                description: `You have successfully created a question.`,
            });

            form.reset(); setValue("");

            setErrorsFlag(false);
        }

    }, [nrOfQuestions]);

    const onSubmit = (data: z.infer<typeof FormSchema>) => {

        if(value === "") {
            toast({
                title: "Make Quizz Failed!",
                variant: "destructive",
                description: "Please select a correct answer", // Assuming the error object has a message property
            });
            return;
        }

        let correctChoice = "";

        switch (value) {
            case "choice1":
                correctChoice = data.answer1;
                break;
            case "choice2":
                correctChoice = data.answer2;
                break;
            case "choice3":
                correctChoice = data.answer3;
                break;
            default:
                break;
        }

        try {
            
            createQuestion(roomCode, (nrOfQuestions+1), data.question, data.answer1, data.answer2, data.answer3, correctChoice);
            
            setCheckedErrors(true);

        } catch (err) {
            toast({
                title: "Make Quizz Failed!",
                variant: "destructive",
                description: "Something Wrong, try again", // Assuming the error object has a message property
            });
            console.error(err);
        }

    }
    

    const renderQuestion = () => {
        return (
        <div className="flex flex-col gap-2">

        <h2 className="text-lg text-center font-bold">
            Please enter your question here:
        </h2>

            <FormField
            control={form.control}
            name="question"
            render={({ field }) => (
                <FormItem className="flex-center flex-col">
                    <FormControl>
                        <Textarea rows={4} className="shad-input text-center w-420" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />

        </div>
    );
    }

    const renderAnswers = () => {
         return (
            <div className="flex flex-col gap-2">

            <h2 className="text-lg text-center font-bold">
                Please enter your answers here:
            </h2>

                <FormField
                control={form.control}
                name="answer1"
                render={({ field }) => (
                    <FormItem className="flex-center flex-col">
                        <FormControl>
                        <Input type="text" className="shad-input text-center w-420" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />

                <FormField
                control={form.control}
                name="answer2"
                render={({ field }) => (
                    <FormItem className="flex-center flex-col">
                        <FormControl>
                        <Input type="text" className="shad-input text-center w-420" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />

                <FormField
                control={form.control}
                name="answer3"
                render={({ field }) => (
                    <FormItem className="flex-center flex-col">
                        <FormControl>
                        <Input type="text" className="shad-input text-center w-420" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
            </div>
        );
    }

    const renderCorectAnswers = () => {
        return (
           <div className="flex flex-col flex-center gap-2">

                <h2 className="text-lg text-center font-bold">
                    Which is the correct answer?
                </h2>

                    <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-[200px] justify-between"
                        >
                        {value
                            ? frameworks.find((framework) => framework.value === value)?.label
                            : "Select framework..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-100" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0 bg-black">
                        <Command>
                        <CommandInput placeholder="Search framework..." />
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup>
                            {frameworks.map((framework) => (
                            <CommandItem
                                key={framework.value}
                                value={framework.value}
                                onSelect={(currentValue) => {
                                setValue(currentValue === value ? "" : currentValue)
                                setOpen(false)
                                }}
                            >
                                <Check
                                className={cn(
                                    "mr-2 h-4 w-4",
                                    value === framework.value ? "opacity-100" : "opacity-0"
                                )}
                                />
                                {framework.label}
                            </CommandItem>
                            ))}
                        </CommandGroup>
                        </Command>
                    </PopoverContent>
                </Popover>
           </div>
       );
   }

    const renderButtons = () => {
        return (
            <div className="flex flex-row mt-2">
                <Button type="button" 
                    className="shad-button_red m-1"
                    onClick={backCallback}
                >
                    BACK
                </Button>

                <Button type="button" 
                    className="shad-button_blue m-1"
                    onClick={() => {form.reset(); setValue("")}}
                >
                    CLEAR
                </Button>

                <Button type="submit" className="shad-button_green m-1">
                    SAVE
                </Button>
            </div>
        );
    }

    return (
        <div className="sm:w-420 flex-center flex-col">

        <h2 className="text-lg text-center font-bold">
            {"Question: " + (nrOfQuestions + 1)}
        </h2>

            <Form {...form}>
            <form 
            onSubmit={form.handleSubmit(onSubmit)} 
            className="flex-center flex-col gap-2">

                {renderQuestion()}

                { renderAnswers() }

                { renderCorectAnswers() }

                { renderButtons() }

            </form>
            </Form>

            
        </div>
    )
}

export default RoomMakeQuizz;


