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
        return data.choices[0].message.content;
    } catch (error) {
        console.error('API call failed:', error);
        return null;
    }
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

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    initAgent1();
    setupEventListeners();
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

    // Fetch plant description from API if not already cached
    let description = state.plantDescriptions[plant.name];
    if (!description) {
        const prompt = `Provide a brief description of the ${plant.name} plant in 2-3 sentences. Include its origin, typical habitat, and one key characteristic. Keep it concise and informative.`;
        description = await callClassroomAPI(prompt);
        if (description) {
            state.plantDescriptions[plant.name] = description;
        }
    }

    // Display plant description
    if (description) {
        plantDetails.innerHTML = `<p><strong>${plant.emoji} ${plant.name}</strong></p><p>${description}</p>`;
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
        // Create a detailed prompt for the AI to generate solutions
        const prompt = `You are an expert plant care advisor. A student has a ${plant.name} plant with the following problem: "${problem}". 
        
Please provide:
1. A diagnosis of the problem
2. The possible causes
3. At least 3-5 specific solutions and care tips
4. One expert tip for future plant care

Format your response with clear sections using headers. Be specific to the ${plant.name} plant species.`;

        const aiResponse = await callClassroomAPI(prompt);

        if (aiResponse) {
            solutionsContainer.innerHTML = formatAIResponse(aiResponse, plant.name);
        } else {
            solutionsContainer.innerHTML = '<p style="color: red;">Failed to get AI response. Please try again.</p>';
        }
    } catch (error) {
        console.error('Error generating solutions:', error);
        solutionsContainer.innerHTML = '<p style="color: red;">An error occurred. Please try again.</p>';
    }
}

// Format AI response into styled HTML
function formatAIResponse(response, plantName) {
    // Split response into sections and format nicely
    const sections = response.split('\n\n');
    let html = '';

    sections.forEach((section, index) => {
        if (section.trim()) {
            // Check if it's a header or regular content
            if (section.includes(':') && section.split(':')[0].length < 50) {
                const [title, content] = section.split(':', 1)[0] !== section 
                    ? section.split(':', 1)
                    : [section, ''];
                
                html += `<div class="solution-item">
                    <h4>${title.trim()}</h4>
                    <p>${section.replace(title + ':', '').trim()}</p>
                </div>`;
            } else {
                html += `<div class="solution-item">
                    <p>${section.trim().replace(/\n/g, '</p><p>')}</p>
                </div>`;
            }
        }
    });

    return html || '<p>No solutions available. Please try again.</p>';
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
