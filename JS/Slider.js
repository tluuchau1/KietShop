const carousel = document.querySelector(".carousel"),
    firstImg = carousel.querySelectorAll("img")[0],
    arrowIcons = document.querySelectorAll(".wrapper i");

let isDragStart = false,
    isDragging = false,
    prevPageX,
    prevScrollLeft = 0,
    positionDiff = 0;

const showHideIcons = () => {
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth;
    arrowIcons[0].style.display =
        carousel.scrollLeft == 0 ? "none" : "block";
    arrowIcons[1].style.display =
        carousel.scrollLeft == scrollWidth ? "none" : "block";
};

arrowIcons.forEach((icon) => {
    icon.addEventListener("click", () => {
        let firstImgWidth = firstImg.clientWidth;
        carousel.scrollLeft +=
            icon.id == "left" ? -firstImgWidth : firstImgWidth;
        setTimeout(() => showHideIcons(), 60);
    });
});

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
};

const dragging = (e) => {
    if (!isDragStart) return;
    e.preventDefault();
    isDragging = true;
    carousel.classList.add("dragging");
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    carousel.scrollLeft = prevScrollLeft - positionDiff;
    showHideIcons();
};

const dragStop = () => {
    isDragStart = false;
    carousel.classList.remove("dragging");

    if (!isDragging) return;
    isDragging = false;
    autoSlide();
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

