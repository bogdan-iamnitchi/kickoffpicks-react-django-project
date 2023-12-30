import { PrettyChatWindow } from "react-chat-engine-pretty";

import { useDispatch, useSelector} from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators, AuthState} from "@/_state";

import { useState, useEffect } from "react";

const Chat = () => {

    const dispatch = useDispatch();
    const { load_user } = bindActionCreators(actionCreators, dispatch);

    const state = useSelector((state: AuthState) => state.authState);
    const[ user ] = useState(state.user);

    useEffect(() => {

        load_user();
        
      }, []);

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
