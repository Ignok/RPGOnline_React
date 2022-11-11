import React, {Component} from 'react';
import { ButtonToolbar } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

import { getUsers } from '../Api_RPGOnline';

// const withRouter = WrappedComponent => props => {
//     const pathname = useLocation();

//     return (
//         <WrappedComponent
//             {...props}
//             pathname={pathname}
//             //notice={props.notice}
//         />
//     );
// }

export class Users extends Component{

    constructor(props){
        super(props);
        this.state={users:[]}
    }

    refreshList(){
        getUsers()
        .then(response=>response.json())
        .then(data=>{
            this.setState({users:data});
            console.log(data);
        });
    }

    componentDidMount(){
        this.refreshList();
    }
    

    render(){
        const {users}=this.state;
        return(
                <div>
                    {/* <Table className='mt-4' striped bordered hover size='sm'> */}
                    <table>
                        <thead>
                            <tr>
                                <th>User ID</th>
                                <th>Username</th>
                                <th>Picture</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(users=>
                                <tr key={users.uId}>
                                    <td>{users.uId}</td>
                                    <td>{users.username}</td>
                                    <td>{(users.picture === null ? <img src={require("../Pictures/anonymous_user.png")} alt="anonymous_user" width="50" height="50" loading="lazy"/> : users.picture)}</td>
                                    <td>
                                        <div>
                                            <Link to={`/aboutme/${users.uId}`}>
                                                <button className='button-show-details' type="button">Details</button>
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                                )}
                        </tbody>
                    </table>
                    <button className='button-add' type="button">
                        Add new user
                    </button>
                    {/* </Table> */}
                </div>
        )
    }
}