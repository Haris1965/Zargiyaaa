document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const petals = document.querySelectorAll('.petal');
    const rose = document.querySelector('.rose');
    const colorButtons = document.querySelectorAll('.color-btn');
    const bloomBtn = document.getElementById('bloom-btn');
    const resetBtn = document.getElementById('reset-btn');
    const loveBtn = document.getElementById('love-btn');
    const sparkles = document.querySelectorAll('.sparkle');
    const distanceKm = document.getElementById('distance-km');
    const lovePercent = document.getElementById('love-percent');
    const profileImage = document.getElementById('profile-image');
    const profileContainer = document.querySelector('.profile-container');

    // Bloom animation
    function bloomRose() {
        // Reset first
        petals.forEach(petal => {
            petal.style.opacity = '0';
            petal.style.transform = 'scale(0) rotate(var(--rotation))';
        });

        // Animate each petal with delay
        petals.forEach((petal, index) => {
            setTimeout(() => {
                const rotation = (index * 45) + 'deg';
                petal.style.setProperty('--rotation', rotation);
                petal.style.opacity = '1';
                petal.style.transform = `scale(1) rotate(${rotation})`;
                petal.style.transition = 'all 1s ease';
            }, index * 100);
        });

        // Animate sparkles
        sparkles.forEach((sparkle, index) => {
            setTimeout(() => {
                sparkle.style.opacity = '1';
            }, 500 + index * 200);
        });

        // Add gentle sway animation
        rose.style.animation = 'sway 3s ease-in-out infinite';
        
        // Create CSS for sway animation if not exists
        if (!document.getElementById('sway-animation')) {
            const style = document.createElement('style');
            style.id = 'sway-animation';
            style.textContent = `
                @keyframes sway {
                    0%, 100% { transform: scale(0.8) rotate(0deg); }
                    50% { transform: scale(0.8) rotate(2deg); }
                }
            `;
            document.head.appendChild(style);
        }

        // Update counters with animation
        animateCounter(distanceKm, 0, 3841, 2000);
        createHeartRain();
        
        // Button feedback
        bloomBtn.innerHTML = '<i class="fas fa-check"></i> Blooming!';
        bloomBtn.style.background = 'linear-gradient(45deg, #10b981, #34d399)';
        setTimeout(() => {
            bloomBtn.innerHTML = '<i class="fas fa-expand"></i> Bloom Again';
            bloomBtn.style.background = 'linear-gradient(45deg, #4f46e5, #7c3aed)';
        }, 1500);
    }

    // Send love effect
    function sendLove() {
        createHeartExplosion();
        
        // Add message effect
        const messageContent = document.querySelector('.message-content');
        messageContent.style.boxShadow = '0 0 30px rgba(255, 107, 139, 0.5)';
        setTimeout(() => {
            messageContent.style.boxShadow = 'none';
        }, 1000);
        
        // Update love counter
        lovePercent.textContent = "24/7";
        lovePercent.style.color = '#ff6b8b';
        lovePercent.style.transform = 'scale(1.2)';
        setTimeout(() => {
            lovePercent.style.transform = 'scale(1)';
        }, 300);
        
        // Button feedback
        loveBtn.innerHTML = '<i class="fas fa-heart"></i> Love Sent!';
        loveBtn.style.background = 'linear-gradient(45deg, #ff4d8d, #ff6b8b)';
        setTimeout(() => {
            loveBtn.innerHTML = '<i class="fas fa-heart"></i> Send Love';
            loveBtn.style.background = 'linear-gradient(45deg, #ff6b8b, #ff4d8d)';
        }, 1500);
    }

    // Profile picture heart effect
    function createPhotoHeartEffect() {
        // Create multiple hearts
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.innerHTML = '💖';
                heart.style.position = 'absolute';
                heart.style.top = '50%';
                heart.style.left = '50%';
                heart.style.fontSize = Math.random() * 20 + 20 + 'px';
                heart.style.transform = 'translate(-50%, -50%)';
                heart.style.zIndex = '1000';
                heart.style.opacity = '1';
                heart.style.pointerEvents = 'none';
                heart.style.userSelect = 'none';
                
                // Random direction
                const angle = Math.random() * Math.PI * 2;
                const distance = 100;
                const x = Math.cos(angle) * distance;
                const y = Math.sin(angle) * distance;
                
                // Add to container
                profileContainer.appendChild(heart);
                
                // Animate
                const startTime = Date.now();
                const duration = 1500;
                
                function animate() {
                    const elapsed = Date.now() - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    
                    heart.style.transform = `translate(
                        calc(-50% + ${x * progress}px),
                        calc(-50% + ${y * progress}px)
                    )`;
                    heart.style.opacity = (1 - progress).toString();
                    heart.style.scale = (1 + progress * 0.5).toString();
                    
                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    } else {
                        heart.remove();
                    }
                }
                
                requestAnimationFrame(animate);
            }, i * 100);
        }
        
        // Add pulse effect to the profile picture
        profileImage.style.animation = 'pulse 0.5s ease';
        setTimeout(() => {
            profileImage.style.animation = '';
        }, 500);
    }

    // Create heart explosion effect
    function createHeartExplosion() {
        for (let i = 0; i < 50; i++) {
            createFloatingHeart(true);
        }
    }

    // Create heart rain effect
    function createHeartRain() {
        for (let i = 0; i < 30; i++) {
            setTimeout(() => createFloatingHeart(false), i * 100);
        }
    }

    // Create floating heart
    function createFloatingHeart(isExplosion) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.position = 'fixed';
        heart.style.fontSize = Math.random() * 20 + 15 + 'px';
        
        if (isExplosion) {
            heart.style.left = '50%';
            heart.style.top = '50%';
            heart.style.transform = 'translate(-50%, -50%)';
            heart.style.opacity = '1';
            
            // Explosion effect
            const angle = Math.random() * Math.PI * 2;
            const velocity = Math.random() * 5 + 2;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;
            
            let x = 50;
            let y = 50;
            const animate = () => {
                x += vx;
                y += vy;
                heart.style.left = x + '%';
                heart.style.top = y + '%';
                heart.style.opacity = parseFloat(heart.style.opacity) - 0.02;
                
                if (parseFloat(heart.style.opacity) > 0) {
                    requestAnimationFrame(animate);
                } else {
                    heart.remove();
                }
            };
            requestAnimationFrame(animate);
        } else {
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.top = '100vh';
            heart.style.opacity = '0.7';
            heart.style.animation = `floatHeart ${Math.random() * 5 + 5}s linear forwards`;
        }
        
        heart.style.zIndex = '9999';
        heart.style.pointerEvents = 'none';
        heart.style.userSelect = 'none';
        
        document.body.appendChild(heart);
        
        if (!isExplosion) {
            setTimeout(() => {
                heart.remove();
            }, 6000);
        }
    }

    // Counter animation function
    function animateCounter(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const current = Math.floor(progress * (end - start) + start);
            element.textContent = current.toLocaleString();
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Change rose color
    function changeRoseColor(color, button) {
        petals.forEach(petal => {
            petal.style.background = `linear-gradient(45deg, ${color}, ${lightenColor(color, 30)})`;
        });
        
        // Update active button
        colorButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Add color transition effect
        rose.style.filter = 'brightness(1.2)';
        setTimeout(() => {
            rose.style.filter = 'brightness(1)';
        }, 300);
        
        // Button feedback
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 300);
    }

    // Helper function to lighten color
    function lightenColor(color, percent) {
        const num = parseInt(color.replace("#", ""), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) + amt;
        const G = (num >> 8 & 0x00FF) + amt;
        const B = (num & 0x0000FF) + amt;
        return "#" + (
            0x1000000 +
            (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
            (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
            (B < 255 ? B < 1 ? 0 : B : 255)
        ).toString(16).slice(1);
    }

    // Reset rose to initial state
    function resetRose() {
        petals.forEach(petal => {
            petal.style.opacity = '0';
            petal.style.transform = 'scale(0) rotate(var(--rotation))';
            petal.style.transition = 'none';
        });
        
        sparkles.forEach(sparkle => {
            sparkle.style.opacity = '0';
        });
        
        rose.style.animation = 'none';
        
        // Reset to red rose
        changeRoseColor('#ff6b8b', document.getElementById('red-rose'));
        
        // Reset counters
        distanceKm.textContent = '3,841';
        lovePercent.textContent = '24/7';
        lovePercent.style.color = '';
        
        // Button feedback
        resetBtn.innerHTML = '<i class="fas fa-check"></i> Reset!';
        resetBtn.style.background = 'linear-gradient(45deg, #6b7280, #9ca3af)';
        setTimeout(() => {
            resetBtn.innerHTML = '<i class="fas fa-redo"></i> Reset';
            resetBtn.style.background = 'rgba(255, 255, 255, 0.1)';
        }, 1500);
    }

    // Event Listeners
    bloomBtn.addEventListener('click', bloomRose);
    resetBtn.addEventListener('click', resetRose);
    loveBtn.addEventListener('click', sendLove);
    
    colorButtons.forEach(button => {
        button.addEventListener('click', function() {
            changeRoseColor(this.getAttribute('data-color'), this);
        });
    });

    // Profile picture click event
    profileContainer.addEventListener('click', function(e) {
        createPhotoHeartEffect();
        
        // Add special message effect
        const messageContent = document.querySelector('.message-content');
        messageContent.style.borderColor = '#ff6b8b';
        messageContent.style.boxShadow = '0 0 40px rgba(255, 107, 139, 0.4)';
        
        setTimeout(() => {
            messageContent.style.borderColor = '';
            messageContent.style.boxShadow = '';
        }, 1000);
    });

    // Auto-bloom on page load
    setTimeout(bloomRose, 1000);

    // Create floating hearts animation CSS
    if (!document.getElementById('heart-animation')) {
        const style = document.createElement('style');
        style.id = 'heart-animation';
        style.textContent = `
            @keyframes floatHeart {
                0% { transform: translateY(0) rotate(0deg); opacity: 0.7; }
                100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    // Create pulse animation for profile picture
    if (!document.getElementById('pulse-animation')) {
        const style = document.createElement('style');
        style.id = 'pulse-animation';
        style.textContent = `
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.08); }
                100% { transform: scale(1); }
            }
        `;
        document.head.appendChild(style);
    }

    // Create floating hearts periodically
    setInterval(() => createFloatingHeart(false), 3000);

    // Add click effect on message box
    const messageContent = document.querySelector('.message-content');
    messageContent.addEventListener('click', function() {
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
        createHeartExplosion();
    });

    // Initialize with a bloomed rose
    bloomRose();
});
