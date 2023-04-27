import Footer from '../Footer/Footer';
import NavBar from '../NavBar/NavBar';

const Layout = ({ children }: any) => {
  return (
    <>
      <NavBar />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
