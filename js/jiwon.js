// chatGPT가 작성해 준 코드를 이용하였습니다.

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


  // 타이핑 효과

  const $text = document.querySelector(".title__typing .title__text");

// 글자 모음
const letters = [
  "HTML",
  "CSS", 
  "JavaScript",
  "React",
  "TypeScript"
];

// 글자 입력 속도
const speed = 100;
let i = 0;

// 타이핑 효과
const typing = async () => {  
  const letter = letters[i].split("");
  
  while (letter.length) {
    await wait(speed);
    $text.innerHTML += letter.shift(); 
  }
  
  // 잠시 대기
  await wait(800);
  
  // 지우는 효과
  remove();
}

// 글자 지우는 효과
const remove = async () => {
  const letter = letters[i].split("");
  
  while (letter.length) {
    await wait(speed);
    
    letter.pop();
    $text.innerHTML = letter.join(""); 
  }
  
  // 다음 순서의 글자로 지정, 타이핑 함수 다시 실행
  i = !letters[i+1] ? 0 : i + 1;
  typing();
}

// 딜레이 기능 ( 마이크로초 )
function wait(ms) {
  return new Promise(res => setTimeout(res, ms))
}

// 초기 실행
setTimeout(typing, 1500);
  