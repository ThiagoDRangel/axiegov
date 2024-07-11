import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Search from "../../components/Search";
import { FooterProvider } from "../../contexts/FooterContext";

function Home () {
  return (
    <FooterProvider>
        <Header />
        <Search />
        <Footer />
    </FooterProvider>
  );
}

export default Home;
