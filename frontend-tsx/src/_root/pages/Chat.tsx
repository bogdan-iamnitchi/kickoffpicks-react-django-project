import { PrettyChatWindow } from "react-chat-engine-pretty";

interface ChatProps {
    email: string;
    secret: string;
  }

const Chat: React.FC<ChatProps> = ({email, secret}) => {

    return (
        <div style={{ height: "100vh", width: "100vw" }}>
            <PrettyChatWindow
            projectId={import.meta.env.VITE_APP_CHAT_ENGINE_PROJECT_ID}
            username={email}
            secret={secret}
            style={{ height: "100%" }}
            />
        </div>
    );
};

export default Chat;
