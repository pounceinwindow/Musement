import s from './Hero.module.css';

function Hero() {
    return (
        <section className={s.hero}>
            <img alt="" aria-hidden="true" className={s.bg} src="/img/1.avif"/>
            <div className={s.inner}>
                <div className={s.breadcrumb}>Home > Tours</div>
                <h1 className={s.title}>Tickets, activities and visits in Tours</h1>
                <button className={s.datebar} type="button">
                    <svg
                        aria-hidden="true"
                        className={s.dateIcon}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 36 36"
                    >
                        <path d="M31.439 3.358h-4.506V2.27c0-.7-.562-1.27-1.256-1.27-.689 0-1.252.571-1.252 1.272V3.36H11.572V2.272c0-.701-.562-1.272-1.253-1.272-.693 0-1.255.571-1.255 1.272V3.36h-4.51C2.595 3.36 1 4.986 1 6.988v24.379C1 33.37 2.596 35 4.557 35h26.884C33.404 35 35 33.37 35 31.369V6.99c0-2.003-1.598-3.632-3.561-3.632zm1.049 8.835v19.176c0 .568-.424 1.037-.963 1.085H4.555c-.579 0-1.049-.487-1.049-1.085V12.193h28.982zM3.508 6.99c0-.6.47-1.088 1.049-1.088l4.507.002v1.088c0 .7.562 1.271 1.255 1.271.69 0 1.253-.571 1.253-1.272V5.902h12.854V6.99c0 .701.562 1.272 1.252 1.272.692 0 1.256-.571 1.256-1.272V5.902h4.506c.58 0 1.051.489 1.051 1.088v2.662H3.508V6.99z"/>
                    </svg>
                    <span>Add dates</span>
                </button>
            </div>
        </section>
    );
}

export default Hero;
