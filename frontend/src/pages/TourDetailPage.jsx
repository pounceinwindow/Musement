import {Link, useParams} from 'react-router-dom';
import {useMemo} from 'react';
import {TOURS} from '../data/tours';
import AvailabilityAndPricesCard from '../containers/tour-detail/AvailabilityAndPricesCard';
import ReviewsSection from '../containers/tour-detail/ReviewsSection';
import RelatedToursSection from '../containers/tour-detail/RelatedToursSection';
import s from './TourDetailPage.module.css';

function TourDetailPage() {
    const {id} = useParams();
    const tour = TOURS.find((t) => t.id === Number(id));

    if (!tour) {
        return (
            <div className={`${s.container} ${s.notFound}`}>
                <h1>Tour not found</h1>
                <p>The tour you are looking for does not exist.</p>
                <Link to="/tours" className={s.backLink}>
                    Back to tours
                </Link>
            </div>
        );
    }

    const relatedTours = useMemo(() => {
        if (!tour) return [];
        return shuffle(TOURS.filter((t) => t.id !== tour.id)).slice(0, 4);
    }, [tour]);

    return (
        <div className={s.page}>
            <div className={s.hero}>
                <div className={s.heroFrame}>
                    <img alt={tour.title} src={tour.heroUrl} loading="lazy"/>
                    <button className={s.photosBtn} type="button">View all photos</button>
                </div>
            </div>

            <div className={s.container}>
                <nav className={s.breadcrumbs}>
                    <Link to="/">Home</Link>
                    <span className={s.sep}>/</span>
                    <Link to="/tours">Tours</Link>
                    <span className={s.sep}>/</span>
                    <span>{tour.category}</span>
                </nav>
            </div>

            <div className={s.container}>
                <div className={s.grid}>
                    <main>
                        <div className={s.categoryPill}>{tour.category}</div>
                        <h1 className={s.title}>{tour.title}</h1>

                        <div className={s.rating}>
                            <div className={s.badge}>{tour.rating}</div>
                            <div className={s.scoreText}>
                                {tour.rating >= 4.5 ? 'Excellent' : tour.rating >= 4 ? 'Very good' : 'Good'}
                            </div>
                            <a href="#reviews">Based on {tour.reviewsCount} reviews</a>
                        </div>

                        <div className={s.productMeta}>
                            <div className={s.metaItem}>
                                <span>&#9201;</span>
                                <div>
                                    <div><b>Duration</b></div>
                                    <div>{tour.duration}</div>
                                </div>
                            </div>
                            <div className={s.metaItem}>
                                <span>&#127911;</span>
                                <div>
                                    <div><b>Language</b></div>
                                    <div>{tour.languages}</div>
                                </div>
                            </div>
                            <div className={s.metaItem}>
                                <span>&#128241;</span>
                                <div>
                                    <div><b>Mobile voucher</b></div>
                                    <div>Instant confirmation</div>
                                </div>
                            </div>
                        </div>

                        <div className={s.chips}>
                            {tour.chips.map((chip) => (
                                <div className={s.chip} key={chip}>
                                    <span>&#10004;</span>
                                    <span>{chip}</span>
                                </div>
                            ))}
                        </div>

                        <section>
                            <h2>Why you&apos;ll love this</h2>
                            <ul className={s.list}>
                                {tour.love.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </section>

                        {tour.descriptionHtml && (
                            <section className={s.expect}>
                                <h2>What to expect</h2>
                                <div
                                    className={s.readMore}
                                    dangerouslySetInnerHTML={{__html: tour.descriptionHtml}}
                                />
                            </section>
                        )}

                        <section>
                            <h2>What&apos;s included</h2>
                            <ul className={`${s.list} ${s.included}`}>
                                {tour.included.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </section>

                        <section>
                            <h2>What to remember</h2>
                            <ul className={s.list}>
                                {tour.remember.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </section>

                        {(tour.meeting || tour.address) && (
                            <section>
                                <h2>Meeting point</h2>
                                {tour.meeting && <p>{tour.meeting}</p>}
                                {tour.address && <p>{tour.address}</p>}
                            </section>
                        )}

                        {tour.cancelPolicy && (
                            <section>
                                <h2>Cancellation policy</h2>
                                <p>{tour.cancelPolicy}</p>
                            </section>
                        )}

                        <ReviewsSection tour={tour}/>
                    </main>

                    <AvailabilityAndPricesCard tour={tour}/>
                </div>
            </div>

            <RelatedToursSection relatedTours={relatedTours}/>
        </div>
    );
}

export default TourDetailPage;

function shuffle(items) {
    const next = [...items];
    for (let i = next.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [next[i], next[j]] = [next[j], next[i]];
    }
    return next;
}
