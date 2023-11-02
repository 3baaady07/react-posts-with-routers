import { Outlet } from 'react-router-dom';
import Nav from './Nav';
import Header from './Header';
import Footer from './Footer';


const Layout = () =>
{

   return (
      <>
         <Header title={"React JS Blog"} />
         <Nav />
         <Outlet />
         <Footer />
      </>
   )
}

export default Layout;