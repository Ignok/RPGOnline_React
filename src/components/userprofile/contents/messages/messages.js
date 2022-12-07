import { useEffect, useState } from "react";
import { useUser } from "../../../../contexts/userContext"
import { getUserMessages, createMessage } from "../../../../services/users";
import { useAsyncFn } from "../../../../hooks/useAsync";
import { DatetimeToLocaleDateString } from "../../../../helpers/functions/DateTimeConverter";
import { Button, ListItem, ListItemIcon, ListItemText, List, ButtonBase } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import MessageItem from "./messageItem";
import SendIcon from '@mui/icons-material/Send'
import MessageForm from "./messageForm";
import Swal from 'sweetalert2'

export default function MessagesContents({ uId }) {
    const [messages, setMessages] = useState();

    const [isCreating, setIsCreating] = useState(false);

    const { loading, error, execute: getUserMessagesFn } = useAsyncFn(getUserMessages)

    const { execute: createMessageFn } = useAsyncFn(createMessage)

    function onMessageCreate({title, content, receiver}) {
        
        return createMessageFn({ senderId: uId, receiver: receiver, title: title, content: content })
                                .then(res =>{
                                    console.log(res);
                                    setIsCreating(false)
                                    Success.fire({
                                        icon: 'success',
                                        title: 'Message sent successfully'
                                      })
                                })
    }
    const Success = Swal.mixin({
        toast: true,
        position: 'bottom-start',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

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
            {
                isCreating ?
                    <MessageForm loading={loading} error={error} onSubmit={onMessageCreate}/>
                    :
                    (
                        <>
                            <Button variant="contained" endIcon={<SendIcon />} onClick={() => setIsCreating(true)}>
                                New message
                            </Button>
                            {messages?.length
                                ? (
                                    <List
                                        sx={{
                                            border: 1,
                                            borderRadius: 0,
                                            borderColor: "var(--accent)",
                                            backgroundColor: "var(--accent-opaque)",
                                            my: 2,
                                            display: "flex",
                                            flexDirection: "column",
                                            py: 3,
                                            px: 10,
                                        }}
                                    >


                                        {messages.map((message) => (
                                            <MessageItem key={message.messageId} message={message} />
                                        ))}
                                    </List>
                                ) : <h1>No messages to display</h1>
                            }
                        </>
                    )
            }


        </article>
    );
}