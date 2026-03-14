import TourGrid from '../../components/TourGrid';
import s from '../../pages/TourDetailPage.module.css';

function RelatedToursSection({relatedTours}) {
    return (
        <section className={s.moreSection}>
            <div className={s.container}>
                <h2>You might also like</h2>
                <TourGrid tours={relatedTours}/>
            </div>
        </section>
    );
}

export default RelatedToursSection;
