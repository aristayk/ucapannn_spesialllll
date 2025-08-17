document.addEventListener('DOMContentLoaded', () => {
    // --- Bagian Password ---
    const correctPassword = "2208"; // Ganti dengan tanggal yang benar (DDMM)
    let enteredPassword = "";
    const passwordDisplay = document.getElementById('password-display');
    const keys = document.querySelectorAll('.key');

    keys.forEach(key => {
        key.addEventListener('click', () => {
            if (key.classList.contains('backspace')) {
                enteredPassword = enteredPassword.slice(0, -1);
            } else if (key.classList.contains('submit')) {
                checkPassword();
            } else {
                if (enteredPassword.length < 4) {
                    enteredPassword += key.textContent;
                }
            }
            updateDisplay();
        });
    });

    function updateDisplay() {
        passwordDisplay.textContent = enteredPassword;
    }

    function checkPassword() {
        if (enteredPassword === correctPassword) {
            // Musik tidak lagi diputar di sini
            switchScreen('password-screen', 'card-screen');
        } else {
            passwordDisplay.style.color = 'red';
            setTimeout(() => {
                passwordDisplay.style.color = '#555';
                enteredPassword = "";
                updateDisplay();
            }, 800);
        }
    }
    
    // --- Bagian Navigasi & Interaksi ---
    const noBtn = document.getElementById('no-btn');
    const yesBtn = document.getElementById('yes-btn');

    noBtn.addEventListener('click', () => {
        switchScreen('card-screen', 'force-screen');
        setTimeout(() => {
            showFinalMessage();
        }, 2500); 
    });
    
    yesBtn.addEventListener('click', () => {
        showFinalMessage();
    });
    
    function showFinalMessage() {
        switchScreen(document.querySelector('.screen.active').id, 'final-screen');
        startConfetti();
        setTimeout(() => {
            switchScreen('final-screen', 'song-screen');
            document.getElementById('confetti').innerHTML = ''; 

            // MUSIK AKAN MULAI BERPUTAR DI SINI
            const musik = document.getElementById('musik-kejutan');
            if (musik) {
                musik.play();
            }
        }, 3000); 
    }

    // --- Fungsi Bantuan ---
    function switchScreen(fromScreenId, toScreenId) {
        const fromScreen = document.getElementById(fromScreenId);
        const toScreen = document.getElementById(toScreenId);
        
        if (fromScreen) fromScreen.classList.remove('active');
        if (toScreen) toScreen.classList.add('active');
    }

    // --- Animasi Confetti ---
    function startConfetti() {
        const confettiContainer = document.getElementById('confetti');
        if (!confettiContainer) return;
        confettiContainer.innerHTML = ''; 
        for (let i = 0; i < 100; i++) {
            const confettiPiece = document.createElement('div');
            confettiPiece.classList.add('confetti-piece');
            confettiPiece.style.left = `${Math.random() * 100}vw`;
            confettiPiece.style.top = `${-20 + Math.random() * -100}px`;
            confettiPiece.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
            confettiPiece.style.animationDelay = `${Math.random() * 2}s`;
            confettiContainer.appendChild(confettiPiece);
        }
    }
});