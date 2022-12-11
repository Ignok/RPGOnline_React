import React, { useEffect, useState } from 'react';

import { getUsers } from '../users';
import { useAsyncFn } from '../../hooks/useAsync';
import { Link } from 'react-router-dom';

import useRefreshToken from '../../hooks/useRefreshToken';

import { getImage } from '../../helpers/functions/getImage';

export function UsersList() {
  const [users, setUsers] = useState();

  const refreshToken = useRefreshToken();

  const { loading, error, execute: getUsersFn } = useAsyncFn(getUsers)
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
    const controller = new AbortController();

    getUsersFn({ controller }).then(data => {
      isMounted && setUsers(data)
    })

    return () => {
      isMounted = false;
      controller.abort();
    }
  }, [])

  return (
    <article>
      <h1>Users List</h1>
      {users?.length ? (
        <div>
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
              {users.map((users) => (
                <tr key={users.uId}>
                  <td>{users.uId}</td>
                  <td>{users.username}</td>
                  <td>
                    <img
                      src={getImage(users.picture).img}
                      alt="anonymous_user"
                      width="50"
                      height="50"
                      loading="lazy"
                    />
                  </td>
                  <td>
                    <div>
                      <Link to={`/aboutme/${users.uId}`}>
                        <button className="button-show-details" type="button">
                          Details
                        </button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            className="button-add"
            type="button"
            onClick={() => refreshToken()}
          >
            Refresh token
          </button>
        </div>
      ) : (
        <h1>No users to display</h1>
      )}
    </article>

    // <div>
    //   {/* <Table className='mt-4' striped bordered hover size='sm'> */}
    // <table>
    //   <thead>
    //     <tr>
    //       <th>User ID</th>
    //       <th>Username</th>
    //       <th>Picture</th>
    //       <th>Actions</th>
    //     </tr>
    //   </thead>
    //   <tbody>
    //     {users.map((users) => (
    //       <tr key={users.uId}>
    //         <td>{users.uId}</td>
    //         <td>{users.username}</td>
    //         <td>
    //           {users.picture === null ? (
    //             <img
    //               src={require("../../helpers/pictures/anonymous_user.png")}
    //               alt="anonymous_user"
    //               width="50"
    //               height="50"
    //               loading="lazy"
    //             />
    //           ) : (
    //             users.picture
    //           )}
    //         </td>
    //         <td>
    //           <div>
    //             <Link to={`/aboutme/${users.uId}`}>
    //               <button
    //                 className="button-show-details"
    //                 type="button"
    //               >
    //                 Details
    //               </button>
    //             </Link>
    //           </div>
    //         </td>
    //       </tr>
    //     ))}
    //   </tbody>
    // </table>
    //   <button className="button-add" type="button">
    //     Add new user
    //   </button>
    //   {/* </Table> */}
    // </div>
  );
}
