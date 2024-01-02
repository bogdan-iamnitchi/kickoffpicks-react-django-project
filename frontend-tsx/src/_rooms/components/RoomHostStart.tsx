import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

const RoomHomeStart = () => {
    
    const startPressed = () => {
        console.log("start pressed");
    }

    return (
    <div className="flex flex-center flex-col">
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

        <div className="flex flex-row mt-2">
            
            <Button type="button" className="shad-button_blue m-1">
                <Link className="nav-link" to="/">HOME</Link>
            </Button>

            <Button type="button" className="shad-button_orange m-1">
                <Link className="nav-link" to="/chat">CHAT</Link>
            </Button>
            
            <Button type="button" className="shad-button_green m-1" onClick={startPressed}>
                START
            </Button>

        </div>  
    </div>
    )
}

export default RoomHomeStart