import * as signalR from "@microsoft/signalr";

const URL = process.env.HUB_ADDRESS ?? "https://localhost:7285/chat";

class Connector {

    private connection: signalR.HubConnection;
    public events: (onMessageReceived: (message: string) => void) => void;
    static instance: Connector;

    constructor() {

        this.connection = new signalR.HubConnectionBuilder()
            .withUrl(URL)
            .withAutomaticReconnect()
            .build(); //initializes instance of Connection to Chat Hub

        this.connection.start().catch(err => document.write(err));
/*
        this.connection.start().then(() => {
            this.connection.send("MapConnectionID", "DummyUserId").then(x => console.log("ConnectionId Mapped"));
        }).catch(err => document.write(err)); // starts a connection with the chathub*/

/*        this.connection.on("Send", function (message) {
            console.log(message);
        });
*/
        this.events = (onMessageReceived) => {
            this.connection.on("Send", (message) => {
                console.log("From Send Message"+message);
                onMessageReceived(message);
            });
        }; // Listens for a message from Chat Hub
    }
/*    public MapConnectionId = () => {
        this.connection.send("MapConnectionID", "DummyUserId");
    }*/

    public newMessage = (messages: string, groupName: string) => {
        this.connection.send("SendToGroup", groupName, messages);
    }

    public JoinGroup = (groupName: string) => {
        this.connection.send("JoinGroup", groupName).then(x => console.log("groupjoined:" + groupName));
    }
    //Sends a message to the ChatHub

    public static getInstance(): Connector {
        if (!Connector.instance)
            Connector.instance = new Connector();
        return Connector.instance;
    } //Returns a static instance of the Connector class to ensure only one instance
}
export default Connector.getInstance;