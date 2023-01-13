import { Outlet } from "react-router-dom";
import { FooterContainer } from "../containers/footer";
import Navigation from "../containers/navigation";

const Layout = () => {
    return (
        <main className="App">
            <div className="container">
                <div className="titleheader">
                    <h1>
                        Nice Dice
                        <span>PLAY RPG ONLINE</span>
                    </h1>
                </div>
                <Navigation />
                <Outlet />
                <FooterContainer />
            </div>
        </main>
    )
}

export default Layout