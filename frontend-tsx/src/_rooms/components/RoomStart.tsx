import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { roomActionCreators, State} from "@/_state";
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast"

interface RoomStartProps {
    isHost: boolean;
}

const RoomStart: React.FC<RoomStartProps> = ({isHost}) => {
    
    const [checkedErrors, setCheckedErrors] = useState(false);

    //------------------------------------------------------------------------------

    const dispatch = useDispatch();
    const { startRoom } = bindActionCreators(roomActionCreators, dispatch);

    const state = useSelector((state: State) => state.roomState);
    const { errors } = state;

    //------------------------------------------------------------------------------

    useEffect(() => {

        if(checkedErrors){
            for (let type in errors) {
                if(type === 'code' || errors[type].toString() ==='[object Object]')
                    continue;

                if(type === 'Room Not Found') {
                    toast({
                        title: "Load Room Failed!",
                        variant: "destructive",
                        description: "This room no longer exist!",
                    });
                }

                toast({
                    title: "Load Room Failed!",
                    variant: "destructive",
                    description: errors[type].toString(),
                });
                console.log(errors[type]);
            }
            setCheckedErrors(false);
        }
      }, [errors]);

      

      const startRoomRequest = () => {
        try {

            startRoom();

        } catch(err) {
            toast({
                title: "Starting Room Failed!",
                variant: "destructive",
                description: "Opps, something went wrong", // Assuming the error object has a message property
            });
            console.error(err);
        }
    }

    const startPressed = () => {
        startRoomRequest();

        toast({
            title: "Starting Room Success!",
            variant: "success",
            description: "Room started succesfully", // Assuming the error object has a message property
        });
    }

    const renderHostDescription = () => {
        return (
        <>
            <h2 className="text-lg text-center font-bold">
                Welcome back! You are the host of this room:
            </h2>

            <h2 className="text-base text-center">
                - Players are waiting for you to start the game...
            </h2>
            <h2 className="text-base text-center">
                - You can change anytime the room settings:
            </h2>
            <h2 className="text-base text-center">
                - You can use the chat share the room code with your friends so they can join the room:
            </h2>
        </>
        );
    }

    const renderPlayerDescirption = () => {
        return (
        <>
            <h2 className="text-lg text-center font-bold">
                Welcome back! Room not started yet, waiting for the host to start it... 
            </h2>

            <h2 className="text-base text-center">
                Meanwhile, you can chat with the other players: 
            </h2>
        </>
        );
    }

    return (
    <div className="flex flex-center flex-col">
        
        {isHost ? (
            renderHostDescription()
        ):(
            renderPlayerDescirption()
        )}

        <div className="flex flex-row mt-2">
            
            <Button type="button" className="shad-button_blue m-1">
                <Link className="nav-link" to="/">HOME</Link>
            </Button>
            
            <Button type="button" className="shad-button_orange m-1">
                <Link className="nav-link" to="/chat">CHAT</Link>
            </Button>

            {isHost ? (
                <Button type="button" className="shad-button_green m-1" onClick={startPressed}>
                    START
                </Button>
            ):(
                null
            )}

        </div>  
    </div>
    )
}

export default RoomStart