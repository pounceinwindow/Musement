import {Link} from 'react-router-dom';
import s from './CitySection.module.css';

function CitySection() {
    return (
        <section className={s.section}>
            <div className={s.inner}>
                <div className={s.left}>
                    <img alt="Tours" className={s.icon} src="/img/city_generic.svg"/>
                    <h2 className={s.title}>Tours</h2>
                </div>
                <Link className={s.link} to="/tours">
                    View all experiences in Tours
                </Link>
            </div>
        </section>
    );
}

export default CitySection;
