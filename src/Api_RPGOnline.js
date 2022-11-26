const RPGONLINE_API= 'https://localhost:7251/api/';

export function getUsers() {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
            //'Authorization': 'Bearer ' + token
        }
    }
    return fetch(RPGONLINE_API+'Users', options);
}

export function getUsersAbout(id) {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
            //'Authorization': 'Bearer ' + token
        }
    }
    return fetch(RPGONLINE_API+'Users/'+id, options);
}

export function addUser() {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            //'Authorization': 'Bearer ' + token
        }
    }
    return fetch(RPGONLINE_API+'Users', options);
}

export function login(data){
    const jsonLogin = JSON.stringify(data);
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonLogin
    }
    return fetch(RPGONLINE_API+'Account/login', options);
}

export function register(data){
    const jsonRegister = JSON.stringify(data);
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonRegister
    }
    return fetch(RPGONLINE_API+'Account/register', options);
}



export function getPostsDetails(id) {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      //'Authorization': 'Bearer ' + token
    },
  };
  return fetch(RPGONLINE_API + "Posts/" + id, options);
}