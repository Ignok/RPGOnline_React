import React, {Component} from 'react';
import { ButtonToolbar } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

import { getUsers } from './Api_RPGOnline';



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
                    <img src="/Pictures/anonymous_user.png" alt="anonymous_user" width="50" height="50" loading="lazy"/>
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
                                    <td>{(users.picture === null ? <img src="./Pictures/anonymous_user.png" alt="anonymous_user" width="50" height="50" loading="lazy"/> : users.picture)}</td>
                                    <td>
                                        <ButtonToolbar>
                                            <Button variant='info'
                                            onClick={() => this.setState({addModalShow:true})}>
                                                Show Details
                                            </Button>
                                        </ButtonToolbar>
                                    </td>
                                </tr>
                                )}
                        </tbody>
                    </table>
                    <button className='button-add' type="button"
                        onClick={() => this.setState({addModalShow:true})}>
                        Add new user
                    </button>
                    {/* </Table> */}
                </div>
        )
    }
}