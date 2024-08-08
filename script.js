// Set up canvas
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions to full screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Particle class
class Particle {
    constructor(x, y, radius, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.velocity = velocity;
    }

    // Draw particle
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--grey');
        ctx.fill();
    }

    // Update particle position
    update(particles) {
        this.draw();
        this.x += this.velocity.x;
        this.y += this.velocity.y;

        // Connect nearby particles with lines
        particles.forEach(particle => {
            const distance = Math.sqrt((this.x - particle.x) ** 2 + (this.y - particle.y) ** 2);
            if (distance < 100 && particle !== this) { // Adjust this value to control the connection distance
                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(particle.x, particle.y);
                ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--grey');
                ctx.lineWidth = 1 - distance / 100; // Thicker lines for closer particles
                ctx.stroke();
            }
        });

        // Handle canvas boundaries
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.velocity.x = -this.velocity.x;
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.velocity.y = -this.velocity.y;
        }
    }
}

// Generate random number within a range
function randomRange(min, max) {
    return Math.random() * (max - min) + min;
}

// Create particles
const particles = [];
const numParticles = 180;

for (let i = 0; i < numParticles; i++) {
    const radius = randomRange(1, 3);
    const x = randomRange(radius, canvas.width - radius);
    const y = randomRange(radius, canvas.height - radius);
    const velocity = {
        x: randomRange(-2, 2),
        y: randomRange(-2, 2)
    };

    particles.push(new Particle(x, y, radius, velocity));
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
        particle.update(particles);
    });
}

// Start animation
animate();

// Adjust canvas size on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});


// Typing animation logic
document.addEventListener('DOMContentLoaded', function() {
    const typingTextElement = document.getElementById('typing-text');
    const texts = ["ED Cell, AOT"];
    let textIndex = 0;
    let charIndex = 0;
    const typingSpeed = 100;
    const erasingSpeed = 50;
    const delayBetweenTexts = 2000;

    function typeText() {
        if (charIndex < texts[textIndex].length) {
            typingTextElement.textContent += texts[textIndex].charAt(charIndex);
            charIndex++;
            setTimeout(typeText, typingSpeed);
        } else {
            setTimeout(eraseText, delayBetweenTexts);
        }
    }

    function eraseText() {
        if (charIndex > 0) {
            typingTextElement.textContent = texts[textIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(eraseText, erasingSpeed);
        } else {
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(typeText, typingSpeed);
        }
    }

    setTimeout(typeText, delayBetweenTexts);
});


var swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    spaceBetween: 16,
    autoplay:{
        delay:3000
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });