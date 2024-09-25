let slideIndex = 0;
const slides = document.querySelectorAll('.slider-wrapper img');
const dots = document.querySelectorAll('.dot');
let autoSlide;
const slider = document.getElementById('slider');

// Show initial slide
showSlide(slideIndex);

// Automatic slide transition every 3 seconds
autoTransition();

// Functions to control slides
function showSlide(index) {
  if (index >= slides.length) {
    slideIndex = 0; // Reset to first slide
  }
  if (index < 0) {
    slideIndex = slides.length - 1; // Go to last slide
  }

  // Update the slider position
  document.querySelector('.slider-wrapper').style.transform = `translateX(-${slideIndex * 800}px)`;

  // Update the active dot
  dots.forEach((dot, i) => {
    dot.classList.remove('active');
    if (i === slideIndex) {
      dot.classList.add('active');
    }
  });
}

function nextSlide() {
  slideIndex++;
  showSlide(slideIndex);
}

function prevSlide() {
  slideIndex--;
  showSlide(slideIndex);
}

function currentSlide(n) {
  slideIndex = n - 1; // Update slide index
  showSlide(slideIndex);
}

function autoTransition() {
  autoSlide = setInterval(() => {
    nextSlide();
  }, 3000);
}

// Pause auto transition on hover
slider.addEventListener('mouseover', () => clearInterval(autoSlide));
slider.addEventListener('mouseout', autoTransition);

// Swipe functionality for touch screens
slider.addEventListener('touchstart', handleTouchStart, false);
slider.addEventListener('touchmove', handleTouchMove, false);

let x1 = null;

function handleTouchStart(e) {
  const firstTouch = e.touches[0];
  x1 = firstTouch.clientX;
}

function handleTouchMove(e) {
  if (!x1) {
    return false;
  }

  let x2 = e.touches[0].clientX;
  let xDiff = x2 - x1;

  if (xDiff > 0) {
    prevSlide();
  } else {
    nextSlide();
  }
  x1 = null;
}
