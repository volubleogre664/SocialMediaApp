import "../styles/components/Message.css";

type Props = {
    message: string;
    isMine: boolean;
    timestamp: string;
};

function Message({ message, isMine, timestamp }: Props) {
    return (
        <div className={`message ${!isMine && "received"}`}>
            <p>{message}</p>
            <small>{timestamp}</small>
        </div>
    );
}

export default Message;
