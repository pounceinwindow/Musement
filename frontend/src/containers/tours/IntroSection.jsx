import s from './IntroSection.module.css';

const EXPERIENCE_COLUMNS = [
    [
        {title: 'Monument visits', count: '6 EXPERIENCES'},
        {title: 'Hop-on hop-off', count: '4 EXPERIENCES'},
        {title: 'Drinks & tastings', count: '1 EXPERIENCES'},
    ],
    [
        {title: 'Folklore', count: '6 EXPERIENCES'},
        {title: 'Food & dining', count: '2 EXPERIENCES'},
    ],
    [
        {title: 'Off-road', count: '4 EXPERIENCES'},
        {title: 'Must-sees', count: '2 EXPERIENCES'},
    ],
];

function IntroSection() {
    return (
        <>
            <section className={`${s.section} ${s.intro}`}>
                <h2 className={s.heading}>Experiences in Tours</h2>
                <div className={s.columns}>
                    {EXPERIENCE_COLUMNS.map((column, columnIndex) => (
                        <div className={s.col} key={columnIndex}>
                            {column.map((item, itemIndex) => (
                                <div className={s.item} key={item.title}>
                                    <h4 className={itemIndex > 0 ? s.offsetHeading : ''}>{item.title}</h4>
                                    <a href="#">
                                        <span>{item.count}</span> &rsaquo;
                                    </a>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </section>

            <section className={`${s.section} ${s.intro}`}>
                <h2 className={s.heading}>Introducing Tours</h2>
                <p>
                    Tours stands on the lower reaches of the River Loire, between Orl&eacute;ans and the
                    Atlantic coast. The surrounding district, the traditional province of Touraine, is known
                    for its wines, for the alleged perfection of its local spoken French, and for the Battle
                    of Tours (732). Called &ldquo;Le Jardin de la France&rdquo; (&ldquo;The Garden of
                    France&rdquo;), Tours is located between two rivers, the Loire to the north and the Cher
                    to the south which make the city quite green.&hellip;
                </p>
                <p>
                    Tours is famous also for its original medieval district, called <em>le Vieux Tours</em>{' '}
                    with preserved half-timbered buildings and <em>la Place Plumereau</em>, a square with busy
                    pubs and restaurants, whose open-air tables fill the centre of the square&hellip;
                </p>
                <p>
                    Near the cathedral of Tours, in the garden of the ancient Palais des Archev&ecirc;ques
                    (now <em>Mus&eacute;e des Beaux-Arts</em>), is a huge cedar tree planted by Napoleon.
                    Funny fact, the garden also has in an alcove a stuffed elephant, Fritz. He escaped from
                    the Barnum and Bailey circus during their stay in Tours in 1902. He went mad and had to
                    be shot down, but the city paid to honor him, and he was stuffed as a result.
                </p>
            </section>
        </>
    );
}

export default IntroSection;
