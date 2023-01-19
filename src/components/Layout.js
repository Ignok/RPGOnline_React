import { Outlet } from "react-router-dom";
import { FooterContainer } from "../containers/footer";
import Navigation from "../containers/navigation";

const Layout = () => {
  
  return (
    <>
      <Navigation />
      <main className="App">
        <div className="container">
          <Outlet />
        </div>
      </main>
      <FooterContainer />
    </>
  );
};

export default Layout;
