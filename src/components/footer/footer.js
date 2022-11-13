
import styled from 'styled-components';
import '../../App.css'

export const Container = styled.div`
    padding: 60px 60px;
    margin-top: auto;
    background: radial-gradient(circle, #b172e1  0%, #a877e9 100%);

    @media (max-width: 1000px) {
        padding: 70px 30px;
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
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
    grid-gap: 20px;

    @media (max-width: 1000px) {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    }
`;

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
    margin-left: 60px;
`;

export const Link = styled.a`
    color: var(--bg);
    margin-bottom: 10px;
    font-size: 15px;
    text-decoration: none;

    &:hover {
        color: var(--accent-light);
        transition: 200ms ease-in;
    }
`;

export const Title = styled.p`
    font-size: 22px;
    color: #fff;
    margin-bottom: 15px;
    font-weight: bold;
`;


// import Bell from '../../Pictures/bell.svg';

// export class Footer extends Component{

//     render(){
//         return(
//             <footer>
//                 <img src={Bell} alt="React Logo" />
//                 {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bell" viewBox="0 0 16 16">
//                     <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"/>
//                 </svg> */}
//                 &copy;2022 Bok&Akahori
//             </footer>
//         )
//     }
// }