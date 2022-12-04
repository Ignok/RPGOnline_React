import { useEffect, useState } from "react";
import { useUser } from "../../../../contexts/userContext"
import { getUserFriends } from "../../../../services/users";
import { useAsyncFn } from "../../../../hooks/useAsync";
import FriendsMenu from "./menu";

export default function UserFriendsContents({uId}) {
    const [friends, setFriends] = useState();

    const { loading, error, execute: getUserFriendsFn } = useAsyncFn(getUserFriends)
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

        getUserFriendsFn(uId).then(data => {
            console.log(data)
            isMounted && setFriends(data)
        })

        return () => {
            isMounted = false;
            //controller.abort();
        }
    }, [])

    return (
        <article>
            <FriendsMenu/>
            {friends?.length
                ? (
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th>User ID</th>
                                    <th>Username</th>
                                    <th>Picture</th>
                                </tr>
                            </thead>
                            <tbody>
                                {friends.map((friends) => (
                                    <tr key={friends.uId}>
                                        <td>{friends.uId}</td>
                                        <td>{friends.username}</td>
                                        <td>
                                            {friends.picture === null ? (
                                                <img
                                                    src={require("../../../../helpers/pictures/anonymous_user.png")}
                                                    alt="anonymous_user"
                                                    width="50"
                                                    height="50"
                                                    loading="lazy"
                                                />
                                            ) : (
                                                friends.picture
                                            )}
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