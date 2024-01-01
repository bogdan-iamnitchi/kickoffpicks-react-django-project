
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
import { toast } from "@/components/ui/use-toast"
import { Link, useParams } from "react-router-dom"
 
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { roomActionCreators, State} from "@/_state";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast"
import { loadRoomDetails } from "@/_state/actions-creators/roomActionCreators"
import { Input } from "@/components/ui/input"

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

const Room= () => {

    const isHost = true;

    const { toast } = useToast()
    const [checkedErrors, setCheckedErrors] = useState(false);
    let params = useParams<{code: string}>();
    let code = '';
    params.code == undefined? code = '' : code = params.code;

    //------------------------------------------------------------------------------

    const dispatch = useDispatch();
    const { loadRoomDetails } = bindActionCreators(roomActionCreators, dispatch);

    const state = useSelector((state: State) => state.roomState);
    const { tournament, maxPlayers, votesToSkip, isRoomCreated, isJoinedRoom, roomCode, errors} = state;

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
        // if(checkedErrors){
            
            for (let type in errors) {
                toast({
                    title: "Load Room Failed!",
                    variant: "destructive",
                    description: errors[type].toString(),
                });
                console.log(errors[type]);
            }
            setCheckedErrors(false);
        // }
    
      }, [errors]);

    useEffect(() => {
        loadRoomDetails(code);

        if(isJoinedRoom){
            toast({
                title: "Join Room Success!",
                variant: "success",
                description: `You have successfully joined room ${code}.`,
            });
            setCheckedErrors(false);
        }
        else if(isRoomCreated){
            toast({
                title: "Room Created successfully!",
                variant: "success",
                description: "You can now invite your friends to join the room.",
            });
            setCheckedErrors(false);
        }
    
      }, []);

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

    const renderPlayersVotes = () => {
        return (
            <div className="flex flex-col flex-center mt-2">
                <div className="flex flex-row mt-2">
                    <FormField
                    control={form.control}
                    name="max_players"
                    render={({ field }) => (
                        <FormItem className="flex-center flex-col h-2/3">
                            <FormLabel className="shad-form_label">Max players</FormLabel>
                            <FormControl>
                            <Input type="text" className="shad-input text-center w-1/3" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />

                    <FormField
                    control={form.control}
                    name="tournament"
                    render={({ field }) => (
                        <FormItem className="flex-center flex-col h-2/3">
                            <FormLabel className="shad-form_label">Tournament</FormLabel>
                            <FormControl>
                            <Input type="text" className="shad-input text-center w-40" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />

                    <FormField
                    control={form.control}
                    name="votes_to_skip"
                    render={({ field }) => (
                        <FormItem className="flex-center flex-col h-2/3">
                            <FormLabel className="shad-form_label">Votes to skip</FormLabel>
                            <FormControl>
                            <Input type="text" className="shad-input text-center w-1/3" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />

                </div>

                {isHost ? (
                    <Button type="submit" className="shad-button_primary w-2/3">
                        SETTINGS
                    </Button>
                ) : (<></>)}

            </div>
            
        );
    }

    return (
    <div className="sm:w-420 flex-center flex-col">
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
            {"ROOM: " + code}
        </h2>
        <p className="text-light-3 small-medium md:base-regular text-center mt-2">
            In this game, only the best emerge victorious.
        </p>

        <Form {...form}>
        
        <form 
          onSubmit={form.handleSubmit(onSubmit)} 
          className="flex-center flex-col gap-5 ml-4 mt-4 mb-4">
            
            <div className="border-t-2 border-white w-full"></div>

            <FormField
            control={form.control}
            name="tournament"
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
                            <RadioGroupItem value="liga1" />
                            </FormControl>
                            <FormLabel className="font-normal text-lg">France</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                            <RadioGroupItem value="champions-league" />
                            </FormControl>
                            <FormLabel className="font-normal text-lg">Argentina</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                            <RadioGroupItem value="world-cup" />
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
                <Button type="button" className="shad-button_red m-1">
                    <Link className="nav-link" to="/rooms-home">LEAVE</Link>
                </Button>
                <Button type="button" className="shad-button_blue m-1">
                    SKIP
                </Button>
                <Button type="submit" className="shad-button_green m-1">
                    ANSWER
                </Button>
                
            </div>

            {/* draw a white horizontal line whith a text in middle*/}
            <div className="border-t-2 border-white w-full"></div>
            {renderPlayersVotes()}
            

            {/* <Button type="button" className="shad-button_red w-40 m-1">
                <Link className="nav-link" to="/rooms-home">LEAVE</Link>
            </Button> */}
        </form>
        </Form>
        
    </div>
    )
}

export default Room;