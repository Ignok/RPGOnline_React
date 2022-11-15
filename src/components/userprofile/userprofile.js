import styled from 'styled-components';
import '../../App.css'

export const Container = styled.div`
    padding: 40px 0px;
    margin-top: auto;
    margin-bottom: 50px;
    background: blue;

    @media (max-width: 1000px) {
        padding: 30px 30px;
    }
`;

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 100%;
    margin: 0 auto;
`;

export const Row = styled.div`
    display: flex;
    grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
    grid-gap: 20px;

    @media (max-width: 1000px) {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    }
`;

export const LeftColumn = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
    margin-left: 10px;
`;

export const RightColumn = styled.div`
background-color:red;
width: 100%;
    display: flex;
    flex-direction: column;
    text-align: left;
    margin-left: 100px;
    margin-right: 10px;
    width: auto;
    //grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));

`;

export const Link = styled.a`
    // color: var(--bg);
    // margin-bottom: 10px;
    // font-size: 15px;
    // text-decoration: none;

    // &:hover {
    //     color: var(--accent-light);
    //     transition: 200ms ease-in;
    // }
`;

export const Title = styled.p`
  font-size: 22px;
  color: var(--accent-dark);
  margin-bottom: 15px;
  font-weight: bold;
`;

//Zdjęcie profilowe
export const ProfilePictureContainer = styled.div`
display: flex;
  justify-content: center;
  position: relative;
  border-radius: 4px;
  padding: 5px;
  min-width: 300px;
  width: auto;
  height: auto;
  margin-bottom: 20px;
`;

export const Image = styled.img`
border: 2px solid #5600FF;
  position: relative;
  top: 0;
  left: 0;
  width: auto;
  height: auto;
`;

export const Flag = styled.img`
  position: absolute;
  opacity: 1;
  bottom: -15px;
  right: 60px;
  width: 40px;
  height: 40px;
`;

//Email
export const EmailText = styled.p`
  font-family: 'Courier New';
  font-size: 1rem;
  min-width: 300px;
  width: auto;
  height: auto;
  font-weight: bold;
  line-height: 2;
  color: var(bg);
  text-align: center;
`;

//Przyciski nawigacja
export const ButtonNavGroup = styled.div`
  position:relative;
  min-width: 300px;
  width: auto;
  height: auto;
  margin-top: 10px;
  margin-bottom: 50px;
`;

export const ButtonNav = styled.a`
  display:block;
  border-radius: 0;
  border: 1px solid #5600FF;
  width: 100%;
  height: 50hv;
  margin-top: 0;
  margin-bottom: 0;
  
  background: #7E7AFF;
  color: var(--bg);

&:hover {
    color: var(--accent-dark);
    transition: 200ms ease-in;
}

//text
  text-decoration: none;
  font-family: 'quinque';
  font-size: 0.70rem;
  font-weight: bold;
  line-height: 1;
  padding: 1rem 1rem;
  text-align: left;
`;


//Username and creation date

export const Username = styled.p`
  text-decoration: none;
  font-family: 'quinque';
  font-size: 1rem;
  font-weight: bold;
  line-height: 2;
  min-width: 100%;
  padding: 1rem 1rem;
  color: var(bg);
  text-align: left;
`;

export const CreationDate = styled.p`
  font-family: 'Courier New';
  font-size: 1rem;
  min-width: 300px;
  width: auto;
  height: auto;
  font-weight: bold;
  line-height: 0;
  color: var(bg);
  text-align: left;
`;