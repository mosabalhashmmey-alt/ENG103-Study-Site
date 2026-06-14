const contentDB = {
    1: {
        overview: "This chapter covers the foundations of Technical Writing for ENG 103, including its definitions, differences from academic writing, main features, purposes, and common document types.",
        flashcards: [
            { q: "What is Technical Communication?", a: "The exchange of information that helps people interact with technology, achieve workplace goals, and solve complex problems." },
            { q: "Give 3 examples of technical communication.", a: "Cell phone manuals, printer setup instructions, emails, and reports." },
            { q: "Is Technical Writing reader-based or writer-based?", a: "Reader-based." },
            { q: "Is Academic Writing reader-based or writer-based?", a: "Writer-based." },
            { q: "Who creates technical communication?", a: "Professionals, experts, and anyone in a workplace setting." },
            { q: "What does 'user-centered communication' mean?", a: "It focuses on the reader, not the writer." },
            { q: "List 3 main features of technical communication.", a: "Efficient and accessible, clear and relevant, uses media effectively." },
            { q: "What is the 'Informational' purpose?", a: "To anticipate and answer questions." },
            { q: "What is the 'Instructional' purpose?", a: "To help people perform a specific task." },
            { q: "What is the 'Persuasive' purpose?", a: "To encourage readers to take an action." }
        ],
        quizzes: [
            { q: "Which of the following defines technical communication?", options: ["A formal style of writing used in universities.", "The exchange of information to help people interact with tech and solve problems.", "Writing designed to entertain a global audience."], answer: 1 },
            { q: "Which of these is an example of technical communication?", options: ["A thesis or dissertation", "A cell phone instruction manual", "An academic research paper"], answer: 1 },
            { q: "Academic writing is typically:", options: ["Reader-based", "Task-oriented", "Writer-based"], answer: 2 },
            { q: "Technical writing relies heavily on:", options: ["Paragraph form only", "Design-based elements (visuals, digital, etc.)", "Supporting the writer's stance"], answer: 1 },
            { q: "What is the goal of an 'Instructional' document?", options: ["Anticipate and answer questions", "Encourage readers to take an action", "Help people to perform a task"], answer: 2 }
        ]
    },
    2: {
        overview: "This chapter focuses on the importance of proofreading and provides effective strategies to ensure your technical documents are clear, professional, and error-free.",
        flashcards: [
            { q: "Why is proofreading important?", a: "Basic errors distract the reader and make the writer look careless." },
            { q: "Should you proofread immediately after writing?", a: "No, you should take a break before proofreading your final document." },
            { q: "Is it better to proofread on a screen or hard copy?", a: "It is better to work from a hard copy." },
            { q: "Should you rely completely on tools like Grammarly?", a: "No, never rely only on computerized writing aids." },
            { q: "How many times should you proofread a document?", a: "You should proofread more than once." },
            { q: "When is the best time to proofread?", a: "Save it for the final draft." }
        ],
        quizzes: [
            { q: "What is a major consequence of failing to proofread?", options: ["It makes the document longer", "It distracts the reader and makes the writer look careless", "It improves the document design"], answer: 1 },
            { q: "Which of the following is an effective strategy for proofreading?", options: ["Proofread immediately after writing", "Work from a hard copy", "Rely entirely on Grammarly"], answer: 1 },
            { q: "True or False: You should proofread your document only once.", options: ["True", "False", "Only if it is an email"], answer: 1 },
            { q: "When is the best time to focus on proofreading?", options: ["During the brainstorming phase", "While writing the first draft", "Save it for the final draft"], answer: 2 },
            { q: "According to the strategies, how fast should you proofread?", options: ["As fast as possible", "Keep it slow", "Skim the document"], answer: 1 }
        ]
    },
    3: {
        overview: "This chapter introduces the research process in technical communication, covering critical thinking, primary versus secondary sources, and strategies for evaluating both hard-copy and web-based information.",
        flashcards: [
            { q: "What does critical thinking about research mean?", a: "Testing the quality of information and accuracy of interpretations instead of accepting them at face value." },
            { q: "What is Primary Research?", a: "Getting info directly from the source (e.g., interviews, surveys, observing people)." },
            { q: "What is Secondary Research?", a: "Getting info second-hand by reading compiled works (e.g., books, articles, websites)." },
            { q: "Name a benefit of hard-copy sources.", a: "Easier to preserve and keep secure, and easy to determine the author/date." },
            { q: "Name a drawback of web-based sources.", a: "They are not always reliable and the user might get confused by too many choices." },
            { q: "What are Bibliographies?", a: "Lists of books and articles by subject field." },
            { q: "What are Almanacs?", a: "Collections of factual and statistical data." },
            { q: "What is Gray Literature?", a: "Materials that may not be available at any library or unpublished materials." }
        ],
        quizzes: [
            { q: "Which of the following is considered Primary Research?", options: ["Reading a library book", "Conducting a survey", "Searching an online database"], answer: 1 },
            { q: "Which of the following is a benefit of Web-Based sources?", options: ["They are always 100% reliable", "Searches can be narrowed or broadened easily", "They are easier to preserve securely than paper"], answer: 1 },
            { q: "When researching on the internet, you should:", options: ["Select technical keywords rather than general ones", "Rely on the first result you find", "Download everything without checking permission"], answer: 0 },
            { q: "What type of reference work provides alphabetically arranged lists of words with definitions?", options: ["Indexes", "Almanacs", "Dictionaries"], answer: 2 },
            { q: "To evaluate sources critically, you should:", options: ["Accept all information at face value", "Ask the right questions and evaluate the author's credentials", "Rely entirely on AI tools"], answer: 1 }
        ]
    }
};

let currentChapterId = 1;
let userState = { xp: 0, level: 1, openedBeats: [] };

function loadState() {
    const saved = localStorage.getItem('eng103_state');
    if (saved) userState = JSON.parse(saved);
    updateDashboardUI();
}

function saveState() {
    localStorage.setItem('eng103_state', JSON.stringify(userState));
    updateDashboardUI();
}

function addXP(amount) {
    userState.xp += amount;
    const newLevel = Math.floor(userState.xp / 100) + 1;
    showToast(`+${amount} XP Gained!`);
    if (newLevel > userState.level) {
        userState.level = newLevel;
        setTimeout(() => showToast(`Level Up! You are now Level ${userState.level}`), 1500);
    }
    saveState();
}

function updateDashboardUI() {
    document.getElementById('user-xp').innerText = userState.xp;
    document.getElementById('user-level').innerText = userState.level;
    document.getElementById('next-level-xp').innerText = userState.level * 100;
    const progressPercent = ((userState.xp % 100) / 100) * 100;
    document.getElementById('xp-progress').style.width = `${progressPercent}%`;
}

function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.innerText = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-links li');
    const sections = document.querySelectorAll('.page-section');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(n => n.classList.remove('active'));
            item.classList.add('active');
            const target = item.getAttribute('data-target');
            sections.forEach(sec => sec.classList.remove('active'));
            document.getElementById(target).classList.add('active');
        });
    });
}

function toggleBeat(element) {
    const parent = element.parentElement;
    const beatTitle = element.querySelector('span').innerText;
    parent.classList.toggle('active');
    if (parent.classList.contains('active') && !userState.openedBeats.includes(beatTitle)) {
        userState.openedBeats.push(beatTitle);
        addXP(5);
    }
}

let currentCardIndex = 0;
let cards = contentDB[currentChapterId].flashcards;

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
    
    document.getElementById('active-flashcard').onclick = function() {
        this.classList.toggle('flipped');
        if(this.classList.contains('flipped') && Math.random() > 0.5) addXP(1);
    };
    document.getElementById('prev-card').onclick = () => {
        if (currentCardIndex > 0) { currentCardIndex--; renderFlashcard(); }
    };
    document.getElementById('next-card').onclick = () => {
        if (currentCardIndex < cards.length - 1) { currentCardIndex++; renderFlashcard(); }
    };
}

function renderFlashcard() {
    document.getElementById('card-counter').innerText = `${currentCardIndex + 1} / ${cards.length}`;
    document.getElementById('card-front').innerHTML = `<h3>${cards[currentCardIndex].q}</h3>`;
    document.getElementById('card-back').innerHTML = `<h3>${cards[currentCardIndex].a}</h3>`;
    document.getElementById('active-flashcard').classList.remove('flipped');
}

let currentQuizIndex = 0;
let score = 0;
let selectedOption = null;
let quizzes = contentDB[currentChapterId].quizzes;

function setupQuiz() {
    const container = document.getElementById('quiz-container');
    if(!container) return;
    container.innerHTML = `
        <div id="quiz-intro" class="quiz-state active text-center">
            <div class="glass-card p-4">
                <h3>Test Your Knowledge!</h3>
                <p class="mt-4 mb-4">Correct Answer = +10 XP</p>
                <button id="start-quiz-btn" class="btn btn-primary">Start Quiz</button>
            </div>
        </div>
        <div id="quiz-active" class="quiz-state">
            <div class="quiz-header">
                <span id="quiz-progress-text">Q 1/${quizzes.length}</span>
                <span id="quiz-score-text">Score: 0</span>
            </div>
            <div class="glass-card">
                <h3 id="quiz-question" class="mb-4"></h3>
                <div id="quiz-options" class="options-grid"></div>
                <button id="submit-quiz-btn" class="btn btn-primary w-100" disabled>Submit</button>
            </div>
        </div>
        <div id="quiz-result" class="quiz-state text-center">
            <div class="glass-card p-4">
                <h1 class="mb-2">Completed!</h1>
                <h2 id="final-score" class="mb-4 text-primary">Score: 0/${quizzes.length}</h2>
                <button id="restart-quiz-btn" class="btn btn-primary">Retake</button>
            </div>
        </div>
    `;
    document.getElementById('start-quiz-btn').onclick = startQuiz;
    document.getElementById('restart-quiz-btn').onclick = startQuiz;
}

function startQuiz() {
    document.getElementById('quiz-intro').classList.remove('active');
    document.getElementById('quiz-result').classList.remove('active');
    document.getElementById('quiz-active').classList.add('active');
    currentQuizIndex = 0; score = 0;
    renderQuizQuestion();
}

function renderQuizQuestion() {
    selectedOption = null;
    const qData = quizzes[currentQuizIndex];
    document.getElementById('quiz-progress-text').innerText = `Q ${currentQuizIndex + 1}/${quizzes.length}`;
    document.getElementById('quiz-score-text').innerText = `Score: ${score}`;
    document.getElementById('quiz-question').innerText = qData.q;
    
    const optionsContainer = document.getElementById('quiz-options');
    optionsContainer.innerHTML = '';
    
    qData.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerText = opt;
        btn.onclick = () => {
            document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            selectedOption = idx;
            document.getElementById('submit-quiz-btn').disabled = false;
        };
        optionsContainer.appendChild(btn);
    });

    const submitBtn = document.getElementById('submit-quiz-btn');
    submitBtn.disabled = true;
    submitBtn.innerText = "Submit";
    submitBtn.onclick = checkQuizAnswer;
}

function checkQuizAnswer() {
    const qData = quizzes[currentQuizIndex];
    const allBtns = document.querySelectorAll('.option-btn');
    allBtns.forEach(btn => btn.disabled = true);

    if (selectedOption === qData.answer) {
        allBtns[selectedOption].classList.add('correct');
        score++;
        addXP(10);
    } else {
        allBtns[selectedOption].classList.add('wrong');
        allBtns[qData.answer].classList.add('correct');
    }

    const submitBtn = document.getElementById('submit-quiz-btn');
    submitBtn.innerText = "Next";
    submitBtn.onclick = () => {
        currentQuizIndex++;
        if (currentQuizIndex < quizzes.length) renderQuizQuestion();
        else {
            document.getElementById('quiz-active').classList.remove('active');
            document.getElementById('quiz-result').classList.add('active');
            document.getElementById('final-score').innerText = `Score: ${score}/${quizzes.length}`;
            if(score === quizzes.length) addXP(50);
        }
    };
}

window.changeChapter = function(chapterId) {
    currentChapterId = chapterId;

    // تحديث البطاقات والاختبارات
    cards = contentDB[currentChapterId].flashcards;
    quizzes = contentDB[currentChapterId].quizzes;

    currentCardIndex = 0;
    setupFlashcards();
    setupQuiz();

    // تحديث صناديق الـ Beats
    document.querySelectorAll('.chapter-beats').forEach(div => div.style.display = 'none');
    const activeBeats = document.getElementById(`beats-ch${chapterId}`);
    if(activeBeats) activeBeats.style.display = 'block';

    // تحديث قسم הـ Overview بذكاء
    const overviewEl = document.getElementById('chapter-overview');
    if (overviewEl && contentDB[currentChapterId].overview) {
        overviewEl.innerText = contentDB[currentChapterId].overview;
    }

    showToast(`Switched to Chapter ${chapterId} Successfully!`);
};

window.onload = () => {
    loadState();
    setupNavigation();
    setupFlashcards();
    setupQuiz();
    
    // للتأكد من تحميل Overview الشابتر الأول عند بداية تشغيل الموقع
    const overviewEl = document.getElementById('chapter-overview');
    if (overviewEl && contentDB[currentChapterId].overview) {
        overviewEl.innerText = contentDB[currentChapterId].overview;
    }
};
