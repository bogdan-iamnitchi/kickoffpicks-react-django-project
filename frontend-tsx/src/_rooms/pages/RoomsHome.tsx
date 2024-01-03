import { Button } from "@/components/ui/button"
import { Link, Navigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { roomActionCreators, State} from "@/_state";
import { useEffect } from "react";

const RoomsHome = () => {

    //------------------------------------------------------------------------------

    const dispatch = useDispatch();
    const { userInRoom } = bindActionCreators(roomActionCreators, dispatch);

    const state = useSelector((state: State) => state.roomState);
    const { isJoinedRoom, roomCode} = state;

    //------------------------------------------------------------------------------

    const userInRoomRequest = () => {
        try {
            userInRoom();
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {

        userInRoomRequest();

    }, []);

    if (isJoinedRoom) {
        return <Navigate to={`/room/${roomCode}`} />;
    }

    return (
    <div className="sm:w-420 flex-center flex-col">
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
            Kick Off Picks - Quizz Party
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
            Welcome back! Please select what do you want to do.
        </p>
        <div className="flex flex-row m-4">
            <Button type="button" className="shad-button_red m-1">
                <Link className="nav-link" to="/join-room">JOIN A ROOM</Link>
            </Button>

            <Button type="button" className="shad-button_green m-1">
                <Link className="nav-link" to="/create-update-room">CREATE A ROOM</Link>
            </Button>
        </div>

        <Button type="button" className="shad-button_blue w-2/3 m-1">
            <Link className="nav-link" to="/">BACK</Link>
        </Button>
        
    </div>
    )
}

export default RoomsHome;