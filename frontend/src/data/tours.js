export const CATEGORIES = [
    'Attractions & guided tours',
    'Excursions & day trips',
    'Activities',
    'Experiences for locals',
    'Tickets & events',
];

const makePrice = (value) => `$${value.toFixed(2)}`;

const BASE_TOUR = {
    freeCancellation: true,
    chips: ['Instant confirmation', 'Mobile ticket'],
    included: ['Activity ticket'],
    remember: ['Bring a valid ID', 'Wear comfortable shoes'],
    meeting: 'Tours city center',
    address: 'Tours, France',
    cancelPolicy: 'Free cancellation up to 24 hours before the experience starts.',
    reviews: [],
};

const createTour = (tour) => ({
    ...BASE_TOUR,
    ...tour,
    price: makePrice(tour.priceFrom),
});

export const TOURS = [
    createTour({
        id: 1,
        slug: 'entrance-ticket-to-chambord-castle',
        title: 'Entrance ticket to Chambord Castle',
        description:
            'Book your skip-the-line ticket online to visit Chateau de Chambord, the largest Loire Valley castle inspired by Leonardo da Vinci.',
        heroUrl: '/img/2.avif',
        category: 'Attractions & guided tours',
        rating: 4.7,
        reviewsCount: 107,
        priceFrom: 25,
        duration: '1 hour 30 minutes',
        languages: 'English, French',
        chips: ['Skip the line', 'Instant confirmation', 'Mobile ticket'],
        love: [
            'Visit one of the most iconic castles in the Loire Valley',
            'Skip the line and start exploring immediately',
            'Discover French Renaissance architecture up close',
        ],
        descriptionHtml:
            '<p>Book your skip-the-line ticket online to visit Chateau de Chambord, one of the most famous castles in France.</p>',
        included: ['Skip-the-line entrance ticket'],
        meeting: 'Chateau de Chambord main entrance',
        address: '41250 Chambord, France',
    }),

    createTour({
        id: 2,
        slug: 'chenonceau-castle-entrance-ticket',
        title: 'Chateau de Chenonceau entrance ticket',
        description:
            'Enter the \'Ladies Castle\' spanning the Cher River and explore its galleries, gardens, and iconic arches.',
        heroUrl: '/img/3.avif',
        category: 'Tickets & events',
        rating: 4.8,
        reviewsCount: 214,
        priceFrom: 18,
        duration: '2 hours',
        languages: 'English, French',
        chips: ['Mobile ticket', 'Instant confirmation'],
        love: [
            'Walk through a castle built over a river',
            'Stroll the famous formal gardens',
            'Enjoy a flexible visit at your own pace',
        ],
        descriptionHtml:
            '<p>Discover Chateau de Chenonceau, one of the most romantic sites in the Loire Valley, with access to the Chateau and gardens.</p>',
        included: ['Entrance ticket to Chateau de Chenonceau', 'Access to the gardens'],
        meeting: 'Chateau de Chenonceau ticket entrance',
        address: '37150 Chenonceaux, France',
    }),

    createTour({
        id: 3,
        slug: 'villandry-gardens-and-castle-ticket',
        title: 'Chateau de Villandry & gardens ticket',
        description:
            'Visit Villandry and its world-famous Renaissance gardens with geometric patterns, fountains, and orchard terraces.',
        heroUrl: '/img/4.avif',
        category: 'Attractions & guided tours',
        rating: 4.6,
        reviewsCount: 86,
        priceFrom: 14,
        duration: '1 hour 45 minutes',
        languages: 'English, French',
        chips: ['Mobile ticket', 'Instant confirmation'],
        love: [
            'Explore some of the most celebrated gardens in France',
            'Perfect for photos and a relaxed afternoon',
            'Combine Chateau rooms with outdoor terraces',
        ],
        descriptionHtml:
            '<p>Enjoy entry to Chateau de Villandry and discover its spectacular gardens, from the ornamental parterres to the vegetable garden.</p>',
        included: ['Entrance ticket to Chateau de Villandry', 'Access to the gardens'],
        meeting: 'Chateau de Villandry main entrance',
        address: '37510 Villandry, France',
    }),

    createTour({
        id: 4,
        slug: 'amboise-royal-castle-skip-the-line-ticket',
        title: 'Royal Chateau of Amboise skip-the-line ticket',
        description:
            'Skip the line and step into the royal residence overlooking the Loire, with panoramic terraces and historic chapels.',
        heroUrl: '/img/5.avif',
        category: 'Tickets & events',
        rating: 4.5,
        reviewsCount: 73,
        priceFrom: 16,
        duration: '1 hour 30 minutes',
        languages: 'English, French',
        chips: ['Skip the line', 'Mobile ticket', 'Instant confirmation'],
        love: [
            'Enjoy Loire views from the castle terraces',
            'Fast access at peak times',
            'See royal halls and a historic chapel',
        ],
        descriptionHtml:
            '<p>Visit the Royal Chateau of Amboise with skip-the-line entry and explore the residence of French kings in the heart of the Loire Valley.</p>',
        included: ['Skip-the-line entrance ticket'],
        meeting: 'Royal Chateau of Amboise ticket line',
        address: '37400 Amboise, France',
    }),

    createTour({
        id: 5,
        slug: 'clos-luce-leonardo-da-vinci-museum-ticket',
        title: 'Clos Luce: Leonardo da Vinci experience ticket',
        description:
            'Explore Leonardo da Vinci\'s final residence and interactive exhibits dedicated to his inventions and art.',
        heroUrl: '/img/6.avif',
        category: 'Attractions & guided tours',
        rating: 4.7,
        reviewsCount: 129,
        priceFrom: 19,
        duration: '2 hours',
        languages: 'English, French',
        chips: ['Mobile ticket', 'Instant confirmation'],
        love: [
            'Visit Leonardo\'s last home in Amboise',
            'Interactive models and outdoor installations',
            'Great for families and curious minds',
        ],
        descriptionHtml:
            '<p>Discover the Clos Luce and dive into Leonardo da Vinci\'s world through exhibitions, models, and immersive displays.</p>',
        included: ['Entrance ticket to Clos Luce'],
        meeting: 'Clos Luce entrance',
        address: '2 Rue du Clos Luce, 37400 Amboise, France',
    }),

    createTour({
        id: 6,
        slug: 'loire-valley-castles-day-trip-from-tours',
        title: 'Loire Valley castles day trip from Tours',
        description:
            'Spend the day exploring top Loire castles with comfortable transport and enough free time for photos and gardens.',
        heroUrl: '/img/7.avif',
        category: 'Excursions & day trips',
        rating: 4.6,
        reviewsCount: 58,
        priceFrom: 89,
        duration: '9 hours',
        languages: 'English, French',
        chips: ['Small group', 'Instant confirmation', 'Mobile ticket'],
        love: [
            'See multiple castles in one day',
            'Relax with transport included',
            'A classic Loire Valley introduction',
        ],
        descriptionHtml:
            '<p>Join a full-day excursion from Tours to discover the highlights of the Loire Valley, combining castles, viewpoints, and charming towns.</p>',
        included: ['Transportation from Tours', 'Driver/guide', 'Free time at each stop'],
        meeting: 'Tours city center meeting point',
        address: 'Tours, France',
    }),

    createTour({
        id: 7,
        slug: 'loire-wine-tasting-vouvray-cellar',
        title: 'Vouvray cellar wine tasting',
        description:
            'Taste crisp Loire whites in a traditional cellar and learn how local sparkling and still wines are made.',
        heroUrl: '/img/8.avif',
        category: 'Experiences for locals',
        rating: 4.8,
        reviewsCount: 41,
        priceFrom: 22,
        duration: '1 hour 15 minutes',
        languages: 'English, French',
        chips: ['Instant confirmation', 'Mobile ticket'],
        love: [
            'Taste Vouvray wines in an atmospheric cellar',
            'Learn simple tasting techniques',
            'A relaxing experience near Tours',
        ],
        descriptionHtml:
            '<p>Enjoy a guided tasting in Vouvray and discover the character of Loire Valley wines through a curated flight of local selections.</p>',
        included: ['Guided tasting', 'Selection of wines'],
        meeting: 'Vouvray cellar entrance',
        address: 'Vouvray, 37210, France',
    }),

    createTour({
        id: 8,
        slug: 'loire-valley-hot-air-balloon-flight',
        title: 'Hot air balloon flight over the Loire Valley',
        description:
            'Float above rivers, forests, and Chateau silhouettes during a scenic sunrise or sunset balloon flight.',
        heroUrl: '/img/9.avif',
        category: 'Activities',
        rating: 4.9,
        reviewsCount: 33,
        priceFrom: 189,
        duration: '3 hours',
        languages: 'English, French',
        chips: ['Limited spots', 'Instant confirmation', 'Mobile ticket'],
        love: [
            'Unforgettable aerial views of the Loire landscape',
            'Perfect for special occasions',
            'Includes a celebratory landing moment',
        ],
        descriptionHtml:
            '<p>Experience the Loire Valley from above on a hot air balloon flight, with stunning light and wide-open panoramas.</p>',
        included: ['Balloon flight', 'Safety briefing', 'Landing celebration'],
        meeting: 'Balloon launch site (details after booking)',
        address: 'Loire Valley, France',
    }),

    createTour({
        id: 9,
        slug: 'loire-river-kayak-adventure',
        title: 'Loire River kayak adventure',
        description:
            'Paddle a calm stretch of the Loire with a short briefing, then enjoy nature, islands, and riverside views.',
        heroUrl: '/img/10.avif',
        category: 'Activities',
        rating: 4.5,
        reviewsCount: 27,
        priceFrom: 35,
        duration: '2 hours 30 minutes',
        languages: 'English, French',
        chips: ['Family friendly', 'Mobile ticket', 'Instant confirmation'],
        love: [
            'Easygoing paddling on France\'s iconic river',
            'Great balance of activity and relaxation',
            'See the Loire\'s wildlife up close',
        ],
        descriptionHtml:
            '<p>Enjoy a guided or self-guided kayaking outing on the Loire, with equipment and route instructions provided.</p>',
        included: ['Kayak rental', 'Paddle', 'Life jacket', 'Route briefing'],
        meeting: 'Riverside base (exact point after booking)',
        address: 'Tours area, France',
    }),

    createTour({
        id: 10,
        slug: 'tours-city-walking-tour-old-town',
        title: 'Tours Old Town guided walking tour',
        description:
            'Discover the medieval streets, half-timbered houses, and lively squares of Tours with a local guide.',
        heroUrl: '/img/11.avif',
        category: 'Attractions & guided tours',
        rating: 4.6,
        reviewsCount: 64,
        priceFrom: 15,
        duration: '2 hours',
        languages: 'English, French',
        chips: ['Local guide', 'Instant confirmation', 'Mobile ticket'],
        love: [
            'Learn the city\'s stories and hidden corners',
            'Perfect introduction for first-time visitors',
            'Great photo spots in the historic center',
        ],
        descriptionHtml:
            '<p>Join a guided walk through Tours to explore its heritage, architecture, and vibrant atmosphere in the heart of the Loire Valley.</p>',
        included: ['Guided walking tour'],
        meeting: 'Place Plumereau',
        address: 'Place Plumereau, 37000 Tours, France',
    }),

    createTour({
        id: 11,
        slug: 'loire-valley-bike-tour-chateaux-and-vineyards',
        title: 'Loire Valley bike tour: Chateaux & vineyards',
        description:
            'Cycle easy routes through vineyards and riverside paths, with stops for views and local tastings.',
        heroUrl: '/img/12.avif',
        category: 'Activities',
        rating: 4.7,
        reviewsCount: 39,
        priceFrom: 59,
        duration: '4 hours',
        languages: 'English, French',
        chips: ['E-bike option', 'Mobile ticket', 'Instant confirmation'],
        love: [
            'Scenic cycling without tough climbs',
            'Mix of nature, heritage, and local flavors',
            'A fun way to explore beyond the city',
        ],
        descriptionHtml:
            '<p>Enjoy a bike tour in the Loire Valley combining riverside cycling, Chateau viewpoints, and optional tastings along the way.</p>',
        included: ['Bike rental', 'Helmet', 'Route guidance'],
        meeting: 'Tours bike shop meeting point',
        address: 'Tours, France',
    }),

    createTour({
        id: 12,
        slug: 'loire-valley-cooking-class-french-pastries',
        title: 'French pastry cooking class in Tours',
        description:
            'Bake classic French pastries with a chef and take home your creations - sweet, buttery, and very Loire.',
        heroUrl: '/img/13.avif',
        category: 'Experiences for locals',
        rating: 4.9,
        reviewsCount: 22,
        priceFrom: 75,
        duration: '3 hours',
        languages: 'English, French',
        chips: ['Small group', 'Instant confirmation', 'Mobile ticket'],
        love: [
            'Hands-on cooking with a local chef',
            'Eat what you make (and bring some home)',
            'A cozy indoor experience any season',
        ],
        descriptionHtml:
            '<p>Learn to make French pastries step-by-step in a friendly small-group class, with all ingredients and equipment provided.</p>',
        included: ['Cooking lesson', 'Ingredients', 'Recipes', 'Tasting'],
        meeting: 'Cooking studio in Tours (details after booking)',
        address: 'Tours, France',
    }),

    createTour({
        id: 13,
        slug: 'dinner-cruise-on-the-loire',
        title: 'Dinner cruise on the Loire River',
        description:
            'Enjoy a relaxed evening cruise with a multi-course dinner and views of the riverbanks at golden hour.',
        heroUrl: '/img/14.avif',
        category: 'Tickets & events',
        rating: 4.4,
        reviewsCount: 19,
        priceFrom: 69,
        duration: '2 hours 30 minutes',
        languages: 'English, French',
        chips: ['Romantic', 'Instant confirmation', 'Mobile ticket'],
        love: [
            'A special night on the Loire',
            'Beautiful sunset views from the water',
            'Comfortable seating and a calm pace',
        ],
        descriptionHtml:
            '<p>Sail the Loire on an evening cruise and enjoy a dinner experience designed to match the river\'s relaxed ambiance.</p>',
        included: ['Cruise', 'Dinner menu (set)', 'Onboard seating'],
        meeting: 'Loire river dock (details after booking)',
        address: 'Tours area, France',
    }),

    createTour({
        id: 14,
        slug: 'chateau-de-cheverny-ticket-and-gardens',
        title: 'Chateau de Cheverny ticket & gardens',
        description:
            'Visit Cheverny\'s elegant interiors and gardens - famous for its classic style and family-friendly atmosphere.',
        heroUrl: '/img/15.avif',
        category: 'Attractions & guided tours',
        rating: 4.5,
        reviewsCount: 52,
        priceFrom: 13,
        duration: '1 hour 30 minutes',
        languages: 'English, French',
        chips: ['Mobile ticket', 'Instant confirmation'],
        love: [
            'See beautifully preserved Chateau rooms',
            'Enjoy landscaped gardens and shaded paths',
            'A great stop between major Loire highlights',
        ],
        descriptionHtml:
            '<p>Discover Chateau de Cheverny with access to the interiors and gardens for a relaxed, self-paced visit.</p>',
        included: ['Entrance ticket', 'Access to gardens'],
        meeting: 'Chateau de Cheverny entrance',
        address: '41700 Cheverny, France',
    }),

    createTour({
        id: 15,
        slug: 'loire-valley-private-transfer-tours-to-chambord',
        title: 'Private transfer: Tours to Chambord (one way)',
        description:
            'A simple private ride from Tours to Chambord - ideal if you want flexibility without renting a car.',
        heroUrl: '/img/16.avif',
        category: 'Excursions & day trips',
        rating: 4.7,
        reviewsCount: 12,
        priceFrom: 79,
        duration: '1 hour',
        languages: 'English, French',
        chips: ['Private', 'Instant confirmation', 'Mobile ticket'],
        love: [
            'Door-to-door convenience',
            'Flexible timing for your day plan',
            'Comfortable ride without logistics stress',
        ],
        descriptionHtml:
            '<p>Book a private one-way transfer between Tours and Chambord for a convenient, stress-free journey.</p>',
        included: ['Private transfer', 'Driver'],
        meeting: 'Pick-up in Tours (details after booking)',
        address: 'Tours, France',
    }),

    createTour({
        id: 16,
        slug: 'evening-wine-and-cheese-tasting-in-tours',
        title: 'Evening wine & cheese tasting in Tours',
        description:
            'Taste Loire wines paired with regional cheeses in a relaxed setting, with stories and pairing tips.',
        heroUrl: '/img/17.avif',
        category: 'Experiences for locals',
        rating: 4.8,
        reviewsCount: 34,
        priceFrom: 32,
        duration: '1 hour 30 minutes',
        languages: 'English, French',
        chips: ['Instant confirmation', 'Mobile ticket'],
        love: [
            'Classic Loire pairings in one ses0sion',
            'Easy, social evening activity',
            'Learn pairings you can reuse anywhere',
        ],
        descriptionHtml:
            '<p>Enjoy a guided tasting of Loire wines paired with regional cheeses, with simple explanations and pairing notes.</p>',
        included: ['Wine tasting', 'Cheese pairing board', 'Tasting notes'],
        meeting: 'Central Tours tasting room (details after booking)',
        address: '37000 Tours, France',
    }),

    createTour({
        id: 17,
        slug: 'loire-valley-castles-day-trip-from-paris',
        title: 'Loire Valley castles day trip from Paris',
        description:
            'An efficient day trip from Paris to the Loire Valley with transportation and curated stops at major Chateaux.',
        heroUrl: '/img/18.avif',
        category: 'Excursions & day trips',
        rating: 4.5,
        reviewsCount: 143,
        priceFrom: 129,
        duration: '13 hours',
        languages: 'English, French',
        chips: ['Day trip', 'Instant confirmation', 'Mobile ticket'],
        love: [
            'See the Loire in a single day from Paris',
            'Transport included for a smooth experience',
            'Balanced itinerary with guided context',
        ],
        descriptionHtml:
            '<p>Travel from Paris to the Loire Valley for a full-day itinerary featuring Chateau highlights, scenic views, and free time to explore.</p>',
        included: ['Round-trip transportation from Paris', 'Tour escort'],
        meeting: 'Central Paris departure point (details after booking)',
        address: 'Paris, France',
    }),

    createTour({
        id: 18,
        slug: 'loire-valley-photo-tour-sunrise-castle-views',
        title: 'Loire Valley photo tour: sunrise Chateau views',
        description:
            'A guided morning photo walk to capture soft sunrise light, river reflections, and castle silhouettes.',
        heroUrl: '/img/19.avif',
        category: 'Attractions & guided tours',
        rating: 4.9,
        reviewsCount: 15,
        priceFrom: 49,
        duration: '2 hours 30 minutes',
        languages: 'English, French',
        chips: ['Small group', 'Mobile ticket', 'Instant confirmation'],
        love: [
            'Golden-hour locations picked by a local guide',
            'Great for phones or cameras',
            'Take home a set of memorable shots',
        ],
        descriptionHtml:
            '<p>Join a sunrise photo tour in the Loire Valley with a guide who helps you find the best angles, light, and compositions.</p>',
        included: ['Guided photo walk', 'Location tips', 'Basic composition guidance'],
        meeting: 'Meeting point shared after booking',
        address: 'Loire Valley, France',
    }),
];

const MUSEMENT_METADATA_BY_ID = {
    1: {
        duration: 'Flexible',
        languages: ['en', 'it', 'fr', 'es', 'de', 'pt', 'ru', 'nl', 'ja', 'pl', 'zh', 'ko'],
        instant: true,
        free: false,
    },
    2: {
        duration: 'Flexible',
        languages: ['en', 'it', 'fr', 'es', 'ar', 'de', 'pt', 'ru', 'nl', 'ja', 'pl', 'zh', 'ko', 'he'],
        instant: true,
        free: false,
    },
    3: {
        duration: 'Flexible',
        languages: ['en', 'fr'],
        instant: true,
        free: false,
    },
    4: {languages: ['en'], instant: false, free: true},
    5: {languages: ['en'], instant: false, free: true},
    6: {languages: ['en'], instant: false, free: true},
    7: {languages: ['en'], instant: false, free: true},
    8: {
        duration: 'Flexible',
        languages: ['en', 'it', 'fr', 'es', 'de', 'pt', 'ru', 'nl', 'zh'],
        instant: true,
        free: false,
    },
    9: {languages: ['en', 'fr'], instant: false, free: true},
    10: {languages: ['en', 'fr'], instant: false, free: true},
    11: {languages: ['en', 'fr'], instant: false, free: true},
    12: {languages: ['en', 'fr'], instant: true, free: true},
};

applyMusementMetadata(TOURS);

function applyMusementMetadata(tours) {
    for (const tour of tours) {
        const metadata = MUSEMENT_METADATA_BY_ID[tour.id];
        if (!metadata) continue;

        if (metadata.duration) {
            tour.duration = metadata.duration;
        }

        tour.languages = metadata.languages.join(', ');
        tour.freeCancellation = metadata.free;
        tour.chips = mergeStatusChips(tour.chips, metadata.instant, metadata.free);
    }
}

function mergeStatusChips(chips, instant, free) {
    const cleanChips = chips.filter((chip) => {
        const normalized = chip.toLowerCase();
        return normalized !== 'instant confirmation' && normalized !== 'free cancellation';
    });

    const statusChips = [];
    if (free) statusChips.push('Free cancellation');
    if (instant) statusChips.push('Instant confirmation');
    return [...statusChips, ...cleanChips];
}

const DEFAULT_PRICE_BOUNDS = {min: 0, max: 0};

function getPriceBounds(tours) {
    if (!Array.isArray(tours) || tours.length === 0) {
        return DEFAULT_PRICE_BOUNDS;
    }

    const prices = tours
        .map((tour) => tour.priceFrom)
        .filter((price) => Number.isFinite(price));

    if (prices.length === 0) {
        return DEFAULT_PRICE_BOUNDS;
    }

    return {
        min: Math.floor(Math.min(...prices)),
        max: Math.ceil(Math.max(...prices)),
    };
}

const PRICE_BOUNDS = getPriceBounds(TOURS);

export const MIN_PRICE = PRICE_BOUNDS.min;
export const MAX_PRICE = PRICE_BOUNDS.max;

