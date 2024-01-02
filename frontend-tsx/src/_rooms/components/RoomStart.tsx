import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

const RoomStart = () => {
    
    return (
    <div className="flex flex-center flex-col">
        <h2 className="text-lg text-center font-bold">
            Welcome back! Room not started yet, waiting for the host to start it... 
        </h2>

        <h2 className="text-base text-center">
            Meanwhile, you can chat with the other players: 
        </h2>

        <div className="flex flex-row mt-2">
            
            <Button type="button" className="shad-button_blue m-1">
                <Link className="nav-link" to="/">HOME</Link>
            </Button>
            
            <Button type="button" className="shad-button_orange m-1">
                <Link className="nav-link" to="/chat">CHAT</Link>
            </Button>

        </div>  
    </div>
    )
}

export default RoomStart