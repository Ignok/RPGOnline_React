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