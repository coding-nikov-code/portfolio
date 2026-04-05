import './Header.css';
import ProximityText from './ProximityText';

function Header() {
  return (
    <header className="header">
      <h1 className="header__name">
        <ProximityText>Mischa Nikov</ProximityText>
      </h1>
    </header>
  );
}

export default Header;
