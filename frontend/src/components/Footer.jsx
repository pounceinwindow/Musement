import BrandLogo from './BrandLogo';
import s from './Footer.module.css';

function Footer() {
    return (
        <footer className={s.footer}>
            <div className={s.inner}>
                <div className={s.topbar}>
                    <div className={s.follow}>
                        <span>Follow us</span>
                        <a href="#"><img alt="Facebook" className={s.ico} src="/img/facebook.svg"/></a>
                        <a href="#"><img alt="X" className={s.ico} src="/img/twitter.svg"/></a>
                        <a href="#"><img alt="Instagram" className={s.ico} src="/img/instagram.svg"/></a>
                    </div>
                    <div className={s.contact}>
                        <a href="#">Contact us</a>
                    </div>
                </div>

                <div className={s.main}>
                    <div className={s.brandCol}>
                        <BrandLogo/>
                        <p className={s.brandText}>
                            Musement helps you get the best from every destination, by giving you easy access
                            to memorable experiences around the world.
                        </p>
                    </div>

                    <div className={s.linksCol}>
                        <h4>Company</h4>
                        <a href="#">Who we are</a>
                        <a href="#">Press</a>
                        <a href="#">Careers</a>
                        <a href="#">National Geographic Day Tours</a>
                        <a href="#">Green &amp; Fair Experiences</a>
                    </div>

                    <div className={s.linksCol}>
                        <h4>Discover</h4>
                        <a href="#">What our customers say</a>
                        <a href="#">Custom tours</a>
                        <h4>Partnerships</h4>
                        <a href="#">Who we work with</a>
                        <a href="#">Affiliate programs</a>
                        <a href="#">Personal Travel Agents</a>
                        <a href="#">Travel agencies</a>
                        <a href="#">Become a Supplier</a>
                        <a href="#">Become a distribution partner</a>
                    </div>

                    <div className={s.prefsCol}>
                        <h4>Preferences</h4>
                        <label className={s.selectWrap}>
                            <select defaultValue="English US">
                                <option>English US</option>
                            </select>
                            <span className={s.chev}>&#9662;</span>
                        </label>
                        <label className={s.selectWrap}>
                            <select defaultValue="$ US Dollar">
                                <option>$ US Dollar</option>
                            </select>
                            <span className={s.chev}>&#9662;</span>
                        </label>
                        <h4>Support</h4>
                        <a href="#">FAQ</a>
                        <a href="#">Contact us</a>
                    </div>
                </div>

                <div className={s.legal}>
                    <div>
                        <p>&copy; 2026 Musement S.p.A.</p>
                        <p>VAT IT07978000961 &middot; License</p>
                        <p>Online Travel Agency n&deg; 170695</p>
                    </div>
                    <div>
                        <a href="#">Terms &amp; conditions</a>
                        <a href="#">Privacy policy</a>
                        <a href="#">Cookies</a>
                        <a href="#">Site map</a>
                        <a href="#">Accessibility statement</a>
                    </div>
                </div>

                <div className={s.bottom}>
                    <div className={s.badges}>
                        <img alt="ETOA" src="/img/logo_etoa.svg"/>
                        <img alt="IAGTO" src="/img/logo_iagto.svg"/>
                    </div>
                    <span>Made with <span className={s.heart}>&#10084;</span> in Milan, Italy</span>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
