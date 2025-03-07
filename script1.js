const modules = {
    coreConcepts: [
        {
            title: "Ecosystems and Biodiversity",
            image: "images/ecosystems.jpg",
            lesson: "Ecosystems are communities of living organisms interacting with their environments. Biodiversity refers to the variety of life within these systems. Maintaining balance is key to their survival.",
            interactiveLesson: {
                type: "simulation",
                description: "Add or remove species in a virtual ecosystem to maintain balance.",
                gamification: "Earn points by keeping the ecosystem balanced for as long as possible."
            },
            quiz: [
                { question: "What does biodiversity refer to?", options: ["Variety of life", "Number of ecosystems", "Pollution levels"], correct: 0 },
                { question: "What is an ecosystem?", options: ["A single species", "A community of organisms and their environment", "A type of plant"], correct: 1 },
                { question: "Why is biodiversity important?", options: ["It looks nice", "It ensures ecosystem stability", "It reduces pollution"], correct: 1 },
                { question: "What can disrupt an ecosystem?", options: ["Natural disasters", "Human activities", "Both"], correct: 2 },
                { question: "How can we protect biodiversity?", options: ["Conservation efforts", "Pollution", "Deforestation"], correct: 0 },
                { question: "What is a keystone species?", options: ["A species with a large impact on its ecosystem", "A type of plant", "A type of rock"], correct: 0 },
                { question: "What is an invasive species?", options: ["A native species", "A species that disrupts ecosystems", "A type of plant"], correct: 1 }
            ],
            chatbotQueries: [
                { keywords: ["what", "ecosystem"], response: "An ecosystem is a community of living organisms interacting with their environment." },
                { keywords: ["why", "biodiversity", "important"], response: "Biodiversity is important because it ensures ecosystem stability and resilience." }
            ]
        },
        {
            title: "Climate Change Basics",
            image: "images/climatechange.jpg",
            lesson: "Climate change is the long-term alteration of temperature and weather patterns, primarily due to human activities like burning fossil fuels.",
            interactiveLesson: {
                type: "simulation",
                description: "Simulate the impact of different emission scenarios on global temperature and sea levels.",
                gamification: "See how different emission rates affect the climate over time."
            },
            quiz: [
                { question: "What primarily causes climate change?", options: ["Solar flares", "Fossil fuel burning", "Volcanic eruptions"], correct: 1 },
                { question: "What is the greenhouse effect?", options: ["A type of plant growth", "Warming of Earth's surface due to trapped heat", "Cooling of Earth's surface"], correct: 1 },
                { question: "Which gas is a major contributor to the greenhouse effect?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen"], correct: 1 },
                { question: "What can reduce carbon emissions?", options: ["Using renewable energy", "Burning more coal", "Deforestation"], correct: 0 },
                { question: "What is a consequence of climate change?", options: ["Stable weather patterns", "Rising sea levels", "Decreased temperatures"], correct: 1 },
                { question: "How can individuals help combat climate change?", options: ["Using public transportation", "Increasing fossil fuel use", "Ignoring environmental issues"], correct: 0 },
                { question: "What is an example of renewable energy?", options: ["Oil", "Wind", "Coal"], correct: 1 }
            ],
            chatbotQueries: [
                { keywords: ["what", "climate", "change"], response: "Climate change is the long-term shift in weather patterns due to human activities." }
            ]
        }
    ],
    sustainableSolutions: [
        {
            title: "Renewable Energy",
            image: "images/SDGS-1.webp",
            lesson: "Renewable energy comes from sources like solar, wind, and hydro, which are replenished naturally and reduce carbon emissions.",
            interactiveLesson: {
                type: "simulation",
                description: "Manage a city's energy supply using renewable and non-renewable sources.",
                gamification: "Balance cost, energy demand, and emissions over 10 years."
            },
            quiz: [
                { question: "Which is a renewable energy source?", options: ["Coal", "Solar", "Natural Gas"], correct: 1 },
                { question: "What is the main benefit of renewable energy?", options: ["It is cheaper", "It reduces carbon emissions", "It is more reliable"], correct: 1 },
                { question: "Which of the following is a disadvantage of renewable energy?", options: ["It is unlimited", "It can be weather-dependent", "It produces a lot of waste"], correct: 1 },
                { question: "What is solar energy?", options: ["Energy from the sun", "Energy from wind", "Energy from water"], correct: 0 },
                { question: "What is wind energy?", options: ["Energy from the sun", "Energy from wind", "Energy from water"], correct: 1 },
                { question: "What is hydro energy?", options: ["Energy from the sun", "Energy from wind", "Energy from water"], correct: 2 },
                { question: "Which country is the largest producer of solar energy?", options: ["USA", "China", "India"], correct: 1 }
            ],
            chatbotQueries: [
                { keywords: ["what", "renewable", "energy"], response: "Renewable energy comes from naturally replenishing sources like solar and wind." }
            ]
        }
    ]
};
// Declare currentGame globally to track the Phaser game instance


// Utility: Generate Summary
const stopWords = ["the", "and", "a", "is", "to", "of"];
function generateSummary(text) {
    const sentences = text.split(". ").map(s => s.trim());
    const wordFreq = {};
    sentences.forEach(s => {
        s.toLowerCase().split(" ").forEach(w => {
            if (!stopWords.includes(w) && w) wordFreq[w] = (wordFreq[w] || 0) + 1;
        });
    });
    const scores = sentences.map(s => {
        return s.toLowerCase().split(" ").reduce((score, w) => score + (wordFreq[w] || 0), 0);
    });
    const topIndices = scores.map((s, i) => [s, i]).sort((a, b) => b[0] - a[0]).slice(0, 1).map(x => x[1]);
    return sentences[topIndices[0]] + ".";
}

// Utility: Chatbot Response
async function getChatbotResponse(query, moduleTitle) {
    const apiKey = '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'; // Replace with your Hugging Face API key
    const payload = {
        inputs: `You are an AI assistant knowledgeable about ${moduleTitle}. Answer the following question: ${query}`

    };

    try {
        const response = await fetch('https://api-inference.huggingface.co/models/meta-llama/Llama-2-7b-chat-hf', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();
        console.log('api response:', data);
        return data[0]?.generated_text || "lets work fo greater good .";
    } catch (error) {
        console.error('Error fetching chatbot response:', error);
        return "I'm sorry, I couldn't process your request. Please try again later.";
    }
}


  

// Render Modules on Homepage
function renderModules(libraryId, modulesList) {
    const container = document.getElementById(libraryId);
    container.innerHTML = ""; // Clear existing content
    modulesList.forEach(module => {
        const a = document.createElement("a");
        a.href = "#";
        a.textContent = module.title;
        a.className = "module-link";
        a.addEventListener("click", (e) => {
            e.preventDefault();
            showModule(module);
        });
        a.addEventListener("mouseenter", (e) => {
            const preview = document.getElementById("modulePreview");
            const img = document.getElementById("previewImage");
            img.src = module.image; // Ensure the image paths are correct
            img.alt = `${module.title} Preview`;
            preview.style.display = "block";
            const rect = a.getBoundingClientRect();
            preview.style.top = `${rect.bottom + window.scrollY}px`;
            preview.style.left = `${rect.left + window.scrollX}px`;
        });
        a.addEventListener("mouseleave", () => {
            const preview = document.getElementById("modulePreview");
            preview.style.display = "none";
        });
        container.appendChild(a);
        container.appendChild(document.createElement("br"));
    });
}

// Initial rendering of modules
renderModules("coreConcepts", modules.coreConcepts);
renderModules("sustainableSolutions", modules.sustainableSolutions);

// Show Module Page with transition
let currentModule;
function showModule(module) {
    currentModule = module;
    const homePage = document.getElementById("home");
    const modulePage = document.getElementById("modulePage");

    // Add fade-out effect to home page
    homePage.classList.add("fade-out");
    setTimeout(() => {
        homePage.style.display = "none";
        modulePage.style.display = "block";
        modulePage.classList.add("fade-in");
        document.getElementById("moduleTitle").textContent = module.title;
        document.getElementById("lessonContent").textContent = module.lesson;

        // Interactive Lesson Section
        const interactiveSection = document.getElementById("interactiveLessonSection");
        if (module.interactiveLesson) {
            interactiveSection.style.display = "block";
            interactiveSection.innerHTML = `
                <h3>Interactive Lesson</h3>
                <p>${module.interactiveLesson.description}</p>
                <p><strong>Gamification:</strong> ${module.interactiveLesson.gamification}</p>
                <button id="startInteractiveBtn">Start Interactive Lesson</button>
            `;
            document.getElementById("startInteractiveBtn").addEventListener("click", () => startInteractiveLesson(module));
        } else {
            interactiveSection.style.display = "none";
        }

        document.getElementById("lessonSection").style.display = "block";
        document.getElementById("quizSection").style.display = "none";
        document.getElementById("chatbotSection").style.display = "none";
        document.getElementById("interactiveLessonContainer").style.display = "none";

        // Create and show particles container
        const particlesContainer = document.createElement("div");
        particlesContainer.id = "particles-js-front";
        particlesContainer.style.position = "fixed";
        particlesContainer.style.width = "100%";
        particlesContainer.style.height = "100%";
        particlesContainer.style.top = "0";
        particlesContainer.style.left = "0";
        particlesContainer.style.zIndex = "1000"; // Ensure it is in front
        particlesContainer.style.pointerEvents = "none"; // Allow clicks to pass through
        document.body.appendChild(particlesContainer);

        // Initialize particles
        initializeParticles('particles-js-front');

        // Remove particles container after 5 to 6 seconds
        setTimeout(() => {
            document.body.removeChild(particlesContainer);
        }, 6000); // 6 seconds
    }, 500); // Match the duration of the fade-out effect
}

// Back to Home with transition
document.getElementById("backBtn").addEventListener("click", () => {
    if (currentGame) {
        currentGame.destroy(true);
        currentGame = null;
    }
    const homePage = document.getElementById("home");
    const modulePage = document.getElementById("modulePage");

    // Add fade-out effect to module page
    modulePage.classList.add("fade-out");
    setTimeout(() => {
        modulePage.style.display = "none";
        homePage.style.display = "block";
        homePage.classList.add("fade-in");
        document.getElementById("interactiveLessonContainer").style.display = "none";
    }, 500); // Match the duration of the fade-out effect
});

// Start Quiz
document.getElementById("startQuizBtn").addEventListener("click", () => {
    document.getElementById("lessonSection").style.display = "none";
    document.getElementById("quizSection").style.display = "block";
    renderQuiz(currentModule.quiz);
});

// Render Quiz
function renderQuiz(quiz) {
    const container = document.getElementById("quizQuestions");
    container.innerHTML = "";
    quiz.forEach((q, i) => {
        const div = document.createElement("div");
        div.className = "question";
        div.innerHTML = `<p>${i + 1}. ${q.question}</p>`;
        q.options.forEach((opt, j) => {
            div.innerHTML += `<label><input type="radio" name="q${i}" value="${j}">${opt}</label><br>`;
        });
        container.appendChild(div);
    });
}

// Function to display winning animation
function showWinningAnimation() {
    const animationContainer = document.createElement("div");
    animationContainer.id = "winningAnimation";
    animationContainer.style.position = "fixed";
    animationContainer.style.top = "50%";
    animationContainer.style.left = "50%";
    animationContainer.style.transform = "translate(-50%, -50%)";
    animationContainer.style.zIndex = "1000";
    animationContainer.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    animationContainer.style.color = "#fff";
    animationContainer.style.padding = "20px";
    animationContainer.style.borderRadius = "10px";
    animationContainer.style.textAlign = "center";
    animationContainer.innerHTML = `
        <h2>Congratulations!</h2>
        <p>You scored perfectly!</p>
        <div id="confetti"></div>
    `;
    document.body.appendChild(animationContainer);

    // Confetti animation (using a simple CSS animation)
    const confetti = document.getElementById("confetti");
    confetti.style.width = "100%";
    confetti.style.height = "100px";
    confetti.style.backgroundImage = "url('https://youtu.be/FMmQMHEwR7s')"; // Add a confetti GIF or animation here
    confetti.style.backgroundSize = "cover";

    // Remove animation after 5 seconds
    setTimeout(() => {
        document.body.removeChild(animationContainer);
    }, 5000);
}

// Submit Quiz
document.getElementById("submitQuizBtn").addEventListener("click", () => {
    let score = 0;
    currentModule.quiz.forEach((q, i) => {
        const selected = document.querySelector(`input[name="q${i}"]:checked`);
        if (selected && parseInt(selected.value) === q.correct) score++;
    });
    alert(`Your score: ${score}/${currentModule.quiz.length}`);
    if (score === currentModule.quiz.length) {
        showWinningAnimation();
    }
    document.getElementById("quizSection").style.display = "none";
    document.getElementById("chatbotSection").style.display = "block";
    document.getElementById("summaryText").textContent = generateSummary(currentModule.lesson);
});

// Chatbot Query
document.getElementById("sendQueryBtn").addEventListener("click", async () => {
    const query = document.getElementById("userQuery").value;
    const response = await getChatbotResponse(query, currentModule.title);
    document.getElementById("chatbotResponse").textContent = response;
    document.getElementById("userQuery").value = "";
});
// interactive 
let currentGame = null;

class EcosystemScene extends Phaser.Scene {
    constructor() {
        super({ key: 'EcosystemScene' });
        // Initialize population variables
        this.grass = 100;
        this.rabbits = 10;
        this.wolves = 5;
    }

    preload() {
        // Load images
        this.load.image('grass', 'images/grass.png'); // Replace with the correct path to your grass image
        this.load.image('rabbit', 'images/rabbit.png'); // Replace with the correct path to your rabbit image
        this.load.image('wolf', 'images/wolfy.jpeg'); // Replace with the correct path to your wolf image
    }

    create() {
        // Background
        this.add.rectangle(0, 0, 800, 600, 0x87ceeb).setOrigin(0); // Sky blue background
        this.add.rectangle(0, 400, 800, 200, 0x228b22).setOrigin(0); // Forest green ground

        // Text displays
        this.grassText = this.add.text(10, 10, `Grass: ${this.grass}`, { fontSize: '20px', fill: '#000' });
        this.rabbitText = this.add.text(10, 40, `Rabbits: ${this.rabbits}`, { fontSize: '20px', fill: '#000' });
        this.wolfText = this.add.text(10, 70, `Wolves: ${this.wolves}`, { fontSize: '20px', fill: '#000' });

        // Display images
        this.grassImage = this.add.image(100, 500, 'grass').setScale(0.5);
        this.rabbitImage = this.add.image(200, 500, 'rabbit').setScale(0.2);
        this.wolfImage = this.add.image(300, 500, 'wolf').setScale(0.8);

        // Button position (moved up to y = 520)
        const buttonY = 520;

        // Create styled buttons
        this.createButton(10, buttonY, 100, 40, 0x00ff00, 'Add Grass', () => {
            this.grass += 10;
            this.updateText();
        });

        this.createButton(120, buttonY, 100, 40, 0xff0000, 'Remove Grass', () => {
            if (this.grass > 0) this.grass -= 10;
            this.updateText();
        });

        this.createButton(230, buttonY, 100, 40, 0x00ff00, 'Add Rabbit', () => {
            this.rabbits += 1;
            this.updateText();
        });

        this.createButton(340, buttonY, 100, 40, 0xff0000, 'Remove Rabbit', () => {
            if (this.rabbits > 0) this.rabbits -= 1;
            this.updateText();
        });

        this.createButton(450, buttonY, 100, 40, 0x00ff00, 'Add Wolf', () => {
            this.wolves += 1;
            this.updateText();
        });

        this.createButton(560, buttonY, 100, 40, 0xff0000, 'Remove Wolf', () => {
            if (this.wolves > 0) this.wolves -= 1;
            this.updateText();
        });

        this.createButton(750, buttonY, 80, 40, 0x000000, 'Close', () => {
            currentGame.destroy(true);
            currentGame = null;
            document.getElementById('interactiveLessonContainer').style.display = 'none';
        });

        // Population update timer
        this.time.addEvent({
            delay: 1000,
            callback: this.updatePopulations,
            callbackScope: this,
            loop: true
        });
    }

    // Helper method to create styled buttons
    createButton(x, y, width, height, color, text, callback) {
        const graphics = this.add.graphics();
        graphics.fillStyle(color, 1);
        graphics.fillRoundedRect(x, y, width, height, 10); // Rounded corners with radius 10
        graphics.setInteractive(new Phaser.Geom.Rectangle(x, y, width, height), Phaser.Geom.Rectangle.Contains);
        graphics.on('pointerdown', callback);

        // Center the text within the button
        const textObj = this.add.text(x + width / 2, y + height / 2, text, { fontSize: '16px', fill: '#fff' });
        textObj.setOrigin(0.5, 0.5); // Center alignment
    }

    updateText() {
        this.grassText.setText(`Grass: ${this.grass}`);
        this.rabbitText.setText(`Rabbits: ${this.rabbits}`);
        this.wolfText.setText(`Wolves: ${this.wolves}`);
    }

    updatePopulations() {
        // Simple ecosystem dynamics
        this.grass += 5; // Grass grows naturally
        if (this.rabbits > 0 && this.grass >= this.rabbits) {
            this.grass -= this.rabbits; // Rabbits eat grass
            if (Math.random() < 0.1) this.rabbits += 1; // Rabbit reproduction
        } else if (this.rabbits > 0) {
            this.rabbits -= 1; // Starvation
        }
        if (this.wolves > 0 && this.rabbits >= this.wolves) {
            this.rabbits -= this.wolves; // Wolves eat rabbits
            if (Math.random() < 0.05) this.wolves += 1; // Wolf reproduction
        } else if (this.wolves > 0) {
            this.wolves -= 1; // Starvation
        }
        // Prevent negative values
        this.grass = Math.max(this.grass, 0);
        this.rabbits = Math.max(this.rabbits, 0);
        this.wolves = Math.max(this.wolves, 0);
        this.updateText();
    }
}
//testing
// Define the Climate Change Scene
class ClimateChangeScene extends Phaser.Scene {
    constructor() {
        super({ key: 'ClimateChangeScene' });
        this.year = 0;
        this.co2 = 280; // Pre-industrial CO2 level in ppm
        this.temperature = 15; // Starting temperature in °C
        this.emissionRate = 0; // CO2 increase per year
    }

    create() {
        // Background: Light blue sky
        this.add.rectangle(0, 0, 800, 600, 0x87ceeb).setOrigin(0);

        // Sea level: Blue rectangle at the bottom
        this.sea = this.add.rectangle(0, 500, 800, 100, 0x0000ff).setOrigin(0);

        // Text displays for year, CO2, and temperature
        this.yearText = this.add.text(10, 10, `Year: ${this.year}`, { fontSize: '20px', fill: '#000' });
        this.co2Text = this.add.text(10, 40, `CO2: ${this.co2} ppm`, { fontSize: '20px', fill: '#000' });
        this.tempText = this.add.text(10, 70, `Temperature: ${this.temperature} °C`, { fontSize: '20px', fill: '#000' });

        // Buttons for emission scenarios and reset
        const buttonY = 520;

        // Create styled buttons
        this.createButton(100, buttonY, 120, 40, 0x00ff00, 'Low Emissions', () => {
            this.emissionRate = 1;
        });

        this.createButton(250, buttonY, 120, 40, 0xffff00, 'Medium Emissions', () => {
            this.emissionRate = 2;
        });

        this.createButton(400, buttonY, 120, 40, 0xff0000, 'High Emissions', () => {
            this.emissionRate = 3;
        });

        this.createButton(700, buttonY, 80, 40, 0x000000, 'Reset', () => {
            this.resetSimulation();
        });

        // Timer to update simulation every second (1 second = 1 year)
        this.time.addEvent({
            delay: 1000,
            callback: this.updateSimulation,
            callbackScope: this,
            loop: true
        });
    }

    // Helper method to create styled buttons
    createButton(x, y, width, height, color, text, callback) {
        const graphics = this.add.graphics();
        graphics.fillStyle(color, 1);
        graphics.fillRoundedRect(x, y, width, height, 10); // Rounded corners with radius 10
        graphics.setInteractive(new Phaser.Geom.Rectangle(x, y, width, height), Phaser.Geom.Rectangle.Contains);
        graphics.on('pointerdown', callback);

        // Center the text within the button
        const textObj = this.add.text(x + width / 2, y + height / 2, text, { fontSize: '16px', fill: '#fff' });
        textObj.setOrigin(0.5, 0.5); // Center alignment
    }

    updateSimulation() {
        this.year += 1;
        this.co2 += this.emissionRate;
        const co2Increase = this.co2 - 280;
        const tempIncrease = (co2Increase / 200) * 1.0; // 1°C increase per 200 ppm
        this.temperature = 15 + tempIncrease;

        // Update sea level: Increase height by 20 pixels per degree above 15°C
        const seaHeight = 100 + (this.temperature - 15) * 20;
        this.sea.setSize(800, seaHeight);
        this.sea.setPosition(0, 600 - seaHeight);

        this.updateText();
    }

    resetSimulation() {
        this.year = 0;
        this.co2 = 280;
        this.temperature = 15;
        this.emissionRate = 0;
        this.sea.setSize(800, 100);
        this.sea.setPosition(0, 500);
        this.updateText();
    }

    updateText() {
        this.yearText.setText(`Year: ${this.year}`);
        this.co2Text.setText(`CO2: ${this.co2.toFixed(0)} ppm`);
        this.tempText.setText(`Temperature: ${this.temperature.toFixed(1)} °C`);
    }
}
class RenewableEnergyScene extends Phaser.Scene {
    constructor() {
        super({ key: 'RenewableEnergyScene' });
        this.budget = 5000;          // Starting budget
        this.year = 0;               // Current year
        this.demand = 100;           // Initial energy demand
        this.totalEmissions = 0;     // Total emissions over time
        this.powerPlants = [];       // Array of built power plants
        this.nextSlot = 0;           // Index of next available slot
        this.slotPositions = [       // Predefined positions for power plants
            { x: 100, y: 200 }, { x: 250, y: 200 }, { x: 400, y: 200 }, { x: 550, y: 200 },
            { x: 100, y: 400 }, { x: 250, y: 400 }, { x: 400, y: 400 }, { x: 550, y: 400 },
            { x: 100, y: 500 }, { x: 300, y: 500 }
        ];
    }

    create() {
        // Background (light blue sky)
        this.add.rectangle(0, 0, 800, 600, 0x87ceeb).setOrigin(0);

        // Stats display
        this.yearText = this.add.text(10, 10, `Year: ${this.year}`, { fontSize: '20px', fill: '#000' });
        this.demandText = this.add.text(10, 40, `Demand: ${this.demand}`, { fontSize: '20px', fill: '#000' });
        this.supplyText = this.add.text(10, 70, `Supply: 0`, { fontSize: '20px', fill: '#000' });
        this.emissionsText = this.add.text(10, 100, `Emissions: ${this.totalEmissions}`, { fontSize: '20px', fill: '#000' });
        this.budgetText = this.add.text(10, 130, `Budget: ${this.budget}`, { fontSize: '20px', fill: '#000' });

        // Build buttons (at bottom of screen)
        const buttonY = 550;
        this.createBuildButton(100, buttonY, 'Solar', 1000, 50, 0, 10, 0xffff00);    // Yellow
        this.createBuildButton(250, buttonY, 'Wind', 800, 40, 0, 8, 0x0000ff);      // Blue
        this.createBuildButton(400, buttonY, 'Hydro', 1500, 100, 0, 15, 0x00ffff);  // Cyan
        this.createBuildButton(550, buttonY, 'Coal', 500, 100, 100, 20, 0x808080);  // Gray
        this.createBuildButton(700, buttonY, 'Gas', 700, 80, 50, 15, 0xffa500);     // Orange

        // Timer to advance years (every 5 seconds)
        this.time.addEvent({
            delay: 5000,
            callback: this.advanceYear,
            callbackScope: this,
            loop: true
        });
    }

    createBuildButton(x, y, type, cost, energy, emissions, maintenance, color) {
        const button = this.add.rectangle(x, y, 100, 40, 0x00ff00)  // Green button
            .setInteractive()
            .on('pointerdown', () => {
                if (this.budget >= cost && this.nextSlot < this.slotPositions.length) {
                    const pos = this.slotPositions[this.nextSlot];
                    const plant = this.add.rectangle(pos.x, pos.y, 50, 50, color).setOrigin(0.5);
                    const label = this.add.text(pos.x, pos.y + 30, type, { fontSize: '16px', fill: '#000' }).setOrigin(0.5);
                    this.powerPlants.push({ type, energy, emissions, maintenance, plant, label });
                    this.budget -= cost;
                    this.nextSlot++;
                    this.updateStats();
                } else {
                    console.log('Not enough budget or slots');
                }
            });
        this.add.text(x - 30, y - 10, `Build ${type}`, { fontSize: '16px', fill: '#000' });
    }

    advanceYear() {
        this.year += 1;
        this.demand += 20;
        let totalSupply = 0;
        let totalEmissionsThisYear = 0;

        // Calculate supply, emissions, and maintenance
        this.powerPlants.forEach(plant => {
            totalSupply += plant.energy;
            totalEmissionsThisYear += plant.emissions;
            this.budget -= plant.maintenance;
        });

        // Handle energy shortfall with emergency generators
        if (totalSupply < this.demand) {
            const shortfall = this.demand - totalSupply;
            totalEmissionsThisYear += shortfall * 200;  // High emissions penalty
        }

        this.totalEmissions += totalEmissionsThisYear;
        this.updateStats();

        // End game after 10 years
        if (this.year >= 10) {
            this.time.removeAllEvents();
            alert(`Simulation ended. Total emissions: ${this.totalEmissions}`);
        }
    }

    updateStats() {
        let totalSupply = 0;
        this.powerPlants.forEach(plant => {
            totalSupply += plant.energy;
        });
        this.yearText.setText(`Year: ${this.year}`);
        this.demandText.setText(`Demand: ${this.demand}`);
        this.supplyText.setText(`Supply: ${totalSupply}`);
        this.emissionsText.setText(`Emissions: ${this.totalEmissions}`);
        this.budgetText.setText(`Budget: ${this.budget}`);
    }
}

const moduleScenes = {
    "Ecosystems and Biodiversity": EcosystemScene,
    "Climate Change Basics": ClimateChangeScene,
    "Renewable Energy": RenewableEnergyScene
};
//climate change wala can be removed
// Function to start the interactive lesson
function startInteractiveLesson(module) {
    const sceneConfig = moduleScenes[module.title];
    if (sceneConfig) {
        if (currentGame) {
            currentGame.destroy(true);
            currentGame = null;
        }
        currentGame = new Phaser.Game({
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            parent: 'interactiveLessonContainer',
            scene: sceneConfig
        });
        document.getElementById('interactiveLessonContainer').style.display = 'block';
    } else {
        console.error(`No scene found for module: ${module.title}. Check moduleScenes definition.`);
    }
}
function startInteractiveLesson(module) {
    const sceneConfig = moduleScenes[module.title];
    if (sceneConfig) {
        // Destroy any existing game instance
        if (currentGame) {
            currentGame.destroy(true);
            currentGame = null;
        }
        // Create a new Phaser game instance
        currentGame = new Phaser.Game({
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            parent: 'interactiveLessonContainer',
            scene: sceneConfig
        });
        // Show the game container
        const container = document.getElementById('interactiveLessonContainer');
        if (container) {
            container.style.display = 'block';
        } else {
            console.error("Error: 'interactiveLessonContainer' element not found in HTML.");
        }
    } else {
        console.error(`No scene found for module: ${module.title}. Check moduleScenes definition.`);
    }
}
