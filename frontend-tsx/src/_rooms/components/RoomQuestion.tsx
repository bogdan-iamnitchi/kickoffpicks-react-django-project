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
import { Navigate, useParams } from "react-router-dom"
import { Input } from "@/components/ui/input"
 
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { roomActionCreators, State} from "@/_state";
import { useEffect, useState } from "react";
import { toast, useToast } from "@/components/ui/use-toast"
import RoomSettings from "../components/RoomSettings"

const FormSchema = z
.object({
    question: z.enum(["France", "Argentina", "Spain"], {
        required_error: "You must select an answer to the question above.",
    }),
})

const RoomQuestion = () => {

    const [skipVote, setSkipVote] = useState(false);

    //------------------------------------------------------------------------------

    const dispatch = useDispatch();
    const { loadRoomDetails } = bindActionCreators(roomActionCreators, dispatch);

    // const state = useSelector((state: State) => state.roomState);
    // const { tournament, maxPlayers, votesToSkip, isRoomCreated, isJoinedRoom, isHost, errors} = state;

    //------------------------------------------------------------------------------

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            question: undefined,
          },
    });

    const onSubmit = (data: z.infer<typeof FormSchema>) => {
        toast({
          title: "You submitted the following values:",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">{JSON.stringify(data, null, 2)}</code>
            </pre>
          ),
        })
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
                <FormLabel className="font-bold text-lg">Who won the last world cup tournament...</FormLabel>
                <FormControl className="">
                    <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                    >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                            <RadioGroupItem value="France" />
                            </FormControl>
                            <FormLabel className="font-normal text-lg">France</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                            <RadioGroupItem value="Argentina" />
                            </FormControl>
                            <FormLabel className="font-normal text-lg">Argentina</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                            <RadioGroupItem value="Spain" />
                            </FormControl>
                            <FormLabel className="font-normal text-lg">Spain</FormLabel>
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