
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
import { useToast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import { Link, Navigate } from "react-router-dom"

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

type tournamentType = "Liga1 - Superliga" | "Champions League" | "World Cup";

interface CreateUpdateRoomProps {
    isUpdate?: boolean;
}

const CreateUpdateRoom: React.FC<CreateUpdateRoomProps> = ({ isUpdate }) => {

    const { toast } = useToast()
    const [checkedErrors, setCheckedErrors] = useState(false);

    //------------------------------------------------------------------------------

    const dispatch = useDispatch();
    const { createRoom, updateRoom} = bindActionCreators(roomActionCreators, dispatch);

    const state = useSelector((state: State) => state.roomState);
    const { tournament, maxPlayers, votesToSkip, isRoomCreated, roomCode, errors} = state;

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
                toast({
                title: "Create Room Failed!",
                variant: "destructive",
                description: errors[type].toString(),
                });
                console.log(errors[type]);
            }
            setCheckedErrors(false);
        }
    
      }, [errors]);


    const createRoomRequest = (tournament: tournamentType, max_players: number, votes_to_skip: number) =>  {
        createRoom(tournament, max_players, votes_to_skip);

        setCheckedErrors(true);
    }

    const createUpdateRequest = (max_players: number, votes_to_skip: number) =>  {
        updateRoom(max_players, votes_to_skip, roomCode);

        setCheckedErrors(true);
    }

    const onSubmit = (data: z.infer<typeof FormSchema>) => {

        try {
            
            if(isUpdate){
                createUpdateRequest(data.max_players, data.votes_to_skip);
            }
            else {
                createRoomRequest(data.tournament, data.max_players, data.votes_to_skip);
            }

    
        } catch (err) {
            toast({
                title: "Create Room Failed!",
                variant: "destructive",
                description: "Something Wrong, try again", // Assuming the error object has a message property
            });
            console.error(err);
        }
      }

    if (isRoomCreated) {
        return <Navigate to={`/room/${roomCode}`} />;
    }

    const renderCreateTitle = () => {
        return (
            <>
                <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
                    Kick Off Picks - Create Room
                </h2>
                <p className="text-light-3 small-medium md:base-regular mt-2">
                    Welcome back! Please provide some details.
                </p>
            </>
        );
    }

    const renderUpdateTitle = () => {
        return (
            <>
                <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
                    Kick Off Picks - Update Room
                </h2>
                <p className="text-light-3 small-medium md:base-regular text-center mt-2">
                    Welcome back! Because you are the host you can change some settings.
                </p>
            </>
        );
    }

    const renderRadioGroup = () => {
        return (
            <FormField
            control={form.control}
            name="tournament"
            render={({ field }) => (
                <FormItem className="space-y-3">
                <FormLabel>Select one of the folowing tournaments...</FormLabel>
                <FormControl className="">
                    <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col ml-12 space-y-1"
                    >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                            <RadioGroupItem value="Liga1 - Superliga" />
                            </FormControl>
                            <FormLabel className="font-normal">Liga 1 - Superliga</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                            <RadioGroupItem value="Champions League" />
                            </FormControl>
                            <FormLabel className="font-normal">Champions League</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                            <RadioGroupItem value="World Cup" />
                            </FormControl>
                            <FormLabel className="font-normal">World Cup</FormLabel>
                        </FormItem>
                    </RadioGroup>
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        );
    }

    const renderFormWithButtons = () => {
         return (
            <>
                <Form {...form}>
                <form 
                onSubmit={form.handleSubmit(onSubmit)} 
                className="flex-center flex-col gap-5 ml-4 mt-4 mb-4">
                    
                    {/* render radio group */}
                    { isUpdate ? null : renderRadioGroup() } 

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

                    {/* BUTOANE */}
                    {renderButtons()}

                </form>
                </Form>
            </>
        );
    }

    const renderButtons = () => {
        return (
            <div className="flex flex-row mt-2">
                <Button type="button" className="shad-button_red m-1">
                    <Link className="nav-link" to="/rooms-home">BACK</Link>
                </Button>

                <Button type="submit" className="shad-button_green m-1">
                    {isUpdate ? "UPDATE THE ROOM" : "CREATE A ROOM"}
                </Button>
            </div>
        );
    }

    return (
    <div className="sm:w-420 flex-center flex-col">

        {isUpdate ? renderUpdateTitle() : renderCreateTitle()}
        {renderFormWithButtons()}
        
    </div>
    )
}

CreateUpdateRoom.defaultProps = {
    isUpdate: false,
}

export default CreateUpdateRoom;