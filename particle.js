function initializeParticles(containerId) {
    const leafImages = [
        'images/leaf.webp',
        'images/yellow_leaf.webp',
        'images/reads.webp',
        'images/orange_leaf.webp',
    ];

    particlesJS(containerId, {
        "particles": {
            "number": {
                "value": 50,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#00ff00"
            },
            "shape": {
                "type": "image",
                "image": {
                    "src": leafImages[Math.floor(Math.random() * leafImages.length)], // Randomly select a leaf image
                    "width": 1000,
                    "height": 1000
                }
            },
            "opacity": {
                "value": 0.5,
                "random": true,
                "anim": {
                    "enable": false
                }
            },
            "size": {
                "value": 50,
                "random": true,
                "anim": {
                    "enable": false
                }
            },
            "line_linked": {
                "enable": false
            },
            "move": {
                "enable": true,
                "speed": 2,
                "direction": "bottom",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": false
                },
                "onclick": {
                    "enable": false
                },
                "resize": true
            }
        },
        "retina_detect": true
    });
}