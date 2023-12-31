import { PrettyChatWindow } from "react-chat-engine-pretty";

import { useSelector} from "react-redux";
import { AuthState} from "@/_state";

import { useState } from "react";

const Chat = () => {

    const state = useSelector((state: AuthState) => state.authState);
    const[ user ] = useState(state.user);


    if(!user) return (<>Loading....</>);

    return (
    <div style={{ height: "100vh", width: "100vw" }}>
        <PrettyChatWindow
        projectId={import.meta.env.VITE_APP_CHAT_ENGINE_PROJECT_ID}
        username={user.email} // adam
        secret={user.password} // pass1234
        style={{ height: "100%" }}
        />
    </div>
    );
};

export default Chat;
