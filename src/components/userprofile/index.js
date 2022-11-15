import React from 'react';
import { Container, Wrapper, Row, LeftColumn, RightColumn, Link, Title, Username, CreationDate, ProfilePictureContainer, Image, Flag, EmailText, ButtonNavGroup, ButtonNav } from './userprofile';

export default function UserProfile({ children, ...restProps }) {
    return <Container {...restProps}>{children}</Container>
}

UserProfile.Wrapper = function UserProfileWrapper({ children, ...restProps }) {
    return <Wrapper {...restProps}>{children}</Wrapper>
}

UserProfile.Row = function UserProfileRow({ children, ...restProps }) {
    return <Row {...restProps}>{children}</Row>
}

UserProfile.LeftColumn = function UserProfileLeftColumn({ children, ...restProps }) {
    return <LeftColumn {...restProps}>{children}</LeftColumn>
}

UserProfile.RightColumn = function UserProfileRightColumn({ children, ...restProps }) {
    return <RightColumn {...restProps}>{children}</RightColumn>
}

UserProfile.Link = function UserProfileLink({ children, ...restProps }) {
    return <Link {...restProps}>{children}</Link>
}

UserProfile.Title = function UserProfileTitle({ children, ...restProps }) {
    return <Title {...restProps}>{children}</Title>
}

//Username i creationDate
UserProfile.Username = function UserProfileUsername({ children, ...restProps }) {
    return <Username {...restProps}>{children}</Username>
}
UserProfile.CreationDate = function UserProfileCreationDate({ children, ...restProps }) {
    return <CreationDate {...restProps}>{children}</CreationDate>
}

//Zdjęcie profilowe
UserProfile.ProfilePictureContainer = function UserProfilePictureContainer({ children, ...restProps }) {
    return <ProfilePictureContainer {...restProps}>{children}</ProfilePictureContainer>
}

UserProfile.Image = function UserProfileImage({ children, ...restProps }) {
    return <Image {...restProps}>{children}</Image>
}

UserProfile.Flag = function UserProfileFlag({ children, ...restProps }) {
    return <Flag {...restProps}>{children}</Flag>
}

//Email text
UserProfile.EmailText = function UserProfileEmailText({ children, ...restProps }) {
    return <EmailText {...restProps}>{children}</EmailText>
}

//Przyciski nawigacja
UserProfile.ButtonNavGroup = function UserProfileButtonNavGroup({ children, ...restProps }) {
    return <ButtonNavGroup {...restProps}>{children}</ButtonNavGroup>
}

UserProfile.ButtonNav = function UserProfileButtonNav({ children, ...restProps }) {
    return <ButtonNav {...restProps}>{children}</ButtonNav>
}