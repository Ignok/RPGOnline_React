import React from "react";
import { login } from "../../Api_RPGOnline";


export class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            focused: false,
            value: {
                Login: '',
                Password: ''
            },
            errors: {
                LoginError: '',
                PasswordError: ''
            }
        };
    }

    handleChange = (event) => {
        const { name, value } = event.target
        const data = { ...this.state.value }
        console.log(data)
        data[name] = value

        // const errorMessage = this.validateField(name, value)
        // const errors = {...this.state.errors}
        // errors[name] = errorMessage

        this.setState({
            value: data,
            errors: []
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const data = this.state.value;
        console.log(data);
        let response;
        let promise;
        promise = login(data);
        if (promise) {
            promise
                .then(res => {
                    console.log(res)
                    response = res
                    return res.json()
                })
                .then(
                    (data) => {
                        console.log(data)
                        if (response.status === 500) {

                        }
                        if (response.status === 200) {
                            const userString = JSON.stringify(data);
                            console.log("ta");
                            console.log(userString);
                        }
                    },
                    (error) => {
                        this.setState({
                            error: error
                        })
                    })
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>

                <div>
                    <label>
                        Login
                    </label>
                    <input name="Login" id="Login" type="text" value={this.state.value.Login} onChange={this.handleChange} placeholder="HERE" />

                    <span id="LoginErrorId">{this.state.errors.LoginError}</span>

                    <label>
                        Password
                    </label>
                    <input name="Password" id="Password" type="password" value={this.state.value.Password} placeholder="" onChange={this.handleChange} />
                    <span id="PasswordErrorId">{this.state.errors.LoginError}</span>

                </div>
                <div>
                    <button type="submit">
                        Confirm
                    </button>
                </div>

            </form>
        );
    }
}

