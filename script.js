window.aarambhaAnimatorConfig = {
    enableParallax: false,      // Disable parallax
    enableVideoTriggers: false, // Disable video controls
    enableNavbarEffects: false  // Disable navbar animations
};
// VIDEO POPUP FUNCTIONALITY
function openPopup(videoSrc) {
    const popup = document.getElementById("videoPopup");
    const popupVideo = document.getElementById("popupVideo");
    popup.style.display = "flex";
    popupVideo.src = videoSrc;
}

function closePopup() {
    const popup = document.getElementById("videoPopup");
    const popupVideo = document.getElementById("popupVideo");
    popup.style.display = "none";
    popupVideo.pause();
    popupVideo.src = "";
}

  AOS.init();


// Schedule Tabs
const scheduleData = {
    day1: [
        {time: '9:00 AM - 10:30 AM', title: 'Registration & Welcome Kit Distribution', location: 'Main Auditorium'},
        {time: '11:00 AM - 12:30 PM', title: 'Inaugural Ceremony', location: 'Main Auditorium'},
        {time: '1:30 PM - 2:30 PM', title: 'Lunch Break', location: 'University Cafeteria'},
        {time: '3:00 PM - 5:00 PM', title: 'Ice Breaking Sessions', location: 'Department-wise Activity Areas'}
    ],
    day2: [
        {time: '9:30 AM - 11:00 AM', title: 'University Tour', location: 'Campus Grounds'},
        {time: '11:30 AM - 1:00 PM', title: 'Department Introduction', location: 'Respective Departments'},
        {time: '1:00 PM - 2:00 PM', title: 'Lunch Break', location: 'University Cafeteria'},
        {time: '2:30 PM - 4:30 PM', title: 'Industry Expert Talk', location: 'Seminar Hall'},
        {time: '5:00 PM - 7:00 PM', title: 'Cultural Activities', location: 'Central Lawn'}
    ],
    day3: [
        {time: '9:30 AM - 11:30 AM', title: 'Workshop: Career Planning', location: 'Lecture Hall 1'},
        {time: '12:00 PM - 1:30 PM', title: 'Alumni Interaction', location: 'Seminar Hall'},
        {time: '1:30 PM - 2:30 PM', title: 'Lunch Break', location: 'University Cafeteria'},
        {time: '3:00 PM - 6:00 PM', title: 'Sports & Games', location: 'Sports Complex'}
    ],
    day4: [
        {time: '9:30 AM - 12:30 PM', title: 'Technical Workshop', location: 'Computer Labs'},
        {time: '12:30 PM - 1:30 PM', title: 'Lunch Break', location: 'University Cafeteria'},
        {time: '2:00 PM - 4:00 PM', title: 'Entrepreneurship Session', location: 'E-Cell Hub'},
        {time: '4:30 PM - 6:30 PM', title: 'Talent Hunt Preliminaries', location: 'Auditorium'}
    ],
    day5: [
        {time: '10:00 AM - 12:00 PM', title: 'Motivational Talk', location: 'Main Auditorium'},
        {time: '12:30 PM - 1:30 PM', title: 'Lunch Break', location: 'University Cafeteria'},
        {time: '2:00 PM - 5:00 PM', title: 'Cultural Night & Talent Hunt Finals', location: 'Main Auditorium'},
        {time: '5:30 PM - 7:00 PM', title: 'Closing Ceremony', location: 'Main Auditorium'}
    ]
};

function createScheduleHTML(day) {
    const scheduleItems = scheduleData[day];
    let html = '';
    
    scheduleItems.forEach(item => {
        html += `
            <div class="schedule-item">
                <div class="time">${item.time}</div>
                <div class="event-details">
                    <h3>${item.title}</h3>
                    <p>${item.location}</p>
                </div>
            </div>
        `;
    });
    
    return html;
}

// Initialize schedule tabs when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    
    // Initially load day 1 schedule
    const day1Content = document.getElementById('day1');
    if (day1Content) {
        day1Content.innerHTML = createScheduleHTML('day1');
    }
    
    // Tab switching
    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                tabBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                const day = this.getAttribute('data-day');
                
                document.querySelectorAll('.tab-pane').forEach(pane => {
                    pane.classList.remove('active');
                });
                
                const tabPane = document.getElementById(day);
                if (!tabPane) {
                    const newPane = document.createElement('div');
                    newPane.id = day;
                    newPane.className = 'tab-pane active';
                    newPane.innerHTML = createScheduleHTML(day);
                    document.querySelector('.tab-content').appendChild(newPane);
                } else {
                    tabPane.classList.add('active');
                    if (tabPane.innerHTML.trim() === '') {
                        tabPane.innerHTML = createScheduleHTML(day);
                    }
                }
            });
        });
    }

    // Gallery initialization
    const gallery = document.querySelector(".gallery-grid");
    if (gallery) {
        const images = Array.from(gallery.children);
        images.forEach((img) => {
            const clone = img.cloneNode(true);
            gallery.appendChild(clone);
        });
    }


    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');
    
    if (mobileMenuToggle && navLinks) {
        navLinks.addEventListener('click', (e) => {
            e.stopPropagation();
        });

        mobileMenuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('mobile-active');
            mobileMenuToggle.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });

        const navLinksItems = document.querySelectorAll('.nav-links a');
        navLinksItems.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('mobile-active');
                mobileMenuToggle.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });

        document.addEventListener('click', (event) => {
            if (navLinks.classList.contains('mobile-active') && !navbar.contains(event.target)) {
                navLinks.classList.remove('mobile-active');
                mobileMenuToggle.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }

    // Back to Top Button
    const backToTopButton = document.getElementById('backToTop');
    
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });

        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

// Utility functions
function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
}

function setVH() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

setVH();
window.addEventListener('resize', setVH);
window.addEventListener('orientationchange', () => {
    setTimeout(setVH, 500);
});

// Tunnel Animation Code - Updated for slower tunnel and extended loading screen
const baseUrl = 'https://github.com/aman67032/aarambha2025_main';
const imageUrls = [
    `${baseUrl}assests/images/photo1.webp`,
    `${baseUrl}assests/images/photo2.webp`,
    `${baseUrl}assests/images/photo3.webp`,
    `${baseUrl}assests/images/photo4.webp`,
    `${baseUrl}assests/images/photo5.webp`,
    `${baseUrl}assests/images/photo6.webp`,
    `${baseUrl}assests/images/photo7.webp`,
    `${baseUrl}assests/images/photo8.webp`,
    `${baseUrl}assests/images/photo9.webp`
    
    // ... etc
];



function createParticleSystem() {
    const particlesContainer = document.getElementById('particles');
    
    for (let i = 0; i < 100; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random size
        const size = Math.random() * 3 + 1;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random animation delay and duration - no rotation, just scaling and movement
        particle.style.animationDelay = Math.random() * 4 + 's';
        particle.style.animationDuration = (Math.random() * 2 + 1.5) + 's';
        
        // Set particle color
        const colors = ['rgba(211, 157, 85, 0.8)', 'rgba(141, 11, 65, 0.6)', 'rgba(255, 255, 255, 0.4)'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.borderRadius = '50%';
        particle.style.position = 'absolute';
        particle.style.animation = `particleFlyNoRotate ${Math.random() * 3 + 2}s linear infinite`;
        
        particlesContainer.appendChild(particle);
    }
}

// Enhanced particle animation - no rotation for clear photo viewing
const style = document.createElement('style');
style.textContent = `
    @keyframes particleFly {
        0% {
            transform: translateZ(-1000px) scale(0) rotate(0deg);
            opacity: 0;
        }
        15% {
            opacity: 1;
        }
        85% {
            opacity: 1;
        }
        100% {
            transform: translateZ(1000px) scale(2) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes particleFlyNoRotate {
        0% {
            transform: translateZ(-1000px) scale(0);
            opacity: 0;
        }
        15% {
            opacity: 1;
        }
        85% {
            opacity: 1;
        }
        100% {
            transform: translateZ(1000px) scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

function createParticleSystem() {
    const particlesContainer = document.getElementById('particles');
    
    for (let i = 0; i < 80; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random size
        const size = Math.random() * 3 + 1;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Slower particle animation
        particle.style.animationDelay = Math.random() * 4 + 's';
        particle.style.animationDuration = (Math.random() * 1.5 + 2) + 's';
        
        particlesContainer.appendChild(particle);
    }
}

// Loading Screen Particle System
class ParticleSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.resize();
        this.init();
        
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    init() {
        for (let i = 0; i < 100; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.3, // Slower particle movement
                vy: (Math.random() - 0.5) * 0.3,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2,
                color: this.getRandomColor()
            });
        }
    }

    getRandomColor() {
        const colors = ['#8D0B41', '#D39D55', '#C685A0', '#B35C80', '#E9CEAA'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;

            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;

            particle.opacity += (Math.random() - 0.5) * 0.01; // Slower opacity changes
            particle.opacity = Math.max(0.1, Math.min(0.8, particle.opacity));
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw connections
        this.particles.forEach((particle, i) => {
            this.particles.slice(i + 1).forEach(otherParticle => {
                const distance = Math.sqrt(
                    Math.pow(particle.x - otherParticle.x, 2) +
                    Math.pow(particle.y - otherParticle.y, 2)
                );
                
                if (distance < 100) {
                    this.ctx.strokeStyle = `rgba(211, 157, 85, ${0.1 * (1 - distance / 100)})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(otherParticle.x, otherParticle.y);
                    this.ctx.stroke();
                }
            });
        });

        // Draw particles
        this.particles.forEach(particle => {
            this.ctx.fillStyle = particle.color + Math.floor(particle.opacity * 255).toString(16).padStart(2, '0');
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }

    animate() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}



// Auto-start when page loads
// window.addEventListener('load', startTunnelJourney);

// Keyboard controls
// document.addEventListener('keydown', (e) => {
//     if (e.code === 'Space' || e.code === 'Enter') {
//         e.preventDefault();
//         restartJourney();
//     }
// });

window.addEventListener('load', () => {
    // Hide loading screen immediately
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.classList.remove('show', 'fade-out');
        loadingScreen.style.display = 'none';
    }

    // Show main content immediately
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
        mainContent.classList.add('show');
    }

    // Hide tunnel container if exists
    const tunnelContainer = document.getElementById('tunnelContainer');
    if (tunnelContainer) {
        tunnelContainer.style.display = 'none';
    }
});


window.aarambhaAnimatorConfig = {
    enableParallax: false,
    enableVideoTriggers: false,
    enableNavbarEffects: false
};

// Countdown timer
function updateCountdown() {
    const targetDate = new Date('July 25, 2025 00:00:00').getTime();

    const updateTimer = () => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        if (daysEl) daysEl.textContent = days.toString().padStart(2, '0');
        if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
        if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
        if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');

        if (distance < 0) {
            clearInterval(timerInterval);
            const countdown = document.querySelector('.countdown');
            if (countdown) {
                countdown.innerHTML = '<h2>Event Started!</h2>';
            }
        }
    };

    updateTimer();
    const timerInterval = setInterval(updateTimer, 1000);
}

updateCountdown();


document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".block");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, {
    threshold: 0.1
  });

  sections.forEach((section) => {
    observer.observe(section);
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".event-card");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = "translateY(0)";
        entry.target.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      }
    });
  }, {
    threshold: 0.2
  });

  cards.forEach(card => observer.observe(card));
});

document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".fade-in-section");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = "translateY(0)";
        entry.target.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      }
    });
  }, { threshold: 0.2 });

  sections.forEach(section => observer.observe(section));
});

