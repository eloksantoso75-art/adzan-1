const defaultConfig = {
    app_title: "🕌 Belajar Adzan Yuk! 🕌",
    menu_lafal: "Lafal Adzan",
    menu_doa: "Doa Setelah Adzan",
    menu_materi: "Materi Adzan",
    menu_kompetisi: "Kompetisi",
    primary_color: "#2196F3",
    secondary_color: "#4CAF50",
    background_color: "#87CEEB",
    text_color: "#333333",
    accent_color: "#FF6B6B"
};

let config = { ...defaultConfig };

// Audio elements
const adzanAudio = document.getElementById('adzan-audio');
const doaAudio = document.getElementById('doa-audio');
const backsoundAudio = document.getElementById('backsound-audio');
const klikAudio = document.getElementById('klik-audio');
const successAudio = document.getElementById('success-audio');
const wrongAudio = document.getElementById('wrong-audio');

// Play click sound on button clicks
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            playClickSound();
        });
    });
    
    // Start backsound when page loads
    playBacksound();
});

function playClickSound() {
    klikAudio.currentTime = 0;
    klikAudio.play().catch(e => console.log("Error playing click sound:", e));
}

function playBacksound() {
    backsoundAudio.play().catch(e => console.log("Error playing backsound:", e));
}

function stopBacksound() {
    backsoundAudio.pause();
    backsoundAudio.currentTime = 0;
}

function playSuccessSound() {
    successAudio.currentTime = 0;
    successAudio.play().catch(e => console.log("Error playing success sound:", e));
}

function playWrongSound() {
    wrongAudio.currentTime = 0;
    wrongAudio.play().catch(e => console.log("Error playing wrong sound:", e));
}

// Navigation
function showPage(pageName) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    document.getElementById('page-' + pageName).classList.add('active');
    
    if (pageName === 'kompetisi') {
        resetGame();
    }
}

// Audio functions
function playAdzan() {
    const icon = document.getElementById('adzan-icon');
    const text = document.getElementById('adzan-text');
    const button = document.getElementById('play-adzan');
    
    if (adzanAudio.paused) {
        stopBacksound();
        adzanAudio.currentTime = 0;
        adzanAudio.play().catch(e => console.log("Error playing adzan:", e));
        icon.textContent = '⏸️';
        text.textContent = 'Jeda Adzan';
        button.disabled = true;
        
        adzanAudio.onended = function() {
            icon.textContent = '▶️';
            text.textContent = 'Putar Suara Adzan';
            button.disabled = false;
            playBacksound();
        };
    }
}

function playDoa() {
    const icon = document.getElementById('doa-icon');
    const text = document.getElementById('doa-text');
    const button = document.getElementById('play-doa');
    
    if (doaAudio.paused) {
        stopBacksound();
        doaAudio.currentTime = 0;
        doaAudio.play().catch(e => console.log("Error playing doa:", e));
        icon.textContent = '⏸️';
        text.textContent = 'Jeda Doa';
        button.disabled = true;
        
        doaAudio.onended = function() {
            icon.textContent = '▶️';
            text.textContent = 'Putar Doa';
            button.disabled = false;
            playBacksound();
        };
    }
}

// Game Logic
const questionsPlayer1 = [
    { q: "Apa arti kata 'Adzan'?", a: ["Pemberitahuan", "Doa", "Shalat", "Puasa"], correct: 0 },
    { q: "Siapa yang boleh mengumandangkan adzan?", a: ["Laki-laki muslim", "Perempuan", "Anak kecil", "Siapa saja"], correct: 0 },
    { q: "Kapan adzan dikumandangkan?", a: ["Saat waktu shalat tiba", "Pagi hari", "Malam hari", "Kapan saja"], correct: 0 },
    { q: "Berapa kali kalimat 'Allahu Akbar' di awal adzan?", a: ["4 kali", "2 kali", "3 kali", "5 kali"], correct: 0 },
    { q: "Apa yang harus dilakukan saat mendengar adzan?", a: ["Mengikuti bacaan adzan", "Bermain", "Tidur", "Makan"], correct: 0 },
    { q: "Ke arah mana muadzin menghadap saat adzan?", a: ["Kiblat", "Utara", "Selatan", "Timur"], correct: 0 },
    { q: "Apa yang sunah dilakukan sebelum adzan?", a: ["Berwudhu", "Makan", "Tidur", "Bermain"], correct: 0 },
    { q: "Mengapa muadzin memasukkan jari ke telinga?", a: ["Agar suara lebih keras", "Agar tidak sakit", "Agar bagus", "Tidak ada alasan"], correct: 0 },
    { q: "Apa doa yang dibaca setelah adzan?", a: ["Doa setelah adzan", "Doa makan", "Doa tidur", "Doa bangun"], correct: 0 },
    { q: "Apa hikmah dari adzan?", a: ["Mengingatkan waktu shalat", "Hiburan", "Olahraga", "Permainan"], correct: 0 },
    { q: "Siapa yang lari saat mendengar adzan?", a: ["Setan", "Malaikat", "Manusia", "Hewan"], correct: 0 },
    { q: "Berapa kali shalat fardhu dalam sehari?", a: ["5 kali", "3 kali", "4 kali", "6 kali"], correct: 0 },
    { q: "Apa arti 'Hayya 'alash shalah'?", a: ["Marilah shalat", "Allah Maha Besar", "Tidak ada Tuhan", "Muhammad Rasul"], correct: 0 },
    { q: "Apa arti 'Hayya 'alal falah'?", a: ["Marilah menuju keberuntungan", "Marilah shalat", "Allah Besar", "Tidak ada Tuhan"], correct: 0 },
    { q: "Posisi apa yang sunah saat adzan?", a: ["Berdiri", "Duduk", "Tidur", "Berlari"], correct: 0 },
    { q: "Apa yang harus kita lakukan setelah adzan?", a: ["Segera shalat", "Bermain", "Tidur", "Makan"], correct: 0 },
    { q: "Berapa kali kalimat syahadat dalam adzan?", a: ["4 kali", "2 kali", "3 kali", "5 kali"], correct: 0 },
    { q: "Apa syarat orang yang mengumandangkan adzan?", a: ["Beragama Islam", "Kaya", "Pintar", "Tinggi"], correct: 0 },
    { q: "Dimana biasanya adzan dikumandangkan?", a: ["Masjid", "Rumah", "Sekolah", "Pasar"], correct: 0 },
    { q: "Apa yang dimaksud dengan muadzin?", a: ["Orang yang adzan", "Orang yang shalat", "Orang yang puasa", "Orang yang zakat"], correct: 0 }
];

const questionsPlayer2 = [
    { q: "Apa kalimat pertama dalam adzan?", a: ["Allahu Akbar", "Asyhadu", "Hayya", "La ilaha"], correct: 0 },
    { q: "Apa kalimat terakhir dalam adzan?", a: ["La ilaha illallah", "Allahu Akbar", "Asyhadu", "Hayya"], correct: 0 },
    { q: "Berapa jumlah kalimat dalam adzan?", a: ["15 kalimat", "10 kalimat", "20 kalimat", "5 kalimat"], correct: 0 },
    { q: "Apa yang harus kita ucapkan saat muadzin bilang 'Allahu Akbar'?", a: ["Allahu Akbar", "Amin", "Subhanallah", "Alhamdulillah"], correct: 0 },
    { q: "Kapan waktu shalat Subuh?", a: ["Sebelum matahari terbit", "Siang hari", "Sore hari", "Malam hari"], correct: 0 },
    { q: "Kapan waktu shalat Dzuhur?", a: ["Siang hari", "Pagi hari", "Sore hari", "Malam hari"], correct: 0 },
    { q: "Kapan waktu shalat Ashar?", a: ["Sore hari", "Pagi hari", "Siang hari", "Malam hari"], correct: 0 },
    { q: "Kapan waktu shalat Maghrib?", a: ["Setelah matahari terbenam", "Pagi hari", "Siang hari", "Tengah malam"], correct: 0 },
    { q: "Kapan waktu shalat Isya?", a: ["Malam hari", "Pagi hari", "Siang hari", "Sore hari"], correct: 0 },
    { q: "Apa arti 'Allahu Akbar'?", a: ["Allah Maha Besar", "Allah Maha Kuasa", "Allah Maha Tinggi", "Allah Maha Adil"], correct: 0 },
    { q: "Apa yang dimaksud dengan 'Asyhadu'?", a: ["Aku bersaksi", "Aku percaya", "Aku tahu", "Aku suka"], correct: 0 },
    { q: "Siapa Nabi yang mengajarkan adzan?", a: ["Nabi Muhammad SAW", "Nabi Musa AS", "Nabi Isa AS", "Nabi Ibrahim AS"], correct: 0 },
    { q: "Apa yang harus kita lakukan saat mendengar 'Hayya 'alash shalah'?", a: ["Mengikuti ucapannya", "Diam saja", "Bermain", "Tidur"], correct: 0 },
    { q: "Mengapa kita harus shalat?", a: ["Perintah Allah", "Tradisi", "Kebiasaan", "Hobi"], correct: 0 },
    { q: "Apa pahala orang yang mengumandangkan adzan?", a: ["Pahala besar", "Tidak ada", "Sedikit", "Biasa saja"], correct: 0 },
    { q: "Bolehkah berbicara saat adzan?", a: ["Tidak boleh", "Boleh", "Kadang-kadang", "Terserah"], correct: 0 },
    { q: "Apa yang harus kita baca setelah adzan selesai?", a: ["Doa setelah adzan", "Al-Fatihah", "Ayat Kursi", "Surat Ikhlas"], correct: 0 },
    { q: "Berapa kali adzan dalam sehari?", a: ["5 kali", "3 kali", "4 kali", "6 kali"], correct: 0 },
    { q: "Apa perbedaan adzan dan iqamah?", a: ["Iqamah lebih cepat", "Sama saja", "Iqamah lebih lambat", "Tidak ada bedanya"], correct: 0 },
    { q: "Apa yang dimaksud dengan waktu shalat?", a: ["Waktu untuk melaksanakan shalat", "Waktu bermain", "Waktu makan", "Waktu tidur"], correct: 0 }
];

let gameState = {
    player1: { score: 0, currentQ: 0, questions: [] },
    player2: { score: 0, currentQ: 0, questions: [] },
    timer: 0,
    timerInterval: null,
    gameActive: false
};

function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

function startGame() {
    gameState.player1 = { score: 0, currentQ: 0, questions: shuffleArray(questionsPlayer1) };
    gameState.player2 = { score: 0, currentQ: 0, questions: shuffleArray(questionsPlayer2) };
    gameState.timer = 0;
    gameState.gameActive = true;
    
    document.getElementById('winner-message').classList.remove('show');
    document.getElementById('start-game').disabled = true;
    document.getElementById('start-game').textContent = '🎮 Permainan Berlangsung...';
    
    updateScore(1);
    updateScore(2);
    showQuestion(1);
    showQuestion(2);
    
    gameState.timerInterval = setInterval(() => {
        gameState.timer++;
        const minutes = Math.floor(gameState.timer / 60);
        const seconds = gameState.timer % 60;
        document.getElementById('timer').textContent = 
            `Waktu: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }, 1000);
}

function showQuestion(player) {
    const state = player === 1 ? gameState.player1 : gameState.player2;
    
    if (state.currentQ >= 20) {
        return;
    }
    
    const question = state.questions[state.currentQ];
    document.getElementById(`question${player}`).textContent = 
        `Soal ${state.currentQ + 1}/20: ${question.q}`;
    
    const answersDiv = document.getElementById(`answers${player}`);
    answersDiv.innerHTML = '';
    
    question.a.forEach((answer, index) => {
        const button = document.createElement('button');
        button.className = 'answer-button';
        button.textContent = answer;
        button.onclick = () => checkAnswer(player, index);
        answersDiv.appendChild(button);
    });
}

function checkAnswer(player, answerIndex) {
    if (!gameState.gameActive) return;
    
    const state = player === 1 ? gameState.player1 : gameState.player2;
    const question = state.questions[state.currentQ];
    const buttons = document.querySelectorAll(`#answers${player} .answer-button`);
    
    buttons.forEach(btn => btn.disabled = true);
    
    if (answerIndex === question.correct) {
        buttons[answerIndex].classList.add('correct');
        state.score++;
        updateScore(player);
        updateClimber(player);
        playSuccessSound();
    } else {
        buttons[answerIndex].classList.add('wrong');
        buttons[question.correct].classList.add('correct');
        playWrongSound();
    }
    
    setTimeout(() => {
        state.currentQ++;
        if (state.currentQ < 20) {
            showQuestion(player);
        } else {
            checkGameEnd();
        }
    }, 1500);
}

function updateScore(player) {
    const state = player === 1 ? gameState.player1 : gameState.player2;
    document.getElementById(`score${player}`).textContent = `${state.score} / 20`;
}

function updateClimber(player) {
    const state = player === 1 ? gameState.player1 : gameState.player2;
    const climber = document.getElementById(`climber${player}`);
    const progress = (state.score / 20) * 100;
    climber.style.bottom = `${progress}%`;
}

function checkGameEnd() {
    if (gameState.player1.currentQ >= 20 && gameState.player2.currentQ >= 20) {
        gameState.gameActive = false;
        clearInterval(gameState.timerInterval);
        
        const winner = document.getElementById('winner-message');
        if (gameState.player1.score > gameState.player2.score) {
            winner.textContent = '🎉 Pemain 1 Menang! 🏆';
        } else if (gameState.player2.score > gameState.player1.score) {
            winner.textContent = '🎉 Pemain 2 Menang! 🏆';
        } else {
            winner.textContent = '🤝 Seri! Kedua Pemain Hebat! 🌟';
        }
        winner.classList.add('show');
        
        document.getElementById('start-game').disabled = false;
        document.getElementById('start-game').textContent = '🔄 Main Lagi';
    }
}

function resetGame() {
    gameState = {
        player1: { score: 0, currentQ: 0, questions: [] },
        player2: { score: 0, currentQ: 0, questions: [] },
        timer: 0,
        timerInterval: null,
        gameActive: false
    };
    
    if (gameState.timerInterval) {
        clearInterval(gameState.timerInterval);
    }
    
    document.getElementById('timer').textContent = 'Waktu: 00:00';
    document.getElementById('score1').textContent = '0 / 20';
    document.getElementById('score2').textContent = '0 / 20';
    document.getElementById('climber1').style.bottom = '0%';
    document.getElementById('climber2').style.bottom = '0%';
    document.getElementById('question1').textContent = 'Klik "Mulai Kompetisi" untuk memulai!';
    document.getElementById('question2').textContent = 'Klik "Mulai Kompetisi" untuk memulai!';
    document.getElementById('answers1').innerHTML = '';
    document.getElementById('answers2').innerHTML = '';
    document.getElementById('winner-message').classList.remove('show');
    document.getElementById('start-game').disabled = false;
    document.getElementById('start-game').textContent = '🚀 Mulai Kompetisi';
}

// Element SDK Implementation
async function onConfigChange(newConfig) {
    const titleElement = document.getElementById('main-title');
    const menuLafalElement = document.getElementById('menu-lafal-text');
    const menuDoaElement = document.getElementById('menu-doa-text');
    const menuMateriElement = document.getElementById('menu-materi-text');
    const menuKompetisiElement = document.getElementById('menu-kompetisi-text');

    if (titleElement) {
        titleElement.textContent = newConfig.app_title || defaultConfig.app_title;
    }
    if (menuLafalElement) {
        menuLafalElement.textContent = newConfig.menu_lafal || defaultConfig.menu_lafal;
    }
    if (menuDoaElement) {
        menuDoaElement.textContent = newConfig.menu_doa || defaultConfig.menu_doa;
    }
    if (menuMateriElement) {
        menuMateriElement.textContent = newConfig.menu_materi || defaultConfig.menu_materi;
    }
    if (menuKompetisiElement) {
        menuKompetisiElement.textContent = newConfig.menu_kompetisi || defaultConfig.menu_kompetisi;
    }

    document.body.style.background = `linear-gradient(135deg, ${newConfig.background_color || defaultConfig.background_color} 0%, #98D8E8 100%)`;

    const menuButtons = document.querySelectorAll('.menu-button');
    menuButtons.forEach(button => {
        button.style.borderLeft = `5px solid ${newConfig.primary_color || defaultConfig.primary_color}`;
    });

    const playButtons = document.querySelectorAll('.play-button');
    playButtons.forEach(button => {
        button.style.background = `linear-gradient(45deg, ${newConfig.secondary_color || defaultConfig.secondary_color}, #45a049)`;
    });

    const headers = document.querySelectorAll('.header h1');
    headers.forEach(header => {
        header.style.background = `linear-gradient(45deg, ${newConfig.secondary_color || defaultConfig.secondary_color}, ${newConfig.primary_color || defaultConfig.primary_color})`;
        header.style.webkitBackgroundClip = 'text';
        header.style.webkitTextFillColor = 'transparent';
        header.style.backgroundClip = 'text';
    });

    const startButton = document.getElementById('start-game');
    if (startButton) {
        startButton.style.background = `linear-gradient(45deg, ${newConfig.accent_color || defaultConfig.accent_color}, #ff5252)`;
    }
}

if (window.elementSdk) {
    window.elementSdk.init({
        defaultConfig: defaultConfig,
        onConfigChange: onConfigChange,
        mapToCapabilities: (config) => ({
            recolorables: [
                {
                    get: () => config.background_color || defaultConfig.background_color,
                    set: (value) => {
                        config.background_color = value;
                        window.elementSdk.setConfig({ background_color: value });
                    }
                },
                {
                    get: () => config.primary_color || defaultConfig.primary_color,
                    set: (value) => {
                        config.primary_color = value;
                        window.elementSdk.setConfig({ primary_color: value });
                    }
                },
                {
                    get: () => config.text_color || defaultConfig.text_color,
                    set: (value) => {
                        config.text_color = value;
                        window.elementSdk.setConfig({ text_color: value });
                    }
                },
                {
                    get: () => config.secondary_color || defaultConfig.secondary_color,
                    set: (value) => {
                        config.secondary_color = value;
                        window.elementSdk.setConfig({ secondary_color: value });
                    }
                },
                {
                    get: () => config.accent_color || defaultConfig.accent_color,
                    set: (value) => {
                        config.accent_color = value;
                        window.elementSdk.setConfig({ accent_color: value });
                    }
                }
            ],
            borderables: [],
            fontEditable: undefined,
            fontSizeable: undefined
        }),
        mapToEditPanelValues: (config) => new Map([
            ["app_title", config.app_title || defaultConfig.app_title],
            ["menu_lafal", config.menu_lafal || defaultConfig.menu_lafal],
            ["menu_doa", config.menu_doa || defaultConfig.menu_doa],
            ["menu_materi", config.menu_materi || defaultConfig.menu_materi],
            ["menu_kompetisi", config.menu_kompetisi || defaultConfig.menu_kompetisi]
        ])
    });
}