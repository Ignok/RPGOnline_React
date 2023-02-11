
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
  color: var(--bg);
  margin-bottom: 15px;
  font-weight: bold;
`;
