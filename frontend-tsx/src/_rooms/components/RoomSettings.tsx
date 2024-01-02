
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
import { useToast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"

import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { roomActionCreators, State} from "@/_state";
import { useEffect, useState } from "react";
 
const FormSchema = z
.object({
    tournament: z.enum(["Liga1 - Superliga", "Champions League", "World Cup"], {
        required_error: "You need to select a notification type.",
    }),
    max_players: z.coerce.number().min(2, {
        message: 'Cannot be less than 2 players.'
    }),
    votes_to_skip: z.coerce.number().min(1, {
        message: 'Cannot be less than 1 vote.' 
    }),
})


interface CreateUpdateRoomProps {
    updateCallback?: () => void;
}

const RoomSettings: React.FC<CreateUpdateRoomProps> = ({ updateCallback }) => {

    const { toast } = useToast()
    const [checkedErrors, setCheckedErrors] = useState(false);

    //------------------------------------------------------------------------------

    const dispatch = useDispatch();
    const { updateRoom} = bindActionCreators(roomActionCreators, dispatch);

    const state = useSelector((state: State) => state.roomState);
    const { tournament, maxPlayers, votesToSkip, roomCode, errors} = state;

    //------------------------------------------------------------------------------

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            tournament: tournament,
            max_players: maxPlayers,
            votes_to_skip: votesToSkip,
          },
    });

    useEffect(() => {
        // This useEffect will be triggered whenever 'errors' in the state changes
        if(checkedErrors){
            for (let type in errors) {
                if(type === 'code' || errors[type].toString() ==='[object Object]')
                    continue;
                toast({
                title: "Update Room Failed!",
                variant: "destructive",
                description: errors[type].toString(),
                });
                console.log(errors[type]);
            }
            setCheckedErrors(false);
        }
    
      }, [errors]);


    const onSubmit = (data: z.infer<typeof FormSchema>) => {

        try {
            
            updateRoom(data.max_players, data.votes_to_skip, roomCode);
            setCheckedErrors(true);

            if (updateCallback) {
                updateCallback();
            }
    
        } catch (err) {
            toast({
                title: "Update Room Failed!",
                variant: "destructive",
                description: "Something Wrong, try again", // Assuming the error object has a message property
            });
            console.error(err);
        }


      }

    const renderSettingsFields = () => {
         return (
            <>
                <FormField
                control={form.control}
                name="max_players"
                render={({ field }) => (
                    <FormItem className="flex-center flex-col">
                        <FormLabel className="shad-form_label">Max number of players in a room</FormLabel>
                        <FormControl>
                        <Input type="text" className="shad-input text-center w-3/4" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />

                <FormField
                control={form.control}
                name="votes_to_skip"
                render={({ field }) => (
                    <FormItem className="flex-center flex-col">
                        <FormLabel className="shad-form_label">Votes to skip the current question</FormLabel>
                        <FormControl>
                        <Input type="text" className="shad-input text-center w-3/4" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
            </>
        );
    }

    const renderButtons = () => {
        return (
            <div className="flex flex-row mt-2">
                <Button type="button" 
                    className="shad-button_red m-1"
                    onClick={updateCallback}>
                    BACK
                </Button>

                <Button type="submit" className="shad-button_green m-1">
                    UPDATE THE ROOM
                </Button>
            </div>
        );
    }

    return (
        <div className="sm:w-420 flex-center flex-col">

            <h2 className="text-lg text-center font-bold">
                Because you are the host you can change some settings:
            </h2>

            <Form {...form}>
            <form 
            onSubmit={form.handleSubmit(onSubmit)} 
            className="flex-center flex-col gap-5 ml-4 mt-4 mb-4">
                    
                {/* render radio group */}
                {/* { renderRadioGroup() }  */}

                { renderSettingsFields() }

                {/* BUTOANE */}
                { renderButtons() }

            </form>
            </Form>

            
        </div>
    )
}

export default RoomSettings;


// const renderRadioGroup = () => {
//     return (
//         <FormField
//         control={form.control}
//         name="tournament"
//         render={({ field }) => (
//             <FormItem className="space-y-3">
//             <FormLabel>Select one of the folowing tournaments...</FormLabel>
//             <FormControl className="">
//                 <RadioGroup
//                 onValueChange={field.onChange}
//                 defaultValue={field.value}
//                 className="flex flex-col ml-12 space-y-1"
//                 >
//                     <FormItem className="flex items-center space-x-3 space-y-0">
//                         <FormControl>
//                         <RadioGroupItem value="Liga1 - Superliga" />
//                         </FormControl>
//                         <FormLabel className="font-normal">Liga 1 - Superliga</FormLabel>
//                     </FormItem>
//                     <FormItem className="flex items-center space-x-3 space-y-0">
//                         <FormControl>
//                         <RadioGroupItem value="Champions League" />
//                         </FormControl>
//                         <FormLabel className="font-normal">Champions League</FormLabel>
//                     </FormItem>
//                     <FormItem className="flex items-center space-x-3 space-y-0">
//                         <FormControl>
//                         <RadioGroupItem value="World Cup" />
//                         </FormControl>
//                         <FormLabel className="font-normal">World Cup</FormLabel>
//                     </FormItem>
//                 </RadioGroup>
//             </FormControl>
//             <FormMessage />
//             </FormItem>
//         )}
//         />
//     );
// }