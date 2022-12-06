import { useEffect, useState } from "react";
import { useUser } from "../../../../contexts/userContext"
import { getUserMessages } from "../../../../services/users";
import { useAsyncFn } from "../../../../hooks/useAsync";
import { DatetimeToLocaleDateString } from "../../../../helpers/functions/DateTimeConverter";
import { Button } from "@mui/material";

export default function MessagesContents({uId}) {
    const [messages, setMessages] = useState();

    const { loading, error, execute: getUserMessagesFn } = useAsyncFn(getUserMessages)
    // refreshList(){
    //     getUsers()
    //     .then(response=>response.json())
    //     .then(data=>{
    //         this.setState({users:data});
    //         console.log(data);
    //     });
    // }

    // componentDidMount(){
    //     this.refreshList();
    // }

    useEffect(() => {
        let isMounted = true;
        //const controller = new AbortController();

        getUserMessagesFn(uId).then(data => {
            console.log(data)
            isMounted && setMessages(data)
        })

        return () => {
            isMounted = false;
            //controller.abort();
        }
    }, [])

    return (
        <article>
            <h1>Messages</h1>
            {messages?.length
                ? (
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Sender username</th>
                                    <th>Title</th>
                                    <th>Send date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {messages.map((message) => (
                                    <tr key={message.messageId}>
                                        <td>{message.senderUsername}</td>
                                        <td>{message.title}</td>
                                        <td>{DatetimeToLocaleDateString(message.sendDate)}</td>
                                        <td>
                                            <Button>Show</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : <h1>No friends to display</h1>
            }
        </article>
    );
}