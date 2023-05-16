// chatGPT가 작성해 준 코드입니다 하하하

document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelector('.slides');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    const slideWidth = document.querySelector('.slide').clientWidth;
    let currentPosition = 0;
  
    prevButton.addEventListener('click', () => {
      currentPosition += slideWidth;
      if (currentPosition > 0) {
        currentPosition = -slideWidth * 2;
      }
      slides.style.transform = `translateX(${currentPosition}px)`;
    });
  
    nextButton.addEventListener('click', () => {
      currentPosition -= slideWidth;
      if (currentPosition < -slideWidth * 2) {
        currentPosition = 0;
      }
      slides.style.transform = `translateX(${currentPosition}px)`;
    });
  });
  