import BrandLogo from './BrandLogo';
import s from './Header.module.css';

function Header() {
    return (
        <header className={s.header} role="banner">
            <div className={s.inner}>
                <div className={s.search}>
                    <form aria-label="Search" className={s.searchbar} role="search">
                        <div className={s.seg}>
                            <svg height="17" viewBox="0 0 50 50" width="17" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M6.3,37.4c4.3,4.3,9.9,6.4,15.5,6.4c4.9,0,9.9-1.7,13.9-5L47.1,50l3-3L38.7,35.8c7.1-8.6,6.6-21.4-1.4-29.4c-8.5-8.5-22.5-8.5-31,0C-2.2,15-2.2,28.9,6.3,37.4z M9.3,9.4c3.4-3.5,8-5.2,12.5-5.2s9,1.7,12.5,5.2c6.9,6.9,6.9,18.1,0,25s-18.1,6.9-25,0S2.4,16.3,9.3,9.4z"/>
                            </svg>
                            <label className="visually-hidden" htmlFor="qtop">
                                Search for experiences and places
                            </label>
                            <input
                                autoComplete="off"
                                id="qtop"
                                name="q"
                                placeholder="Search for experiences and places"
                                type="search"
                            />
                        </div>
                    </form>
                </div>

                <nav aria-label="Main navigation" className={s.nav}>
                    <a href="#">Gift</a>
                    <a href="#">Help</a>
                </nav>

                <div aria-hidden="true" className={s.brandWrap}>
                    <BrandLogo/>
                </div>
            </div>
        </header>
    );
}

export default Header;
