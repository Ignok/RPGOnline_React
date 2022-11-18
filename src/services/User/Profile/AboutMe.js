import React from 'react';
import { useParams, Link, BrowserRouter, Route, Routes } from "react-router-dom";

import Icon from '../../../components/icons';
import UserProfile from '../../../components/userprofile';
import { getUsersAbout } from '../../../Api_RPGOnline';
import { DatetimeToLocaleDateString } from '../../../helpers/functions/DateTimeConverter';
import { ButtonNav, ButtonNavGroup, EmailText } from '../../../components/userprofile/userprofile';
import ReactDOM from 'react-dom';
//import {createRoot} from 'react-dom/client';
import * as ReactDOMClient from 'react-dom/client';

import AboutMeDetails from './AboutMeDetails';


const withRouter = WrappedComponent => props => {
    const params = useParams();

    return (
        <WrappedComponent
            {...props}
            params={params}
        />
    );
};

class AboutMe extends React.Component {


    constructor(props) {
        super(props);

        const uId = this.props.params.uId;

        console.log(uId);

        this.state = {
            uId: uId,
            user: [],
            error: null,
            isLoaded: false,
            message: null
        }
    }


    refreshPage() {
        getUsersAbout(this.state.uId)
            .then(response => response.json())
            .then(
                (data) => {
                    this.setState({
                        user: data,
                        isLoaded: true
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    })
                }
            );
    }

    componentDidMount() {
        this.refreshPage();
    }



    render() {
        const { user } = this.state;
        console.log(user);
        return (
            <div className="">
                <UserProfile>
                    {/* <UserProfile.Title>Profile</UserProfile.Title> */}
                    <UserProfile.Wrapper>
                        <UserProfile.Row>

                            <UserProfile.LeftColumn>
                                {/* <UserProfile.Row> */}
                                <UserProfile.ProfilePictureContainer>
                                    <UserProfile.Image
                                        src={require("../../../helpers/pictures/anonymous_user.png")}
                                        alt="anonymous_user"
                                    />
                                    <UserProfile.Flag
                                        src={require("../../../helpers/pictures/poland_flag.png")}
                                        alt="flag"
                                    />

                                </UserProfile.ProfilePictureContainer>
                                {/* </UserProfile.Row> */}
                                {/* <UserProfile.Row> */}
                                <UserProfile.EmailText>{user.email}</UserProfile.EmailText>
                                {/* </UserProfile.Row> */}
                                {/* <UserProfile.Row> */}
                                <UserProfile.ButtonNavGroup>
                                    <UserProfile.ButtonNav className='navigation-button' href={`/aboutme/details/${user.uId}`}><Icon className="fa-solid fa-user" />About me</UserProfile.ButtonNav>
                                    <UserProfile.ButtonNav className='navigation-button' href='#'><Icon className="fa-solid fa-users" />Friends</UserProfile.ButtonNav>
                                    <UserProfile.ButtonNav className='navigation-button' href='#'><Icon className="fa-solid fa-trophy" />Achievements</UserProfile.ButtonNav>
                                    <UserProfile.ButtonNav className='navigation-button' href='#'><Icon className="fa-solid fa-chart-simple" />Statistics</UserProfile.ButtonNav>
                                    <UserProfile.ButtonNav className='navigation-button' href='#'><Icon className="fa-solid fa-envelope" />Messages</UserProfile.ButtonNav>
                                    <UserProfile.ButtonNav className='navigation-button' href='#'><Icon className="fa-solid fa-bookmark" />Saved</UserProfile.ButtonNav>
                                    <UserProfile.ButtonNav className='navigation-button' href='#'><Icon className="fa-solid fa-gear" />Settings</UserProfile.ButtonNav>
                                </UserProfile.ButtonNavGroup>
                                {/* </UserProfile.Row> */}
                            </UserProfile.LeftColumn>

                            <UserProfile.RightColumn>
                                {/* <UserProfile.Row> */}
                                <UserProfile.Username>{user.username}</UserProfile.Username>
                                <UserProfile.CreationDate>User since: {DatetimeToLocaleDateString(user.creationDate)}</UserProfile.CreationDate>
                                {/* </UserProfile.Row> */}
                                {/* <UserProfile.Row> */}
                                Tytuł nawigacji
                                {/* </UserProfile.Row> */}
                                {/* <UserProfile.Row> */}
                                {/* <div id="profile-option">
                                    <Route path='/aboutme/details/:uId' component={<AboutMeDetails />} />
                                </div> */}
                                <table>
                                    <thead>
                                        <tr>
                                            <th>User ID</th>
                                            <th>E-mail</th>
                                            <th>Country</th>
                                            <th>City</th>
                                            <th>AboutMe</th>
                                            <th>Attitude</th>
                                            <th>Creation date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* <tr key={user.uId}> */}
                                        <td>{user.uId}</td>
                                        <td>{user.email}</td>
                                        <td>{user.country}</td>
                                        <td>{user.city}</td>
                                        <td>{user.aboutMe}</td>
                                        <td>{user.attitude}</td>
                                        <td>{DatetimeToLocaleDateString(user.creationDate)}</td>
                                        {/* </tr>         */}
                                    </tbody>
                                </table>
                                {/* </UserProfile.Row> */}
                            </UserProfile.RightColumn>

                        </UserProfile.Row>
                    </UserProfile.Wrapper>
                </UserProfile>
            </div>
        )
        // const {user}=this.state;
        // return(
        //     <div>
        //         <div className='block'>
        //             {/* <Table className='mt-4' striped bordered hover size='sm'> */}
        // <table>
        //     <thead>
        //         <tr>
        //             <th>User ID</th>
        //             <th>E-mail</th>
        //             <th>Country</th>
        //             <th>City</th>
        //             <th>AboutMe</th>
        //             <th>Attitude</th>
        //             <th>Creation date</th>
        //         </tr>
        //     </thead>
        //     <tbody>
        //         {/* <tr key={user.uId}> */}
        //             <td>{user.uId}</td>
        //             <td>{user.email}</td>
        //             <td>{user.country}</td>
        //             <td>{user.city}</td>
        //             <td>{user.aboutMe}</td>
        //             <td>{user.attitude}</td>
        //             <td>{DatetimeToLocaleDateString(user.creationDate)}</td>
        //         {/* </tr>         */}
        //     </tbody>
        // </table>
        //             {/* </Table> */}
        //             <Link to='/users'>
        //                 <button className='button-back' type="button">Back</button>
        //             </Link>
        //         </div>
        //     </div>
        // )
    }
}

function changeOption(params) {
    const field = ReactDOM.createRoot(
        document.getElementById('profile-option')
    );

    field.render(params);
}

export default withRouter(AboutMe);