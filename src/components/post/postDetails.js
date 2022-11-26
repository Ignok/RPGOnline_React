import React from 'react';
import { useParams, Link, BrowserRouter, Route, Routes } from "react-router-dom";

// import Icon from '../../../components/icons';
// import UserProfile from '../../../components/userprofile';
// import { getUsersAbout } from '../../../Api_RPGOnline';
// import { DatetimeToLocaleDateString } from '../../../helpers/functions/DateTimeConverter';
// import { ButtonNav, ButtonNavGroup, EmailText } from '../../../components/userprofile/userprofile';
import ReactDOM from 'react-dom';
//import {createRoot} from 'react-dom/client';
import * as ReactDOMClient from 'react-dom/client';

// import AboutMeDetails from './AboutMeDetails';

// import UserMenu from '../../../components/userprofile/userMenu';
// import UserHeading from '../../../components/userprofile/userHeading';
// import {
//   SelectCountry,
//   SelectAttitude,
// } from "../../../components/userprofile/aboutme/selects";
// import CityAboutmeTextField from '../../../components/userprofile/aboutme/inputs';


const withRouter = WrappedComponent => props => {
    const params = useParams();

    return (
        <WrappedComponent
            {...props}
            params={params}
        />
    );
};

export default function PostDetails() {



    return (
        <div>
            <h1>POST TU JEST</h1>
        </div>
    );
}