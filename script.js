/* ================== toggle menu icon button ================== */
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active')
}
/* ================== scroll section active link ================== */
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a')

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active')
            })
        }
    })

    /* ================== sticky navbar ================== */

    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    /* ================== remove toggle icon and navbar when click navbar link scroll================== */

    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

// ==================about image animation
window.addEventListener('load', () => {
    const icon = document.getElementById('about-img');

    // Trigger pop-in animation
    icon.classList.add('appear');

    // Start continuous pulsing after pop-in finishes
    setTimeout(() => {
        icon.classList.add('pulse');
    }, 500);
});


/* ================== About Us Text More and less display function ================== */
function toggleContent() {
    var content = document.querySelector('#about_text');
    var btn = document.querySelector('#about_btn');

    if (content.style.webkitLineClamp === '' || content.style.webkitLineClamp === '8') {
        content.style.webkitLineClamp = 'unset';
        btn.innerText = 'Read Less';
    } else {
        content.style.webkitLineClamp = '8';
        btn.innerText = 'Read More';
    }
}





/* ================== scroll reveal ================== */
ScrollReveal({
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .contact-form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });


/* ================== typed js ================== */

const typed = new Typed('.multiple-text', {
    strings: ['Your HR Parter', 'IT HelpDesk Agent', 'Your Office buddy'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

/* =====================================================
   PORTFOLIO PIN SECURITY
===================================================== */

const PORTFOLIO_PIN = "712104";

const pinOverlay = document.getElementById("pinOverlay");
const pinInputs = document.querySelectorAll(".pin-box");
const pinContainer = document.getElementById("pinInputs");
const pinError = document.getElementById("pinError");
const workplaceScreen = document.getElementById("workplaceScreen");


/* =====================================================
   CHECK PIN
===================================================== */

function checkPortfolioPin() {

    let enteredPin = "";

    pinInputs.forEach(input => {
        enteredPin += input.value;
    });

    // Wait until all 6 digits are entered
    if (enteredPin.length !== 6) {
        return;
    }

    /* =========================
       CORRECT PIN
    ========================= */

    if (enteredPin === PORTFOLIO_PIN) {

        // Green success state
        pinInputs.forEach(input => {
            input.classList.remove("invalid");
            input.classList.add("valid");
        });

        pinError.classList.remove("show");

        // Small delay for success animation
        setTimeout(() => {

            pinOverlay.classList.add("hide");

            workplaceScreen.classList.add("active");

            document.body.style.overflow = "auto";

            // Wait until section becomes visible, then animate
            // setTimeout(() => {
            //     animateWorkplaceTitle();
            // }, 100);

        }, 400);

    }

    /* =========================
       WRONG PIN
    ========================= */

    else {

        pinInputs.forEach(input => {
            input.classList.remove("valid");
            input.classList.add("invalid");
        });

        pinContainer.classList.add("pin-shake");
        pinError.classList.add("show");

        setTimeout(() => {

            pinContainer.classList.remove("pin-shake");

            // Clear inputs
            pinInputs.forEach(input => {
                input.value = "";
                input.classList.remove("invalid");
            });

            // Focus first box
            pinInputs[0].focus();

        }, 600);
    }
}


/* =====================================================
   PIN INPUT HANDLING
===================================================== */

pinInputs.forEach((input, index) => {

    /* =========================
       TYPING
    ========================= */

    input.addEventListener("input", () => {

        // Allow only numbers
        input.value = input.value.replace(/\D/g, "");

        // Move to next box
        if (input.value && index < pinInputs.length - 1) {
            pinInputs[index + 1].focus();
        }

        // Check PIN automatically after 6th digit
        if (index === pinInputs.length - 1) {
            checkPortfolioPin();
        }
    });


    /* =========================
       BACKSPACE
    ========================= */

    input.addEventListener("keydown", (event) => {

        if (
            event.key === "Backspace" &&
            !input.value &&
            index > 0
        ) {
            pinInputs[index - 1].focus();
        }

    });

});


/* =====================================================
   PASTE 6-DIGIT PIN
===================================================== */

pinContainer.addEventListener("paste", (event) => {

    event.preventDefault();

    const pastedData = event.clipboardData
        .getData("text")
        .replace(/\D/g, "")
        .slice(0, 6);

    if (!pastedData) {
        return;
    }

    pastedData.split("").forEach((digit, index) => {

        if (pinInputs[index]) {
            pinInputs[index].value = digit;
        }

    });

    // Focus last available box
    const focusIndex = Math.min(
        pastedData.length,
        pinInputs.length - 1
    );

    pinInputs[focusIndex].focus();

    // Check if complete PIN was pasted
    if (pastedData.length === 6) {
        checkPortfolioPin();
    }

});


/* =====================================================
   LOCK PAGE SCROLL WHILE PIN SCREEN IS ACTIVE
===================================================== */

document.body.style.overflow = "hidden";


/*=====================Worl Plcae text animation===================== 
=====================================================================*/

/* =====================================================
   WORKPLACE TITLE ANIMATION
   TRIGGER WHEN SECTION ENTERS VIEW
   RUN ONLY ONCE
===================================================== */

const workplaceSection = document.querySelector('.workplace-container');
const workplaceTitle = document.querySelector('.workplace-container h1');

let workplaceAnimationPlayed = false;

const workplaceObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach(entry => {

            // Section is visible
            if (
                entry.isIntersecting &&
                workplaceSection.classList.contains('active') &&
                !workplaceAnimationPlayed
            ) {

                workplaceAnimationPlayed = true;

                anime({
                    targets: workplaceTitle,

                    scale: [14, 1],
                    opacity: [0, 1],

                    easing: 'easeOutCirc',
                    duration: 1000
                });

                // Don't trigger again
                observer.unobserve(workplaceSection);
            }

        });

    },
    {
        threshold: 0.25
    }
);

workplaceObserver.observe(workplaceSection);