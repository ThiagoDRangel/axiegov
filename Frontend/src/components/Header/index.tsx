import icon from '../../assets/icon_ronin.png';
import ConnectRoninWalletButton from '../ConnectWallet';
import './styles.css';


function Header () {

  return (
    <header className="container-header">
        <div className="container-icon">
          <img
            alt="ronin"
            className="icon-ronin"
            src={icon}
          />
          <h1 className="title">Ronin Graphics</h1>
        </div>
        <div>
          <ConnectRoninWalletButton onConnected={() => {}} />
        </div>
    </header>
  );
}

export default Header;
