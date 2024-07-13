import { useState } from 'react';
import { useFooter } from '../../hooks/useFooter';
import iconCopy from '../../assets/icon-copy.png';
import './styles.css';

function Footer() {
    const { isFooterVisible } = useFooter();
    const [isCopied, setIsCopied] = useState(false);

    const copyToClipboard = () => {
        const code = "594QQ6DQ";
        navigator.clipboard.writeText(code).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 1000);
        }).catch((err) => {
            console.error('Error copying text: ', err);
        });
    };

    return (
        <footer className={`footer ${isFooterVisible ? '' : 'hidden'}`}>
            <p className="footer-title">© 2024 ThiagoDRangel. All rights reserved.</p>
            <div className="container-copy">
                <p>Use Lunacian code: 594QQ6DQ</p>
                <div onClick={copyToClipboard} className="copy-icon">
                    <img
                        alt="copy lunacian code"
                        className="img-icon"
                        src={iconCopy}
                    />
                    {isCopied && <span className="copied-message">copied!</span>}
                </div>
            </div>
        </footer>
    );
}

export default Footer;
