import * as signalR from "@microsoft/signalr";

const URL = process.env.HUB_ADDRESS ?? "https://localhost:7285/chat";

class Connector {

    private connection: signalR.HubConnection;
    public events: (onMessageReceived: (username: string, message: string) => void) => void;
    static instance: Connector;

    constructor(user_id: string) {

        this.connection = new signalR.HubConnectionBuilder()
            .withUrl(URL, {accessTokenFactory : () => user_id})
            .withAutomaticReconnect()
            .build(); //initializes instance of Connection to Chat Hub

        this.connection.start().then(() => {
            this.connection.send("MapConnectionID", "DummyUserId").then(x => console.log("ConnectionId Mapped"));
        }).catch(err => document.write(err)); // starts a connection with the chathub

        this.connection.on("send", function (username,message) {
            console.log(message);
        });

        this.events = (onMessageReceived) => {
            this.connection.on("messageReceived", (username, message) => {
                console.log("From onMessageReceived: ");
                console.log(username)
                console.log(message);
                onMessageReceived(username, message);
            });
        }; // Listens for a message from Chat Hub
    }
    public MapConnectionId = () => {
        this.connection.send("MapConnectionID", "DummyUserId");
    }

    public newMessage = (messages: string, user_id: string) => {
        this.connection.send("NewMessage", "414fed45-e2a5-4643-a0ad-367aa0ced2a7", messages).then(x => console.log("sent"))
    }

    public JoinGroup = (messages: string, groupName: string) => {
        this.connection.send("JoinGroup", "This Is Your GroupName").then(x => console.log("Group Created"));
    }
    //Sends a message to the ChatHub

    public static getInstance(user_id: string): Connector {
        if (!Connector.instance)
            Connector.instance = new Connector(user_id);
        return Connector.instance;
    } //Returns a static instance of the Connector class to ensure only one instance
}
export default Connector.getInstance;