const carousel = document.querySelector(".carousel"),
    firstImg = carousel.querySelectorAll("img")[0],
    arrowIcons = document.querySelectorAll(".wrapper i"),
    dots = document.querySelectorAll(".dot"),
    next = document.querySelector(".next"),
    prev = document.querySelector(".prev"),
    slideImages = document.querySelectorAll('img');


let isDragStart = false,
    isDragging = false,
    prevPageX,
    prevScrollLeft = 0,
    positionDiff = 0;

var counter = 0;

const showHideIcons = () => {
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth;
    arrowIcons[0].style.display =
        carousel.scrollLeft == 0 ? "none" : "block";
    arrowIcons[1].style.display =
        carousel.scrollLeft == scrollWidth ? "none" : "block";
};
//
arrowIcons.forEach((icon) => {
    icon.addEventListener("click", () => {
      let firstImgWidth = firstImg.clientWidth;
      carousel.scrollLeft +=
        icon.id == "left" ? -firstImgWidth : firstImgWidth;
  
      // Wait for the carousel to finish scrolling before updating the active dot and arrow icons
      setTimeout(() => {
        showHideIcons();
        indicators();
      }, 400);
    });
  });
  
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        carousel.scrollLeft = firstImg.clientWidth * index;
        showHideIcons();
        
        // Move the active dot into center view
        let dotWrapperWidth = dotWrapper.offsetWidth;
        let activeDot = document.querySelector(".dot.active");
        let activeDotPos = activeDot.offsetLeft - dotMargin;
        let activeDotWidth = activeDot.offsetWidth + dotMargin * 2;
        let positionDiff = activeDotPos + activeDotWidth / 2 - dotWrapperWidth / 2;
        
        dotWrapper.scrollBy({
            left: positionDiff,
            behavior: 'smooth'
        });
        
        indicators();
    });
});
//

function indicators() {
    let currentImageIndex = Math.round(carousel.scrollLeft / firstImg.clientWidth);

    for (let i = 0; i < dots.length; i++) {
        if (i === currentImageIndex) {
            dots[i].classList.add("active");
        } else {
            dots[i].classList.remove("active");
        }
    }

    // Move the active dot into view
    let activeDot = document.querySelector(".dot.active");
    let dotWrapper = document.querySelector(".dots-wrapper");
    if (activeDot) {
        let dotWidth = activeDot.offsetWidth;
        let dotMargin = parseInt(window.getComputedStyle(activeDot).marginRight);

        let activeDotPos = activeDot.offsetLeft - dotMargin;
        let activeDotEndPos = activeDot.offsetLeft + dotWidth + dotMargin;
        let dotWrapperWidth = dotWrapper.offsetWidth;

        if (activeDotEndPos > dotWrapperWidth) {
            dotWrapper.scrollLeft += activeDotEndPos - dotWrapperWidth;
        } else if (activeDotPos < 0) {
            dotWrapper.scrollLeft += activeDotPos;
        }
    }
}

//
function switchImage(currentImage){
    currentImage.classList.add('active');
    var imageId = currentImage.getAttribute('attr');
    if(imageId > counter){
        
    }
}
//
const autoSlide = () => {
    if (carousel.scrollLeft == 0 || carousel.scrollLeft == prevScrollLeft) {
        return;
    }
    let firstImgWidth = firstImg.clientWidth;
    let valDifference = firstImgWidth - positionDiff;

    if (carousel.scrollLeft > prevScrollLeft) {
        carousel.scrollLeft += positionDiff > firstImgWidth ? valDifference : -positionDiff;
    } else {
        carousel.scrollLeft -= positionDiff > firstImgWidth ? valDifference : -positionDiff;
    }
    prevScrollLeft = carousel.scrollLeft;

};

const dragStart = (e) => {
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carousel.scrollLeft;
    indicators();
};

const dragging = (e) => {
    if (!isDragStart) return;
    e.preventDefault();
    isDragging = true;
    carousel.classList.add("dragging");
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    carousel.scrollLeft = prevScrollLeft - positionDiff;
    showHideIcons();
    indicators();
};

const dragStop = () => {
    isDragStart = false;
    carousel.classList.remove("dragging");

    if (!isDragging) return;
    isDragging = false;
    autoSlide();
    indicators();
};

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);

carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

carousel.addEventListener("mouseup", dragStop);
carousel.addEventListener("mouseleave", dragStop);
carousel.addEventListener("touchend", dragStop);

window.addEventListener("resize", () => {
    carousel.scrollTo({
        left: 0,
        behavior: 'smooth'
    });
});

window.addEventListener("load", () => {
    showHideIcons();
});

