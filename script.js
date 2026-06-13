/* =========================================
   ENG103 Study Hub - Content Database (Chapter 1)
========================================= */
const contentDB = {
    flashcards: [
        { q: "What is Technical Communication?", a: "The exchange of information that helps people interact with technology, achieve workplace goals, and solve complex problems." },
        { q: "Give 3 examples of technical communication.", a: "Cell phone manuals, printer setup instructions, emails, and reports." },
        { q: "Is Technical Writing reader-based or writer-based?", a: "Reader-based." },
        { q: "Is Academic Writing reader-based or writer-based?", a: "Writer-based." },
        { q: "Is Technical Writing task-oriented or supportive of the writer's stance?", a: "Task-oriented." },
        { q: "Who creates technical communication?", a: "Professionals, experts, and anyone in a workplace setting." },
        { q: "What does 'user-centered communication' mean?", a: "It focuses on the reader, not the writer." },
        { q: "List 3 main features of technical communication.", a: "Efficient and accessible, clear and relevant, uses media effectively." },
        { q: "Is technical communication based on research?", a: "Yes, it is based on research and must be truthful." },
        { q: "What is the 'Informational' purpose?", a: "To anticipate and answer questions." },
        { q: "What is the 'Instructional' purpose?", a: "To help people perform a specific task." },
        { q: "What is the 'Persuasive' purpose?", a: "To encourage readers to take an action." },
        { q: "Name 4 common types of technical documents.", a: "Memos, Emails, Letters, and Manuals." },
        { q: "According to the summary table, are Memos instructional or informational?", a: "They can be both Instructional and Informational." },
        { q: "Are Proposals informational or persuasive?", a: "Persuasive." }
    ],
    quizzes: [
        { 
            q: "Which of the following defines technical communication?", 
            options: [
                "A formal style of writing used in universities.", 
                "The exchange of information to help people interact with tech and solve problems.", 
                "Writing designed to entertain a global audience."
            ], 
            answer: 1 
        },
        { 
            q: "Which of these is an example of technical communication?", 
            options: [
                "A thesis or dissertation", 
                "A cell phone instruction manual", 
                "An academic research paper"
            ], 
            answer: 1 
        },
        { 
            q: "Academic writing is typically:", 
            options: [
                "Reader-based", 
                "Task-oriented", 
                "Writer-based"
            ], 
            answer: 2 
        },
        { 
            q: "Technical writing relies heavily on:", 
            options: [
                "Paragraph form only", 
                "Design-based elements (visuals, digital, etc.)", 
                "Supporting the writer's stance"
            ], 
            answer: 1 
        },
        { 
            q: "Who can be a technical communicator?", 
            options: [
                "Only certified English teachers", 
                "Anyone in a workplace setting", 
                "Only hardware engineers"
            ], 
            answer: 1 
        },
        { 
            q: "Which of the following is a main feature of technical communication?", 
            options: [
                "Targets a global audience", 
                "Focuses on the writer", 
                "Avoids the use of media"
            ], 
            answer: 0 
        },
        { 
            q: "What is the goal of an 'Instructional' document?", 
            options: [
                "Anticipate and answer questions", 
                "Encourage readers to take an action", 
                "Help people to perform a task"
            ], 
            answer: 2 
        },
        { 
            q: "What is the goal of a 'Persuasive' document?", 
            options: [
                "Anticipate and answer questions", 
                "Encourage readers to take an action", 
                "Help people to perform a task"
            ], 
            answer: 1 
        },
        { 
            q: "Based on the summary table, which document is mainly 'Persuasive'?", 
            options: [
                "Proposals", 
                "Manuals", 
                "Instructions"
            ], 
            answer: 0 
        },
        { 
            q: "Is technical communication persuasive and truthful?", 
            options: [
                "Yes, it is.", 
                "No, it is only informational.", 
                "It is truthful, but never persuasive."
            ], 
            answer: 0 
        }
    ]
};

/* =========================================
   Gamification & Local Storage State
========================================= */
let userState = {
    xp: 0,
    level: 1,
    openedBeats: []
};

// Load State from LocalStorage
function loadState() {
    const saved = localStorage.getItem('eng103_state_ch1');
    if (saved) {
        userState = JSON.parse(saved);
    }
    updateDashboardUI();
}

// Save State
function saveState() {
    localStorage.setItem('eng103_state_ch1', JSON.stringify(userState));
    updateDashboardUI();
}

// Add XP and handle Level Ups
function addXP(amount) {
    userState.xp += amount;
    
    // Level up every 100 XP
    const newLevel = Math.floor(userState.xp / 100) + 1;
    
    showToast(`+${amount} XP Gained!`);

    if (newLevel > userState.level) {
        userState.level = newLevel;
        setTimeout(() => showToast(`🎉 Level Up! You are now Level ${userState.level}`), 1500);
    }
    
    saveState();
}

// Update UI elements for XP and Level
function updateDashboardUI() {
    const xpElement = document.getElementById('user-xp');
    const levelElement = document.getElementById('user-level');
    const nextXpElement = document.getElementById('next-level-xp');
    const progressFill = document.getElementById('xp-progress');

    if(xpElement) xpElement.innerText = userState.xp;
    if(levelElement) levelElement.innerText = userState.level;
    
    const nextXp = userState.level * 100;
    if(nextXpElement) nextXpElement.innerText = nextXp;
    
    if(progressFill) {
        const progressPercent = ((userState.xp % 100) / 100) * 100;
        progressFill.style.width = `${progressPercent}%`;
    }
}

// Toast Notification
function showToast(msg) {
    const toast = document.getElementById('toast');
    if(!toast) return;
    toast.innerText = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

/* =========================================
   Navigation Logic
========================================= */
function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-links li');
    const sections = document.querySelectorAll('.page-section');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all tabs
            navItems.forEach(n => n.classList.remove('active'));
            // Add active class to clicked tab
            item.classList.add('active');
            
            // Show corresponding section
            const target = item.getAttribute('data-target');
            sections.forEach(sec => sec.classList.remove('active'));
            document.getElementById(target).classList.add('active');
        });
    });
}

/* =========================================
   Study Beats Logic (Accordion)
========================================= */
function toggleBeat(element) {
    const parent = element.parentElement;
    const beatTitle = element.querySelector('span').innerText;
    
    parent.classList.toggle('active');
    
    // Reward XP for opening a beat for the first time
    if (parent.classList.contains('active') && !userState.openedBeats.includes(beatTitle)) {
        userState.openedBeats.push(beatTitle);
        addXP(5); // 5 XP per beat
    }
}

/* =========================================
   Flashcards Logic
========================================= */
let currentCardIndex = 0;
const cards = contentDB.flashcards;

function setupFlashcards() {
    const container = document.getElementById('flashcard-container');
    if(!container) return;

    container.innerHTML = `
        <div class="flashcard-controls">
            <button id="prev-card" class="btn"><i class="fas fa-arrow-left"></i></button>
            <span id="card-counter">1 / ${cards.length}</span>
            <button id="next-card" class="btn"><i class="fas fa-arrow-right"></i></button>
        </div>
        <div class="flashcard-wrapper">
            <div class="flashcard" id="active-flashcard">
                <div class="flashcard-inner">
                    <div class="flashcard-front glass-card" id="card-front"></div>
                    <div class="flashcard-back glass-card" id="card-back"></div>
                </div>
            </div>
        </div>
        <div class="tap-hint"><i class="fas fa-hand-pointer"></i> Tap to flip</div>
    `;

    renderFlashcard();

    // Flip Event
    document.getElementById('active-flashcard').addEventListener('click', function() {
        this.classList.toggle('flipped');
        if(this.classList.contains('flipped')) {
            // Small XP reward for interacting
            if(Math.random() > 0.7) addXP(1); // Random small reward to prevent farming
        }
    });

    // Navigation Events
    document.getElementById('prev-card').addEventListener('click', () => {
        if (currentCardIndex > 0) {
            currentCardIndex--;
            renderFlashcard();
        }
    });

    document.getElementById('next-card').addEventListener('click', () => {
        if (currentCardIndex < cards.length - 1) {
            currentCardIndex++;
            renderFlashcard();
        }
    });
}

function renderFlashcard() {
    const counter = document.getElementById('card-counter');
    const front = document.getElementById('card-front');
    const back = document.getElementById('card-back');
    const cardEl = document.getElementById('active-flashcard');

    if(counter && front && back && cardEl) {
        counter.innerText = `${currentCardIndex + 1} / ${cards.length}`;
        front.innerHTML = `<h3>${cards[currentCardIndex].q}</h3>`;
        back.innerHTML = `<h3>${cards[currentCardIndex].a}</h3>`;
        cardEl.classList.remove('flipped'); // Reset flip state
    }
}

/* =========================================
   Quiz Arena Logic
========================================= */
let currentQuizIndex = 0;
let score = 0;
let selectedOption = null;
const quizzes = contentDB.quizzes;

function setupQuiz() {
    const container = document.getElementById('quiz-container');
    if(!container) return;

    container.innerHTML = `
        <div id="quiz-intro" class="quiz-state active text-center">
            <div class="glass-card p-4">
                <h3>Test Your Knowledge!</h3>
                <p class="mt-4 mb-4 text-muted">Answer ${quizzes.length} questions based on Chapter 1.</p>
                <p style="color: var(--accent-green); margin-bottom: 20px;">Correct Answer = +10 XP</p>
                <button id="start-quiz-btn" class="btn btn-primary">Start Quiz Now</button>
            </div>
        </div>

        <div id="quiz-active" class="quiz-state">
            <div class="quiz-header">
                <span id="quiz-progress-text">Question 1/${quizzes.length}</span>
                <span id="quiz-score-text">Score: 0</span>
            </div>
            <div class="progress-bg mb-4">
                <div class="progress-fill" id="quiz-progress-bar" style="width: 0%"></div>
            </div>
            <div class="glass-card">
                <h3 id="quiz-question" class="mb-4"></h3>
                <div id="quiz-options" class="options-grid"></div>
                <button id="submit-quiz-btn" class="btn btn-primary w-100" disabled>Submit Answer</button>
            </div>
        </div>

        <div id="quiz-result" class="quiz-state text-center">
            <div class="glass-card p-4">
                <h1 class="mb-2">Quiz Completed!</h1>
                <h2 id="final-score" style="color: var(--primary-blue);" class="mb-4">Score: 0/${quizzes.length}</h2>
                <button id="restart-quiz-btn" class="btn btn-primary">Retake Quiz</button>
            </div>
        </div>
    `;

    document.getElementById('start-quiz-btn').addEventListener('click', startQuiz);
    document.getElementById('restart-quiz-btn').addEventListener('click', startQuiz);
}

function startQuiz() {
    document.getElementById('quiz-intro').classList.remove('active');
    document.getElementById('quiz-result').classList.remove('active');
    document.getElementById('quiz-active').classList.add('active');
    currentQuizIndex = 0;
    score = 0;
    renderQuizQuestion();
}

function renderQuizQuestion() {
    selectedOption = null;
    const qData = quizzes[currentQuizIndex];
    
    document.getElementById('quiz-progress-text').innerText = `Question ${currentQuizIndex + 1}/${quizzes.length}`;
    document.getElementById('quiz-score-text').innerText = `Score: ${score}`;
    document.getElementById('quiz-progress-bar').style.width = `${((currentQuizIndex) / quizzes.length) * 100}%`;
    document.getElementById('quiz-question').innerText = qData.q;
    
    const optionsContainer = document.getElementById('quiz-options');
    optionsContainer.innerHTML = '';
    
    qData.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerText = opt;
        btn.onclick = () => selectQuizOption(btn, idx);
        optionsContainer.appendChild(btn);
    });

    const submitBtn = document.getElementById('submit-quiz-btn');
    submitBtn.disabled = true;
    submitBtn.innerText = "Submit Answer";
    submitBtn.onclick = checkQuizAnswer;
}

function selectQuizOption(btn, idx) {
    const allBtns = document.querySelectorAll('.option-btn');
    allBtns.forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    selectedOption = idx;
    document.getElementById('submit-quiz-btn').disabled = false;
}

function checkQuizAnswer() {
    const qData = quizzes[currentQuizIndex];
    const allBtns = document.querySelectorAll('.option-btn');
    const submitBtn = document.getElementById('submit-quiz-btn');

    // Disable all options after submission
    allBtns.forEach(btn => btn.disabled = true);

    if (selectedOption === qData.answer) {
        allBtns[selectedOption].classList.add('correct');
        score++;
        addXP(10); // Reward 10 XP for correct answer
    } else {
        allBtns[selectedOption].classList.add('wrong');
        allBtns[qData.answer].classList.add('correct');
    }

    submitBtn.innerText = "Next Question";
    submitBtn.onclick = nextQuizQuestion;
}

function nextQuizQuestion() {
    currentQuizIndex++;
    if (currentQuizIndex < quizzes.length) {
        renderQuizQuestion();
    } else {
        finishQuiz();
    }
}

function finishQuiz() {
    document.getElementById('quiz-active').classList.remove('active');
    document.getElementById('quiz-result').classList.add('active');
    
    document.getElementById('final-score').innerText = `Score: ${score}/${quizzes.length}`;
    
    // Bonus XP for finishing
    if(score === quizzes.length) {
        setTimeout(() => addXP(50), 500); // 50 XP bonus for perfect score
    } else if (score > quizzes.length / 2) {
        setTimeout(() => addXP(20), 500); // 20 XP bonus for passing
    }
}

/* =========================================
   Initialization
========================================= */
window.onload = () => {
    loadState();
    setupNavigation();
    setupFlashcards();
    setupQuiz();
};
