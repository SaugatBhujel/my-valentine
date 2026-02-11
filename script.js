document.addEventListener('DOMContentLoaded', () => {
    console.log("Valentine App v2.0 Loaded");

    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const message = document.getElementById('message');
    const buttonsContainer = document.querySelector('.buttons');
    const gifContainer = document.querySelector('.gif-container');
    const cuteGif = document.querySelector('.main-gif');

    // Auth Modal Elements
    const authModal = document.getElementById('authModal');
    const authInput = document.getElementById('authInput');
    const authSubmitBtn = document.getElementById('authSubmitBtn');
    const authError = document.getElementById('authError');
    const authQuestion = document.getElementById('authQuestion');
    const authHint = document.getElementById('authHint');

    let currentAuthStep = 1;

    // Love Calculator Elements
    const calcBtn = document.getElementById('calcBtn');
    const loveCalcModal = document.getElementById('loveCalcModal');
    const yourName = document.getElementById('yourName');
    const partnerName = document.getElementById('partnerName');
    const calcSubmitBtn = document.getElementById('calcSubmitBtn');
    const calcResult = document.getElementById('calcResult');
    const resultText = document.getElementById('resultText');
    const resultMessage = document.getElementById('resultMessage');
    const loadingHeart = document.querySelector('.loading-heart');

    // Auth Logic
    function checkAuth() {
        const answer = authInput.value.trim().toLowerCase();
        
        if (currentAuthStep === 1) {
            // Question 1: Who do I love the most?
            const correctAnswers1 = ['khushi gurung', 'khushi', 'khushigurung']; 
            
            if (correctAnswers1.includes(answer)) {
                // Success! Move to next question
                currentAuthStep = 2;
                authQuestion.textContent = "Correct! 🥰 Now, what is the nickname I call you?";
                if (authHint) authHint.classList.add('hidden'); // Hide hint for step 2
                authInput.value = '';
                authInput.focus();
                authError.classList.add('hidden');
            } else {
                showError();
            }
        } else if (currentAuthStep === 2) {
            // Question 2: What is the nickname I call you?
            // Added common spelling variations just in case
            const correctAnswers2 = ['khushu', 'khusu', 'kushu', 'khu shu', 'khush', 'khusi']; 
            
            if (correctAnswers2.includes(answer)) {
                window.location.href = 'timeline.html';
            } else {
                showError();
            }
        }
    }

    function showError() {
        authError.classList.remove('hidden');
        authInput.style.borderColor = '#ff0a54';
        authInput.classList.add('shake');
        setTimeout(() => {
            authInput.classList.remove('shake');
        }, 500);
    }

    authSubmitBtn.addEventListener('click', checkAuth);
    
    authInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            checkAuth();
        }
    });

    authInput.addEventListener('input', () => {
        authError.classList.add('hidden');
        authInput.style.borderColor = '#ffe6e6';
    });

    // Close modal on outside click
    authModal.addEventListener('click', (e) => {
        if (e.target === authModal) {
            authModal.classList.add('hidden');
        }
    });

    // Love Calculator Logic
    if (calcBtn) {
        calcBtn.addEventListener('click', () => {
            loveCalcModal.classList.remove('hidden');
        });
    }

    if (loveCalcModal) {
        loveCalcModal.addEventListener('click', (e) => {
            if (e.target === loveCalcModal) {
                loveCalcModal.classList.add('hidden');
                // Reset result
                calcResult.classList.add('hidden');
                yourName.value = '';
                partnerName.value = '';
            }
        });

        calcSubmitBtn.addEventListener('click', () => {
            const name1 = yourName.value.trim();
            const name2 = partnerName.value.trim();

            if (!name1 || !name2) {
                alert("Please enter both names! 🥺");
                return;
            }

            // Show loading
            calcResult.classList.remove('hidden');
            resultText.textContent = "";
            resultMessage.textContent = "";
            loadingHeart.classList.remove('hidden');
            
            // Simulate calculation
            setTimeout(() => {
                loadingHeart.classList.add('hidden');
                resultText.textContent = "100%";
                resultMessage.textContent = "It's a perfect match! You are meant to be! ❤️✨";
                
                // Burst confetti
                for(let i = 0; i < 30; i++) {
                    createConfetti();
                }
            }, 1500);
        });
    }

    // Create floating hearts
    function createHearts() {
        const heartBg = document.querySelector('.heart-bg');
        if (!heartBg) return;
        
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 3 + 3 + 's';
        heartBg.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 6000);
    }

    setInterval(createHearts, 300);

    // Yes button click
    yesBtn.addEventListener('click', () => {
        buttonsContainer.style.display = 'none';
        if (calcBtn) calcBtn.style.display = 'none'; // Hide calc button too
        message.classList.remove('hidden');
        setTimeout(() => {
            message.classList.add('visible');
        }, 10);
        
        // Change GIF to happy one
        cuteGif.src = "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOTVlY2I1NjI5Yzc5MWFkNzY2ZGI2YmY2M2E0YjY5Y2E5YmYyZDM2OSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/T86i6yDyOYz7J6dPhf/giphy.gif";
        
        // Confetti effect (simple version)
        for(let i = 0; i < 50; i++) {
            createConfetti();
        }

        // Add a button to proceed to the timeline after 2 seconds
        setTimeout(() => {
            const nextBtn = document.createElement('button');
            nextBtn.textContent = "See Our Journey ❤️";
            nextBtn.classList.add('btn', 'yes-btn');
            nextBtn.style.marginTop = '20px';
            nextBtn.style.opacity = '0';
            nextBtn.style.transition = 'opacity 1s';
            
            // Insert after the message
            message.parentNode.insertBefore(nextBtn, message.nextSibling);
            
            // Trigger reflow
            void nextBtn.offsetWidth;
            nextBtn.style.opacity = '1';

            nextBtn.addEventListener('click', () => {
                authModal.classList.remove('hidden');
                // Reset to step 1
                currentAuthStep = 1;
                authQuestion.textContent = "Who do I love the most?";
                authHint.classList.remove('hidden'); // Show hint
                authInput.value = '';
                authError.classList.add('hidden');
                authInput.focus();
            });
        }, 2000);
    });

    // No button hover - Make it run away
    noBtn.addEventListener('mouseover', moveButton);
    noBtn.addEventListener('touchstart', moveButton); // For mobile

    function moveButton() {
        const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
        const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
        
        noBtn.style.position = 'absolute';
        noBtn.style.left = `${x}px`;
        noBtn.style.top = `${y}px`;
    }

    function createConfetti() {
        const colors = ['#ff4d6d', '#ff8fa3', '#ffb3c1', '#fff0f3'];
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-10px';
        confetti.style.zIndex = '1000';
        document.body.appendChild(confetti);

        const animation = confetti.animate([
            { transform: `translate(0, 0) rotate(0deg)`, opacity: 1 },
            { transform: `translate(${Math.random() * 100 - 50}px, 100vh) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ], {
            duration: Math.random() * 2000 + 1000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });

        animation.onfinish = () => confetti.remove();
    }

    // --- New Cute Features ---

    // 1. Heartbeat Pulse for Yes Button
    yesBtn.classList.add('pulse-btn');

    // 2. Dynamic Tab Title
    const originalTitle = document.title;
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            document.title = "Come back! I miss you! 🥺";
        } else {
            document.title = originalTitle;
        }
    });

    // 3. Cursor Heart Trail
    let lastTime = 0;
    document.addEventListener('mousemove', (e) => {
        const currentTime = Date.now();
        if (currentTime - lastTime < 100) return; // Limit creation rate to every 100ms
        lastTime = currentTime;

        const heart = document.createElement('div');
        heart.classList.add('cursor-heart');
        heart.style.left = e.clientX + 'px';
        heart.style.top = e.clientY + 'px';
        document.body.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 1000);
    });

    // 4. Click Burst Effect
    document.addEventListener('click', (e) => {
        // Don't trigger if clicking buttons or inputs (optional, but good for UX)
        if (e.target.tagName === 'BUTTON' || e.target.tagName === 'INPUT') return;

        const emojis = ['❤️', '💖', '🧸', '🌹', '✨', '🍫', '💋'];
        const burstCount = 8;
        
        for (let i = 0; i < burstCount; i++) {
            const emoji = document.createElement('div');
            emoji.classList.add('click-burst-emoji');
            emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            
            // Random direction
            const angle = Math.random() * Math.PI * 2;
            const velocity = Math.random() * 80 + 40; // distance
            const tx = Math.cos(angle) * velocity + 'px';
            const ty = Math.sin(angle) * velocity + 'px';
            const rot = Math.random() * 360 + 'deg';

            emoji.style.left = e.clientX + 'px';
            emoji.style.top = e.clientY + 'px';
            emoji.style.setProperty('--tx', tx);
            emoji.style.setProperty('--ty', ty);
            emoji.style.setProperty('--rot', rot);

            document.body.appendChild(emoji);

            setTimeout(() => emoji.remove(), 800);
        }
    });

    // 5. Typing Animation for Title
    const titleElement = document.querySelector('.title');
    if (titleElement) {
        const textToType = "Will you be my Valentine?";
        titleElement.textContent = ""; // Clear it
        let charIndex = 0;

        function typeChar() {
            if (charIndex < textToType.length) {
                titleElement.textContent += textToType.charAt(charIndex);
                charIndex++;
                setTimeout(typeChar, 100); // Typing speed
            }
        }
        
        // Start typing after a small delay
        setTimeout(typeChar, 500);
    }
});
