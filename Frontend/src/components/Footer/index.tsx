import { useFooter } from '../../hooks/useFooter';
import './styles.css';


function Footer () {
    const { isFooterVisible } = useFooter();

    return (
        <footer className={`footer ${isFooterVisible ? '' : 'hidden'}`}>
            <p>© 2024 ThiagoDRangel. All rights reserved.</p>
        </footer>
    );
}

export default Footer;
