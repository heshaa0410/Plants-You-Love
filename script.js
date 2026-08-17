// API Configuration
const API_CONFIG = {
    endpoint: '/api/chat',
    headers: {
        'Content-Type': 'application/json'
    },
    model: 'class-chat-model'
};

// Function to call the classroom proxy API
async function callClassroomAPI(userMessage) {
    try {
        const response = await fetch(API_CONFIG.endpoint, {
            method: 'POST',
            headers: API_CONFIG.headers,
            body: JSON.stringify({
                model: API_CONFIG.model,
                messages: [
                    { role: 'user', content: userMessage }
                ]
            })
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();

        if (Array.isArray(data?.choices) && data.choices[0]?.message?.content) {
            return String(data.choices[0].message.content).trim();
        }

        if (typeof data?.content === 'string' && data.content.trim()) {
            return data.content.trim();
        }

        if (typeof data?.answer === 'string' && data.answer.trim()) {
            return data.answer.trim();
        }

        if (typeof data?.output === 'string' && data.output.trim()) {
            return data.output.trim();
        }

        if (typeof data?.message === 'string' && data.message.trim()) {
            return data.message.trim();
        }

        if (Array.isArray(data?.messages) && data.messages.length) {
            const text = data.messages.map(item => item?.content || '').join('\n').trim();
            if (text) return text;
        }

        return null;
    } catch (error) {
        console.error('API call failed:', error);
        return null;
    }
}

function getFallbackPlantDescription(plant) {
    const plantName = plant?.name || 'This plant';
    const cleanedName = String(plantName).trim().toLowerCase();
    const category = plant?.category || 'General';

    const plantProfiles = {
        monstera: {
            origin: 'native to tropical forests of Central and South America',
            habitat: 'warm, humid homes with bright indirect light',
            special: 'famous for its large split leaves and tropical, dramatic foliage'
        },
        pothos: {
            origin: 'native to tropical regions of the Pacific and Southeast Asia',
            habitat: 'bright to medium indirect light indoors',
            special: 'known for its trailing vines and easygoing growth'
        },
        'snake plant': {
            origin: 'native to dry, arid regions of Africa',
            habitat: 'bright rooms and drought-tolerant indoor spaces',
            special: 'highly resilient and valued for upright, architectural leaves'
        },
        'rubber plant': {
            origin: 'native to tropical Southeast Asia',
            habitat: 'bright, warm indoor spaces with consistent moisture',
            special: 'recognized for glossy, deep green leaves and a strong upright shape'
        },
        philodendron: {
            origin: 'native to tropical forests of Central and South America',
            habitat: 'warm indoor environments with filtered light',
            special: 'loves climbing and has lush heart-shaped foliage'
        },
        'zz plant': {
            origin: 'native to eastern Africa',
            habitat: 'low to medium indirect light and dry indoor conditions',
            special: 'famous for waxy, drought-hardy foliage and low maintenance'
        },
        'peace lily': {
            origin: 'native to tropical forests of Central and South America',
            habitat: 'filtered light and consistently moist soil',
            special: 'celebrated for elegant white blooms and glossy leaves'
        },
        'spider plant': {
            origin: 'native to South Africa',
            habitat: 'bright indirect light and airy indoor spaces',
            special: 'known for arching leaves and baby plantlets that trail from the mother plant'
        },
        'fiddle leaf fig': {
            origin: 'native to tropical West Africa',
            habitat: 'bright, warm rooms with steady care',
            special: 'popular for its large, violin-shaped leaves and sculptural form'
        },
        dracaena: {
            origin: 'native to Africa and parts of Asia',
            habitat: 'warm indoor settings with moderate indirect light',
            special: 'recognized for long, striped leaves and easy architectural styling'
        },
        calathea: {
            origin: 'native to tropical forests of South America',
            habitat: 'humid rooms with filtered light and evenly moist soil',
            special: 'famous for vividly patterned leaves that move with the light'
        },
        succulent: {
            origin: 'native to dry climates around the world',
            habitat: 'sunny spots with very dry air and excellent drainage',
            special: 'stores water in its leaves and stems, making it especially drought tolerant'
        },
        'aloe vera': {
            origin: 'native to North Africa and the Arabian Peninsula',
            habitat: 'bright, dry, sunny conditions',
            special: 'known for its soothing gel and fleshy, water-storing leaves'
        },
        orchid: {
            origin: 'native to tropical and subtropical forests worldwide',
            habitat: 'humid, airy spaces with bright filtered light',
            special: 'prized for exotic blooms and intricate flower shapes'
        },
        fern: {
            origin: 'common in shady, moist forests around the world',
            habitat: 'humid areas with indirect light and steady moisture',
            special: 'loved for feathery foliage and soft texture'
        },
        'bamboo palm': {
            origin: 'native to tropical regions',
            habitat: 'humid, bright indoor spaces',
            special: 'valued for its tall, airy stems and calming tropical look'
        },
        rose: {
            origin: 'native to temperate regions of Europe, Asia, and North America',
            habitat: 'full-sun garden beds with good airflow and rich soil',
            special: 'best known for fragrant flowers and classic, layered petals'
        },
        sunflower: {
            origin: 'native to the Americas',
            habitat: 'full-sun open gardens with nutrient-rich soil',
            special: 'famous for tall stems and large, cheerful flower heads that track the sun'
        },
        tulip: {
            origin: 'native to Central Asia and the Mediterranean region',
            habitat: 'cool seasonal gardens with well-drained soil',
            special: 'recognized for cup-shaped blossoms in vivid spring colors'
        },
        lily: {
            origin: 'found across temperate regions of the northern hemisphere',
            habitat: 'sunny to partially shaded beds with regular moisture',
            special: 'known for striking flowers and strong, elegant stems'
        },
        daisy: {
            origin: 'widely found in temperate regions across the world',
            habitat: 'open, sunny gardens with moderate moisture',
            special: 'admired for bright, cheerful flower heads and easy care'
        },
        jasmine: {
            origin: 'native to warm regions of Asia and the Middle East',
            habitat: 'sunny, warm gardens and pots',
            special: 'celebrated for fragrance, especially in the evening'
        },
        lavender: {
            origin: 'native to the Mediterranean region',
            habitat: 'dry, sunny areas with excellent drainage',
            special: 'known for intensely fragrant flowers and gray-green foliage'
        },
        hibiscus: {
            origin: 'native to tropical and subtropical regions',
            habitat: 'warm, bright, humid environments',
            special: 'famous for large, showy blooms in vivid red, pink, and yellow'
        },
        ivy: {
            origin: 'native to Europe, North Africa, and parts of Asia',
            habitat: 'moderate light and support structures or hanging pots',
            special: 'valued for climbing habit and dense evergreen coverage'
        },
        mint: {
            origin: 'native to Europe and western Asia',
            habitat: 'moist soil with partial sun or cool conditions',
            special: 'known for rapid growth and a refreshing scent'
        },
        basil: {
            origin: 'native to tropical regions of Asia and Africa',
            habitat: 'warm, sunny conditions with rich, moist soil',
            special: 'a classic culinary herb prized for its soft leaves and strong aroma'
        },
        rosemary: {
            origin: 'native to the Mediterranean region',
            habitat: 'full sun and dry, well-drained soil',
            special: 'a fragrant woody herb used in cooking and pollinator gardens'
        },
        thyme: {
            origin: 'native to the Mediterranean',
            habitat: 'sunny, dry spots with poor to moderate soil',
            special: 'known for tiny aromatic leaves and drought resistance'
        },
        oregano: {
            origin: 'native to the Mediterranean and surrounding regions',
            habitat: 'full sun and free-draining soil',
            special: 'valued for its strong herbal flavor and hardiness'
        },
        cilantro: {
            origin: 'native to the eastern Mediterranean and southern Europe',
            habitat: 'cool weather with consistent moisture and partial sun',
            special: 'popular for fresh, citrusy leaves used in many dishes'
        },
        parsley: {
            origin: 'native to the Mediterranean region',
            habitat: 'moist, nutrient-rich soil and partial sun',
            special: 'grown for its rich green leaves and culinary versatility'
        },
        'bird of paradise': {
            origin: 'native to southern Africa',
            habitat: 'bright, warm indoor or tropical outdoor conditions',
            special: 'famous for its dramatic foliage and bird-like flowers'
        },
        'money tree': {
            origin: 'native to Central and South America',
            habitat: 'bright indirect light and stable tropical conditions',
            special: 'popular for its braided trunk and calming, sculptural look'
        },
        'boston fern': {
            origin: 'native to tropical regions of the Americas',
            habitat: 'humid, shaded spaces with evenly moist soil',
            special: 'known for lush fronds and soft, feathery texture'
        },
        'african violet': {
            origin: 'native to eastern tropical Africa',
            habitat: 'bright indirect light and steady warmth',
            special: 'celebrated for compact growth and soft velvet blooms'
        },
        anthurium: {
            origin: 'native to tropical regions of Central and South America',
            habitat: 'warm, humid spaces with filtered light',
            special: 'known for waxy, brightly colored blooms and glossy leaves'
        },
        'prayer plant': {
            origin: 'native to tropical regions of South America',
            habitat: 'humid indoor spaces with medium indirect light',
            special: 'named for the way its leaves fold upward at night like hands in prayer'
        },
        'air plant': {
            origin: 'native to forests and deserts of Central and South America',
            habitat: 'bright, airy rooms with regular misting or soaking',
            special: 'absorbs moisture through its leaves instead of roots'
        },
        cactus: {
            origin: 'native to dry deserts and arid regions worldwide',
            habitat: 'bright, dry, sunlit spaces',
            special: 'adapted to storing water in thick stems and surviving drought'
        },
        bamboo: {
            origin: 'native to warm, moist climates across Asia and beyond',
            habitat: 'rich soil with regular moisture and sunlight',
            special: 'a fast-growing grass prized for strength, texture, and height'
        },
        lavender: {
            origin: 'native to the Mediterranean basin',
            habitat: 'dry, sunny sites with excellent drainage',
            special: 'widely loved for its scent and pollinator appeal'
        }
    };

    if (plantProfiles[cleanedName]) {
        const profile = plantProfiles[cleanedName];
        return `${plantName} is ${profile.origin}. It typically grows in ${profile.habitat}, and it is especially valued for ${profile.special}.`;
    }

    const isIndoor = category === 'Indoor';
    const isFlowering = /flower|bloom|rose|lily|orchid|tulip|daisy|lavender|hibiscus|petunia|zinnia|dahlia|peony|camellia|azalea|begonia|cyclamen|amaryllis|poinsettia|marigold|snapdragon|geranium|magnolia|plumeria|bougainvillea|lotus|water lily|ivy|fern/i.test(plantName);
    const isHerb = /mint|basil|rosemary|thyme|oregano|cilantro|parsley|sage|chives|dill|tulsi|lemongrass/i.test(plantName);
    const isTree = /tree|palm|oak|maple|birch|pine|redwood|baobab|cypress|willow|fig|apple|lemon|orange|mango|olive|coconut|banana|eucalyptus|bamboo/i.test(plantName);

    if (isIndoor) {
        if (isFlowering) {
            return `${plantName} is a tropical or indoor flowering plant usually found in warm, bright spaces. It prefers filtered sunlight, steady moisture, and a stable environment that supports healthy bloom production.`;
        }
        if (isTree) {
            return `${plantName} is a decorative indoor plant that usually prefers bright, filtered light and evenly moist soil. It is valued for its sculptural form and lush foliage.`;
        }
        return `${plantName} is a resilient indoor plant that generally does best with bright, indirect sunlight, moderate watering, and good drainage. It is appreciated for its adaptability and easy care in home environments.`;
    }

    if (isHerb) {
        return `${plantName} is an edible or aromatic herb that grows best with plenty of sun, good airflow, and soil that stays lightly moist but drains well. It is valued for its scent, culinary use, and vigorous growth.`;
    }

    if (isTree) {
        return `${plantName} is a woody outdoor plant that usually prefers full sun, ample space, and soil with good drainage. It is admired for its structure, seasonal interest, and long-term growth.`;
    }

    if (isFlowering) {
        return `${plantName} is a flowering plant that typically thrives in bright light, regular watering, and well-drained soil. It is especially valued for its blooms, fragrance, and visual color during the growing season.`;
    }

    return `${plantName} is a plant that generally does best with the right balance of light, moisture, and drainage. It is usually valued for its foliage, growth habit, and ability to adapt well to its environment.`;
}

function getFallbackDoctorAdvice(plant, problem) {
    const plantName = plant?.name || 'your plant';
    const lowerProblem = (problem || '').toLowerCase();

    const diagnosisMap = [
        {
            match: ['yellow', 'wilting', 'droopy', 'weak', 'leaning'],
            diagnosis: `${plantName} is likely stressed because of uneven watering, poor light, or a root problem. The plant is not necessarily dying, but it is reacting to an environment that is not supporting steady growth.`,
            causes: ['inconsistent watering', 'low light', 'waterlogged roots', 'temperature stress'],
            actions: [
                'Check the soil moisture and water only when the top layer feels dry.',
                'Move the plant to brighter, indirect light if it has been in a dark spot.',
                'Make sure the pot has drainage holes and the roots are not sitting in water.',
                'Trim wilted or yellow leaves to help the plant redirect energy to healthier growth.'
            ],
            tip: `A healthy ${plantName} usually starts looking better within a few days once watering and light are balanced.`
        },
        {
            match: ['brown', 'spot', 'mildew', 'fungus', 'burn'],
            diagnosis: `${plantName} is likely dealing with leaf damage from dry air, overwatering, or fungal stress. The leaves are telling you that the plant is not comfortable with its current care routine.`,
            causes: ['water sitting on leaves', 'poor airflow', 'overwatering', 'humidity stress'],
            actions: [
                'Water at the base of the plant instead of splashing the leaves.',
                'Improve air circulation and avoid crowding the plant with other plants.',
                'Remove badly damaged leaves with clean scissors to stop the problem from spreading.',
                'Let the soil dry slightly between waterings, especially if the room is cool or dim.'
            ],
            tip: 'Healthy leaves on a plant like this should stay firm, even, and clean-looking once airflow and watering are under control.'
        },
        {
            match: ['root', 'rot', 'smell', 'mushy'],
            diagnosis: `${plantName} appears to have root stress, most likely from too much water or poor drainage. Roots that stay wet for too long cannot keep the plant healthy.`,
            causes: ['poor drainage', 'overwatering', 'compacted soil', 'roots sitting in stagnant water'],
            actions: [
                'Take the plant out of the pot and inspect the roots carefully.',
                'Cut away any mushy, black, or foul-smelling roots with clean scissors.',
                'Repot it in fresh, well-draining soil and a container with drainage holes.',
                'Water less often and only after the top of the soil has begun to dry.'
            ],
            tip: 'Healthy roots should feel firm and look white or light tan, not soft or dark.'
        },
        {
            match: ['pest', 'bug', 'aphid', 'mealybug', 'mites', 'insect'],
            diagnosis: `${plantName} likely has a pest problem, which is often visible on the undersides of leaves or around new growth. Pests weaken the plant by feeding on nutrients and sap.`,
            causes: ['weak plant health', 'dry indoor air', 'close plant spacing', 'lack of regular inspection'],
            actions: [
                'Wash the plant gently with lukewarm water and wipe both sides of the leaves.',
                'Isolate the plant to stop pests from spreading to nearby plants.',
                'Use insecticidal soap or neem oil on the affected areas.',
                'Check the undersides of leaves regularly and repeat treatment if needed.'
            ],
            tip: 'The sooner you catch pests, the easier they are to control before the plant gets seriously weakened.'
        },
        {
            match: ['leggy', 'stretch', 'thin', 'long stems', 'not enough light'],
            diagnosis: `${plantName} is likely stretching for more light and growing weakly because it is not getting enough strong, consistent light.`,
            causes: ['insufficient light', 'low sun exposure', 'plant left too far from a window'],
            actions: [
                'Move it closer to bright, indirect sunlight or a grow light.',
                'Rotate the plant regularly so growth stays balanced.',
                'Prune stretched stems to encourage a fuller shape.',
                'Keep watering steady but not excessive so the plant stays firm and compact.'
            ],
            tip: 'Plants grow stronger and more compact when they receive regular, bright light rather than occasional weak light.'
        }
    ];

    const matchedProfile = diagnosisMap.find(entry => entry.match.some(keyword => lowerProblem.includes(keyword)));
    const profile = matchedProfile || {
        diagnosis: `${plantName} is showing signs of stress, and the most likely reason is a change in its environment rather than a serious disease.`,
        causes: ['light imbalance', 'watering inconsistency', 'poor drainage', 'temperature or humidity stress'],
        actions: [
            "Review the plant care routine and keep the environment stable.",
            'Check that the plant is getting the right amount of light and moisture.',
            'Make sure the pot drains well and the soil is not compacted or waterlogged.',
            'Keep observing the plant for a few days after adjusting the care routine.'
        ],
        tip: 'The best fix is usually simple consistency: steady light, careful watering, and good airflow.'
    };

    return `Diagnosis: ${profile.diagnosis}\n\nLikely causes: ${profile.causes.join(', ')}.\n\nStep-by-step solutions:\n1. ${profile.actions[0]}\n2. ${profile.actions[1]}\n3. ${profile.actions[2]}\n4. ${profile.actions[3]}\n\nExpert care tip: ${profile.tip}`;
}

function buildPlantDoctorPrompt(plant, problem) {
    return `You are an expert plant doctor and horticulture advisor. Use the exact plant species and the user problem to provide diagnosis and treatment.\n\nPlant: ${plant.name}\nProblem description: "${problem}"\n\nGive a clear answer in this exact structure:\nDiagnosis:\nLikely causes:\nStep-by-step solutions:\nPrevention tips:\nWhen to seek help:\n\nBe specific to ${plant.name}, use practical and simple language, and answer the user's issue directly as if you are helping a real plant owner.`;
}

function formatPlantProfileResponse(response) {
    if (!response || !response.trim()) {
        return '<p>Plant information is unavailable right now.</p>';
    }

    const cleaned = response
        .replace(/\r/g, '')
        .replace(/\n{3,}/g, '\n\n')
        .trim();

    const lines = cleaned.split(/\n+/).map(line => line.trim()).filter(Boolean);
    let html = '';

    lines.forEach(line => {
        const headingMatch = line.match(/^([A-Za-z ][A-Za-z -]{0,40}):\s*(.*)$/);
        if (headingMatch) {
            const title = headingMatch[1].trim();
            const value = headingMatch[2].trim();
            html += `<p><strong>${title}:</strong> ${value}</p>`;
            return;
        }

        html += `<p>${line}</p>`;
    });

    return html || '<p>Plant information is unavailable right now.</p>';
}

// Plant Database with plant icons for reliable display
// This is the primary source of plants (100+) so the list is consistent
// whether or not the /api/chat backend proxy is reachable (e.g. static hosting).
const plantsDatabase = [
    { name: 'Monstera', emoji: '🪴', category: 'Indoor' },
    { name: 'Pothos', emoji: '🌿', category: 'Indoor' },
    { name: 'Snake Plant', emoji: '🌱', category: 'Indoor' },
    { name: 'Rubber Plant', emoji: '🪴', category: 'Indoor' },
    { name: 'Philodendron', emoji: '🌿', category: 'Indoor' },
    { name: 'ZZ Plant', emoji: '🌱', category: 'Indoor' },
    { name: 'Peace Lily', emoji: '🌸', category: 'Indoor' },
    { name: 'Spider Plant', emoji: '🪴', category: 'Indoor' },
    { name: 'Fiddle Leaf Fig', emoji: '🌿', category: 'Indoor' },
    { name: 'Dracaena', emoji: '🌱', category: 'Indoor' },
    { name: 'Calathea', emoji: '🌿', category: 'Indoor' },
    { name: 'Succulent', emoji: '🌵', category: 'Indoor' },
    { name: 'Aloe Vera', emoji: '🌵', category: 'Indoor' },
    { name: 'Orchid', emoji: '🌸', category: 'Indoor' },
    { name: 'Fern', emoji: '🪴', category: 'Indoor' },
    { name: 'Bamboo Palm', emoji: '🌴', category: 'Indoor' },
    { name: 'Rose', emoji: '🌹', category: 'Outdoor' },
    { name: 'Sunflower', emoji: '🌻', category: 'Outdoor' },
    { name: 'Tulip', emoji: '🌷', category: 'Outdoor' },
    { name: 'Lily', emoji: '🌸', category: 'Outdoor' },
    { name: 'Daisy', emoji: '🌼', category: 'Outdoor' },
    { name: 'Jasmine', emoji: '🌸', category: 'Outdoor' },
    { name: 'Lavender', emoji: '💜', category: 'Outdoor' },
    { name: 'Hibiscus', emoji: '🌺', category: 'Outdoor' },
    { name: 'Ivy', emoji: '🌿', category: 'Outdoor' },
    { name: 'Mint', emoji: '🌿', category: 'Outdoor' },
    { name: 'Basil', emoji: '🌿', category: 'Outdoor' },
    { name: 'Tomato Plant', emoji: '🍅', category: 'Outdoor' },
    { name: 'Lettuce', emoji: '🥬', category: 'Outdoor' },
    { name: 'Cactus', emoji: '🌵', category: 'Indoor' },
    { name: 'Bird of Paradise', emoji: '🪴', category: 'Indoor' },
    { name: 'Areca Palm', emoji: '🌴', category: 'Indoor' },
    { name: 'Boston Fern', emoji: '🪴', category: 'Indoor' },
    { name: 'Chinese Evergreen', emoji: '🌿', category: 'Indoor' },
    { name: 'English Ivy', emoji: '🌿', category: 'Indoor' },
    { name: 'Jade Plant', emoji: '🌵', category: 'Indoor' },
    { name: 'African Violet', emoji: '🌸', category: 'Indoor' },
    { name: 'Anthurium', emoji: '🌺', category: 'Indoor' },
    { name: 'Begonia', emoji: '🌸', category: 'Indoor' },
    { name: 'Croton', emoji: '🌿', category: 'Indoor' },
    { name: 'Prayer Plant', emoji: '🪴', category: 'Indoor' },
    { name: 'String of Pearls', emoji: '🌱', category: 'Indoor' },
    { name: 'Air Plant', emoji: '🌱', category: 'Indoor' },
    { name: 'Money Tree', emoji: '🌳', category: 'Indoor' },
    { name: 'Bonsai Tree', emoji: '🌳', category: 'Indoor' },
    { name: 'Christmas Cactus', emoji: '🌵', category: 'Indoor' },
    { name: 'Bromeliad', emoji: '🌺', category: 'Indoor' },
    { name: 'Kentia Palm', emoji: '🌴', category: 'Indoor' },
    { name: 'Ponytail Palm', emoji: '🌴', category: 'Indoor' },
    { name: 'Parlor Palm', emoji: '🌴', category: 'Indoor' },
    { name: 'Nerve Plant', emoji: '🌿', category: 'Indoor' },
    { name: 'Peperomia', emoji: '🌿', category: 'Indoor' },
    { name: 'Tulsi', emoji: '🌿', category: 'Outdoor' },
    { name: 'Marigold', emoji: '🌼', category: 'Outdoor' },
    { name: 'Chrysanthemum', emoji: '🌼', category: 'Outdoor' },
    { name: 'Petunia', emoji: '🌸', category: 'Outdoor' },
    { name: 'Zinnia', emoji: '🌸', category: 'Outdoor' },
    { name: 'Geranium', emoji: '🌸', category: 'Outdoor' },
    { name: 'Camellia', emoji: '🌸', category: 'Outdoor' },
    { name: 'Azalea', emoji: '🌸', category: 'Outdoor' },
    { name: 'Bougainvillea', emoji: '🌺', category: 'Outdoor' },
    { name: 'Wisteria', emoji: '💜', category: 'Outdoor' },
    { name: 'Magnolia', emoji: '🌸', category: 'Outdoor' },
    { name: 'Cherry Blossom', emoji: '🌸', category: 'Outdoor' },
    { name: 'Plumeria', emoji: '🌸', category: 'Outdoor' },
    { name: 'Bluebell', emoji: '💙', category: 'Outdoor' },
    { name: 'Poppy', emoji: '🌺', category: 'Outdoor' },
    { name: 'Carnation', emoji: '🌸', category: 'Outdoor' },
    { name: 'Iris', emoji: '💜', category: 'Outdoor' },
    { name: 'Peony', emoji: '🌸', category: 'Outdoor' },
    { name: 'Dahlia', emoji: '🌸', category: 'Outdoor' },
    { name: 'Gardenia', emoji: '🌸', category: 'Outdoor' },
    { name: 'Honeysuckle', emoji: '🌿', category: 'Outdoor' },
    { name: 'Morning Glory', emoji: '💙', category: 'Outdoor' },
    { name: 'Clematis', emoji: '💜', category: 'Outdoor' },
    { name: 'Snapdragon', emoji: '🌸', category: 'Outdoor' },
    { name: 'Cosmos', emoji: '🌸', category: 'Outdoor' },
    { name: 'Pansy', emoji: '🌸', category: 'Outdoor' },
    { name: 'Foxglove', emoji: '💜', category: 'Outdoor' },
    { name: 'Delphinium', emoji: '💙', category: 'Outdoor' },
    { name: 'Rosemary', emoji: '🌿', category: 'Outdoor' },
    { name: 'Thyme', emoji: '🌿', category: 'Outdoor' },
    { name: 'Oregano', emoji: '🌿', category: 'Outdoor' },
    { name: 'Cilantro', emoji: '🌿', category: 'Outdoor' },
    { name: 'Parsley', emoji: '🌿', category: 'Outdoor' },
    { name: 'Sage', emoji: '🌿', category: 'Outdoor' },
    { name: 'Chives', emoji: '🌿', category: 'Outdoor' },
    { name: 'Dill', emoji: '🌿', category: 'Outdoor' },
    { name: 'Bell Pepper', emoji: '🫑', category: 'Outdoor' },
    { name: 'Cucumber', emoji: '🥒', category: 'Outdoor' },
    { name: 'Carrot', emoji: '🥕', category: 'Outdoor' },
    { name: 'Potato', emoji: '🥔', category: 'Outdoor' },
    { name: 'Corn', emoji: '🌽', category: 'Outdoor' },
    { name: 'Strawberry', emoji: '🍓', category: 'Outdoor' },
    { name: 'Blueberry Bush', emoji: '🫐', category: 'Outdoor' },
    { name: 'Grape Vine', emoji: '🍇', category: 'Outdoor' },
    { name: 'Apple Tree', emoji: '🍎', category: 'Outdoor' },
    { name: 'Lemon Tree', emoji: '🍋', category: 'Outdoor' },
    { name: 'Orange Tree', emoji: '🍊', category: 'Outdoor' },
    { name: 'Banana Plant', emoji: '🍌', category: 'Outdoor' },
    { name: 'Mango Tree', emoji: '🥭', category: 'Outdoor' },
    { name: 'Coconut Palm', emoji: '🥥', category: 'Outdoor' },
    { name: 'Olive Tree', emoji: '🫒', category: 'Outdoor' },
    { name: 'Fig Tree', emoji: '🌳', category: 'Outdoor' },
    { name: 'Pine Tree', emoji: '🌲', category: 'Outdoor' },
    { name: 'Maple Tree', emoji: '🍁', category: 'Outdoor' },
    { name: 'Oak Tree', emoji: '🌳', category: 'Outdoor' },
    { name: 'Willow Tree', emoji: '🌳', category: 'Outdoor' },
    { name: 'Birch Tree', emoji: '🌳', category: 'Outdoor' },
    { name: 'Eucalyptus', emoji: '🌿', category: 'Outdoor' },
    { name: 'Bamboo', emoji: '🎋', category: 'Outdoor' },
    { name: 'Sage Brush', emoji: '🌿', category: 'Outdoor' },
    { name: 'Barrel Cactus', emoji: '🌵', category: 'Outdoor' },
    { name: 'Prickly Pear', emoji: '🌵', category: 'Outdoor' },
    { name: 'Agave', emoji: '🌵', category: 'Outdoor' },
    { name: 'Yucca', emoji: '🌵', category: 'Outdoor' },
    { name: 'Lotus', emoji: '🪷', category: 'Outdoor' },
    { name: 'Water Lily', emoji: '🪷', category: 'Outdoor' },
    { name: 'Venus Flytrap', emoji: '🌱', category: 'Indoor' },
    { name: 'Baobab Tree', emoji: '🌳', category: 'Outdoor' },
    { name: 'Redwood Tree', emoji: '🌲', category: 'Outdoor' },
    { name: 'Cypress Tree', emoji: '🌲', category: 'Outdoor' },
    { name: 'Papyrus', emoji: '🌿', category: 'Outdoor' },
    { name: 'Sedum', emoji: '🌵', category: 'Outdoor' },
    { name: 'Coleus', emoji: '🌿', category: 'Outdoor' },
    { name: 'Impatiens', emoji: '🌸', category: 'Outdoor' },
    { name: 'Amaryllis', emoji: '🌸', category: 'Indoor' },
    { name: 'Poinsettia', emoji: '🌺', category: 'Indoor' },
    { name: 'Cyclamen', emoji: '🌸', category: 'Indoor' }
];

// State management
let state = {
    selectedPlants: [],
    currentSelectedPlant: null,
    problemDescription: '',
    allPlants: [],
    plantDescriptions: {}
};

const audioState = {
    context: null,
    master: null,
    enabled: false,
    started: false
};

function setupAudio() {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx || audioState.context) return;

    const context = new AudioCtx();
    const master = context.createGain();
    master.gain.value = 0.0001;
    master.connect(context.destination);

    audioState.context = context;
    audioState.master = master;
}

function playClickSound() {
    if (!audioState.context || !audioState.enabled) return;

    const { context } = audioState;
    const osc = context.createOscillator();
    const gain = context.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(620, context.currentTime);
    osc.frequency.exponentialRampToValueAtTime(260, context.currentTime + 0.08);

    gain.gain.setValueAtTime(0.0001, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.06, context.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.12);

    osc.connect(gain);
    gain.connect(audioState.master);
    osc.start(context.currentTime);
    osc.stop(context.currentTime + 0.15);
}

async function handleButtonClickSound(event) {
    const clickedButton = event.target.closest('button');
    if (!clickedButton) return;

    if (!audioState.context) {
        setupAudio();
    }

    if (audioState.context) {
        audioState.enabled = true;
        if (audioState.context.state === 'suspended') {
            await audioState.context.resume();
        }
        playClickSound();
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    initAgent1();
    setupEventListeners();
    setupAudio();

    const soundButton = document.getElementById('soundToggle');
    if (soundButton) {
        soundButton.style.display = 'none';
    }

    document.addEventListener('click', handleButtonClickSound);
});

// Agent 1: Load plants and setup selection
async function initAgent1() {
    const plantsGrid = document.getElementById('plantsGrid');
    plantsGrid.innerHTML = '<div class="loading"><span class="spinner"></span><p>Loading plants from around the world...</p></div>';

    // Call API to get a comprehensive list of plants from around the world
    const prompt = `List 100+ plants from around the world including common houseplants, outdoor plants, exotic plants, and vegetables. 
    For each plant provide:
    1. Plant name
    2. One relevant emoji
    
    Format: Plant Name - emoji
    
    Include plants from different regions and climates. Just provide a simple numbered list.`;
    
    const apiResponse = await callClassroomAPI(prompt);

    // Process API response to extract plants
    const apiPlants = [];
    if (apiResponse) {
        const lines = apiResponse.split('\n');
        lines.forEach(line => {
            const match = line.match(/^[\d.]*\s*(.+?)\s*-\s*(.)/);
            if (match) {
                const name = match[1].trim();
                const emoji = match[2];
                if (name.length > 0) {
                    apiPlants.push({ name, emoji, category: 'World' });
                }
            }
        });
    }

    // Always start from the local database (works even if the /api/chat
    // proxy is unreachable, e.g. on static hosting), and add any extra
    // plants returned by the API that aren't already in it.
    const plants = [...plantsDatabase];
    const existingNames = new Set(plants.map(p => p.name.toLowerCase()));
    apiPlants.forEach(plant => {
        if (!existingNames.has(plant.name.toLowerCase())) {
            plants.push(plant);
            existingNames.add(plant.name.toLowerCase());
        }
    });

    // Store plants in state for later use
    state.allPlants = plants;

    // Display plants in alphabetical order
    const orderedPlants = [...plants].sort((a, b) => a.name.localeCompare(b.name));

    plantsGrid.innerHTML = '';
    orderedPlants.forEach(plant => {
        const card = createPlantCard(plant);
        plantsGrid.appendChild(card);
    });
}

// Create individual plant card
function createPlantCard(plant) {
    const card = document.createElement('div');
    card.className = 'plant-card';
    card.setAttribute('data-plant-name', plant.name);
    card.innerHTML = `
        <div class="plant-name">${plant.name}</div>
    `;

    card.addEventListener('click', () => togglePlantSelection(plant, card));
    return card;
}

// Toggle plant selection
function togglePlantSelection(plant, cardElement) {
    const index = state.selectedPlants.findIndex(p => p.name === plant.name);

    if (index > -1) {
        state.selectedPlants.splice(index, 1);
        cardElement.classList.remove('selected');
    } else {
        state.selectedPlants.push(plant);
        cardElement.classList.add('selected');
    }

    updateSelectedPlantsDisplay();
}

// Update the display of selected plants
function updateSelectedPlantsDisplay() {
    const selectedList = document.getElementById('selectedPlants');
    const continueBtn = document.getElementById('continueBtn');

    if (state.selectedPlants.length === 0) {
        selectedList.innerHTML = '<p class="empty-state">No plants selected yet</p>';
        continueBtn.style.display = 'none';
    } else {
        selectedList.innerHTML = state.selectedPlants.map(plant => `
            <div class="selected-item">
                <span>${plant.emoji} ${plant.name}</span>
                <button class="remove-btn" data-plant="${plant.name}">×</button>
            </div>
        `).join('');

        // Add remove button listeners
        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const plantName = e.target.dataset.plant;
                const plant = state.selectedPlants.find(p => p.name === plantName);
                const cardElement = document.querySelector(`[data-plant-name="${plantName}"]`);
                if (cardElement) {
                    togglePlantSelection(plant, cardElement);
                }
            });
        });

        continueBtn.style.display = 'block';
    }
}

// Setup event listeners
function setupEventListeners() {
    // Agent 1 search
    document.getElementById('searchBtn').addEventListener('click', searchPlants);
    document.getElementById('plantSearch').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') searchPlants();
    });

    // Agent 1 continue button
    document.getElementById('continueBtn').addEventListener('click', goToAgent2);

    // Agent 2 back button
    document.getElementById('backToAgent1').addEventListener('click', goToAgent1);

    // Agent 2 submit button
    document.getElementById('submitProblemBtn').addEventListener('click', goToAgent3);

    // Agent 3 buttons
    document.getElementById('backToAgent2').addEventListener('click', goToAgent2);
    document.getElementById('startOverBtn').addEventListener('click', startOver);
}

// Search plants
function searchPlants() {
    const searchTerm = document.getElementById('plantSearch').value.toLowerCase();
    const plantsGrid = document.getElementById('plantsGrid');
    const cards = plantsGrid.querySelectorAll('.plant-card');

    cards.forEach(card => {
        const plantName = card.querySelector('.plant-name').textContent.toLowerCase();
        if (searchTerm === '' || plantName.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Navigate to Agent 2
function goToAgent2() {
    document.getElementById('agent1').classList.add('hidden');
    document.getElementById('agent2').classList.remove('hidden');
    document.getElementById('agent3').classList.add('hidden');

    // Display selected plants for Agent 2
    const plantsForHelp = document.getElementById('plantsForHelp');
    plantsForHelp.innerHTML = '';

    state.selectedPlants.forEach(plant => {
        const btn = document.createElement('button');
        btn.className = 'plant-select-btn';
        btn.textContent = `${plant.emoji} ${plant.name}`;
        btn.addEventListener('click', () => selectPlantForHelp(plant, btn));
        plantsForHelp.appendChild(btn);
    });

    window.scrollTo(0, 0);
}

// Select a plant for help in Agent 2
async function selectPlantForHelp(plant, buttonElement) {
    // Remove active class from all buttons
    document.querySelectorAll('.plant-select-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Add active class to clicked button
    buttonElement.classList.add('active');
    state.currentSelectedPlant = plant;

    // Show plant info section and fetch description
    const plantInfoSection = document.getElementById('plantInfoSection');
    const plantDetails = document.getElementById('plantDetails');
    plantInfoSection.classList.remove('hidden');
    
    // Show loading state
    plantDetails.innerHTML = '<div class="loading"><span class="spinner"></span><p>Loading plant information...</p></div>';

    // Fetch a richer plant description from the online API when available
    let description = state.plantDescriptions[plant.name];
    if (!description) {
        const prompt = `You are a plant expert. Describe the ${plant.name} plant accurately and clearly. Include: 1) origin, 2) common habitat, 3) typical lifespan, 4) where it is commonly seen, 5) what it is famous for, and 6) one special characteristic. Use simple, factual language and strong headings like Origin:, Common habitat:, Typical lifespan:, Commonly seen in:, Famous for:, Special characteristic:.`;
        description = await callClassroomAPI(prompt);
        if (!description || description.length < 40 || /failed to get ai response|try again|unable to|i cannot/i.test(description)) {
            description = getFallbackPlantDescription(plant);
        }
        if (description) {
            state.plantDescriptions[plant.name] = description;
        }
    }

    // Display the plant description in a readable, structured format
    if (description) {
        const profileHtml = formatPlantProfileResponse(description);
        plantDetails.innerHTML = `<p><strong>${plant.emoji} ${plant.name}</strong></p>${profileHtml}`;
    } else {
        plantDetails.innerHTML = `<p><strong>${plant.emoji} ${plant.name}</strong></p><p>Plant information unavailable.</p>`;
    }

    // Show problem section
    const problemSection = document.getElementById('problemSection');
    problemSection.classList.remove('hidden');
    document.getElementById('problemDescription').value = '';
    document.getElementById('problemDescription').focus();
}

// Navigate to Agent 3
async function goToAgent3() {
    const problemDescription = document.getElementById('problemDescription').value.trim();

    if (!problemDescription) {
        alert('Please describe what is wrong with your plant');
        return;
    }

    if (!state.currentSelectedPlant) {
        alert('Please select a plant');
        return;
    }

    state.problemDescription = problemDescription;

    document.getElementById('agent1').classList.add('hidden');
    document.getElementById('agent2').classList.add('hidden');
    document.getElementById('agent3').classList.remove('hidden');

    // Display the issue
    const issueDisplay = document.getElementById('issueDisplay');
    issueDisplay.textContent = `Plant: ${state.currentSelectedPlant.name} - ${problemDescription}`;

    // Generate solutions
    await generateSolutions(state.currentSelectedPlant, problemDescription);

    window.scrollTo(0, 0);
}

// Generate AI solutions using the classroom API
async function generateSolutions(plant, problem) {
    const solutionsContainer = document.getElementById('solutionsContainer');

    try {
        const prompt = buildPlantDoctorPrompt(plant, problem);
        const aiResponse = await callClassroomAPI(prompt);

        if (aiResponse && aiResponse.trim().length > 20 && !/failed to get ai response|try again|unable to|i cannot/i.test(aiResponse)) {
            solutionsContainer.innerHTML = formatAIResponse(aiResponse, plant.name);
            return;
        }

        const fallbackAdvice = getFallbackDoctorAdvice(plant, problem);
        solutionsContainer.innerHTML = formatAIResponse(fallbackAdvice, plant.name);
    } catch (error) {
        console.error('Error generating solutions:', error);
        const fallbackAdvice = getFallbackDoctorAdvice(plant, problem);
        solutionsContainer.innerHTML = formatAIResponse(fallbackAdvice, plant.name);
    }
}

// Format AI response into styled HTML
function formatAIResponse(response, plantName) {
    if (!response || !response.trim()) {
        return '<p>No solutions available. Please try again.</p>';
    }

    const normalized = response
        .replace(/\r/g, '')
        .replace(/\n{3,}/g, '\n\n')
        .trim();

    const sections = normalized.split(/\n\s*\n/);
    let html = '';

    sections.forEach((section) => {
        const trimmed = section.trim();
        if (!trimmed) return;

        const headingMatch = trimmed.match(/^([A-Za-z][A-Za-z0-9\s&/-]{0,60}):\s*(.*)$/s);
        if (headingMatch) {
            const title = headingMatch[1].trim();
            const content = headingMatch[2].trim();
            const body = content || trimmed.replace(new RegExp(`^${headingMatch[1]}:\\s*`, 'i'), '').trim();

            html += `<div class="solution-item">
                <h4>${title}</h4>
                <p>${body.replace(/\n/g, '<br><br>')}</p>
            </div>`;
            return;
        }

        const listLineMatch = trimmed.match(/^(?:\d+\.|\*|-)?\s*(.+)$/);
        if (listLineMatch) {
            html += `<div class="solution-item">
                <p>${listLineMatch[1].replace(/\n/g, '<br><br>')}</p>
            </div>`;
            return;
        }

        html += `<div class="solution-item">
            <p>${trimmed.replace(/\n/g, '<br><br>')}</p>
        </div>`;
    });

    if (!html) {
        return `<p>Plant Doctor could not understand the issue for ${plantName}. Please try describing the symptom more clearly.</p>`;
    }

    return html;
}



// Navigate back to Agent 1
function goToAgent1() {
    document.getElementById('agent1').classList.remove('hidden');
    document.getElementById('agent2').classList.add('hidden');
    document.getElementById('agent3').classList.add('hidden');
    window.scrollTo(0, 0);
}

// Start over
function startOver() {
    state.selectedPlants = [];
    state.currentSelectedPlant = null;
    state.problemDescription = '';

    document.getElementById('agent1').classList.remove('hidden');
    document.getElementById('agent2').classList.add('hidden');
    document.getElementById('agent3').classList.add('hidden');

    // Clear search
    document.getElementById('plantSearch').value = '';
    initAgent1();
    updateSelectedPlantsDisplay();

    window.scrollTo(0, 0);
}

// Add data attribute to plant cards for removal
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('plant-card')) {
        const plantName = e.target.querySelector('.plant-name').textContent;
        e.target.setAttribute('data-plant-name', plantName);
    }
});
