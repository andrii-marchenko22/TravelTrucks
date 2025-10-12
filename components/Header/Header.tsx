import Link from 'next/link';
import css from './Header.module.css';
import Logo from '../../public/TravelTrucks.svg';
import Image from 'next/image';

const Header = () => {
  return (
    <header className={css.header}>
      <Link href={'/'}>
        <Image src={Logo} alt="TravelTrucks Logo" width={136} height={16} />
      </Link>
      <nav className={css.navigation} aria-label="Main navigation">
        <ul className={css.navList}>
          <li>
            <Link href={'/'} className={css.navigationLink}>
              Home
            </Link>
          </li>
          <li>
            <Link href={'/catalog'} className={css.navigationLink}>
              Catalog
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
