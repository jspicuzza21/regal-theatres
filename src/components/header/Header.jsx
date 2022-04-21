import logo from '../../assets/logo.svg';
import './header.css'

function Header() {
  return (
    <div className="header">
        <img src={logo} className="logo" alt="Regal Cinemas" />
    </div>
  );
}

export default Header;
