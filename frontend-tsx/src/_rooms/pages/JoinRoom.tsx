
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
import { Input } from "@/components/ui/input"
import { Link, Navigate } from "react-router-dom"
 
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { roomActionCreators, State} from "@/_state";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast"

const FormSchema = z
.object({

    code: z.string().max(6, {
        message: 'Code must be 6 characters long.'
    })
    .min(6, {
        message: 'Code must be 6 characters long.'
    }),
})

const JoinRoom = () => {

    const { toast } = useToast()
    const [checkedErrors, setCheckedErrors] = useState(false);
    const [roomCode, setRoomCode] = useState('');

    //------------------------------------------------------------------------------

    const dispatch = useDispatch();
    const { joinRoom } = bindActionCreators(roomActionCreators, dispatch);

    const state = useSelector((state: State) => state.roomState);
    const { errors, isJoinedRoom } = state;

    //------------------------------------------------------------------------------

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            code: '',
        },
    });

    useEffect(() => {
        // This useEffect will be triggered whenever 'errors' in the state changes
        if(checkedErrors){
            
            for (let type in errors) {
                if(type === 'code' || errors[type].toString() ==='[object Object]')
                    continue;
                toast({
                title: "Join Room Failed!",
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
            
            joinRoom(data.code);

            setRoomCode(data.code);
            setCheckedErrors(true);

            if (isJoinedRoom) {
                toast({
                    title: "Join Room successfully!",
                    variant: "success",
                    description: "Wait for the host ot start the game.",
                });
            }

    
        } catch (err) {
            toast({
                title: "Join Room Failed!",
                variant: "destructive",
                description: "Something Wrong, try again", // Assuming the error object has a message property
            });
            console.error(err);
        }
    }

    if (isJoinedRoom) {
        return <Navigate to={`/room/${roomCode}`} />;
    }

    return (
    <div className="sm:w-420 flex-center flex-col">
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
            Kick Off Picks - Join Room
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
            Welcome back! Please enter the room code.
        </p>

        <Form {...form}>
        
        <form 
          onSubmit={form.handleSubmit(onSubmit)} 
          className="flex-center flex-col gap-5 ml-4 mt-4 mb-4">
    
            <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
                <FormItem className="flex-center flex-col">
                    <FormControl>
                    <Input type="text" className="shad-input text-center" placeholder="Room Code" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />

            <div className="flex flex-row mt-2">
                <Button type="button" className="shad-button_red m-1">
                    <Link className="nav-link" to="/rooms-home">BACK</Link>
                </Button>

                <Button type="submit" className="shad-button_green m-1">
                    JOIN THIS ROOM
                </Button>
            </div>
        </form>
        </Form>
        
    </div>
    )
}

export default JoinRoom;