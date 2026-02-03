document.addEventListener('DOMContentLoaded', () => {
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const message = document.getElementById('message');
    const buttonsContainer = document.querySelector('.buttons');
    const gifContainer = document.querySelector('.gif-container');
    const cuteGif = document.querySelector('.cute-gif');

    // Create floating hearts
    function createHearts() {
        const heartBg = document.querySelector('.heart-bg');
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
});
