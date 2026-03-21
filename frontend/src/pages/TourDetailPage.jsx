import {useEffect, useMemo, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {fetchTourById, fetchTours} from '../api/tours';
import AvailabilityAndPricesCard from '../containers/tour-detail/AvailabilityAndPricesCard';
import ReviewsSection from '../containers/tour-detail/ReviewsSection';
import RelatedToursSection from '../containers/tour-detail/RelatedToursSection';
import s from './TourDetailPage.module.css';

function TourDetailPage() {
    const {id} = useParams();
    const [tour, setTour] = useState(null);
    const [relatedTours, setRelatedTours] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let cancelled = false;

        async function loadTourPage() {
            setLoading(true);
            setError('');

            try {
                const [tourResponse, toursResponse] = await Promise.all([
                    fetchTourById(id),
                    fetchTours(),
                ]);

                if (cancelled) {
                    return;
                }

                setTour(tourResponse);
                setRelatedTours(shuffle(toursResponse.tours.filter((item) => item.id !== tourResponse.id)).slice(0, 4));
            } catch (loadError) {
                if (!cancelled) {
                    setError(loadError.message || 'Failed to load tour.');
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        }

        loadTourPage();

        return () => {
            cancelled = true;
        };
    }, [id]);

    const scoreLabel = useMemo(() => (tour ? getRatingLabel(tour.rating) : ''), [tour]);

    if (loading) {
        return (
            <div className={`${s.container} ${s.notFound}`}>
                <h1>Loading tour...</h1>
            </div>
        );
    }

    if (error || !tour) {
        return (
            <div className={`${s.container} ${s.notFound}`}>
                <h1>Tour not found</h1>
                <p>{error || 'The tour you are looking for does not exist.'}</p>
                <Link to="/tours" className={s.backLink}>
                    Back to tours
                </Link>
            </div>
        );
    }

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
                            <div className={s.scoreText}>{scoreLabel}</div>
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
                                {tour.love.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </section>

                        {tour.descriptionHtml ? (
                            <section className={s.expect}>
                                <h2>What to expect</h2>
                                <div
                                    className={s.readMore}
                                    dangerouslySetInnerHTML={{__html: tour.descriptionHtml}}
                                />
                            </section>
                        ) : null}

                        <section>
                            <h2>What&apos;s included</h2>
                            <ul className={`${s.list} ${s.included}`}>
                                {tour.included.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </section>

                        <section>
                            <h2>What to remember</h2>
                            <ul className={s.list}>
                                {tour.remember.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </section>

                        {tour.meeting || tour.address ? (
                            <section>
                                <h2>Meeting point</h2>
                                {tour.meeting ? <p>{tour.meeting}</p> : null}
                                {tour.address ? <p>{tour.address}</p> : null}
                            </section>
                        ) : null}

                        {tour.cancelPolicy ? (
                            <section>
                                <h2>Cancellation policy</h2>
                                <p>{tour.cancelPolicy}</p>
                            </section>
                        ) : null}

                        <ReviewsSection tour={tour}/>
                    </main>

                    <AvailabilityAndPricesCard tour={tour}/>
                </div>
            </div>

            <RelatedToursSection relatedTours={relatedTours}/>
        </div>
    );
}

function shuffle(items) {
    const next = [...items];

    for (let index = next.length - 1; index > 0; index -= 1) {
        const randomIndex = Math.floor(Math.random() * (index + 1));
        [next[index], next[randomIndex]] = [next[randomIndex], next[index]];
    }

    return next;
}

function getRatingLabel(rating) {
    if (rating >= 4.5) return 'Excellent';
    if (rating >= 4) return 'Great';
    if (rating >= 3) return 'Average';
    if (rating >= 2) return 'Poor';
    return 'Bad';
}

export default TourDetailPage;
