
const timer = document.querySelector('.time');
const progress = document.querySelector('.progress');
const btn = document.querySelector('.next');
const radiocheck = document.querySelectorAll('.radiocheck');
const container = document.querySelector('.container');
const qn = document.querySelector('.qn');
const quest = document.querySelector('.quest');
const optionsContainer = document.querySelector('.options');
const resbtn = document.querySelector('.restart');
const errorPage = document.querySelector('.error');
const message = document.querySelector('.errmessage');

let timeValue = 30;
let questionNumber = 0;
let progressWidth = 100;
let timeInterval;
let correctAnswer = ' ';
let options = [];
let choice = '';
let score = 0;
let is_checked = false

function timing() {
  timeInterval = setInterval(() => {
    timeValue--;
    progressWidth -= 3.33;

    if (timeValue < 0) {
      nextQuestion();
    }

    if (timeValue < 20 && timeValue > 10) {
      setProgressColors('yellow');
    } else if (timeValue <= 10 && timeValue > 0) {
      setProgressColors('red');
    } else {
      setProgressColors('green');
    }

    progress.style.width = `${progressWidth}%`;
    timer.textContent = timeValue + 's';
  }, 1000);
}

function setProgressColors(color) {
  progress.style.backgroundColor = color;
  container.style.borderColor = color;
}

function fetchQuestion(questionNumber) {
  fetch('https://opentdb.com/api.php?amount=10&category=18&difficulty=medium')
    .then((response) => {
      if (!response.ok) {
       throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      quest.textContent = data.results[questionNumber].question;
      optionsContainer.innerHTML = '';
      correctAnswer = data.results[questionNumber].correct_answer;
      options = data.results[questionNumber].incorrect_answers;
      options.splice(Math.floor(Math.random() * options.length), 0, correctAnswer);

      options.forEach((option) => {
        optionsContainer.innerHTML += `
          <button class='opt1'>
            <span class='spa'>${option}</span>
            <input type='radio' name='option' class='radiocheck'>
          </button>
        `;
      });

      handleCheck()
    })
    .catch((err) =>{
      console.log(err)
      errorPage.style.display = 'block';
      message.textContent = 'An Error Occurred';
    });
}

function checkAns(choice) {
  if (choice === correctAnswer) {
    score += 10;
  }
  console.log(score);
}

function showScore() {
  questionNumber = 10;
  btn.textContent = 'DONE';
  document.querySelector('.res').style.display = 'block';
  const scores = document.querySelector('.scores');
  scores.textContent = score + '%';
  document.querySelector('.qn1').textContent = questionNumber + '/10';
}

btn.addEventListener('click', () => {
  checkAns(choice);
  clearInterval(timeInterval);
  timing();
  document.querySelector('.intro').style.display = 'none';
  btn.textContent = 'Next Question';
  nextQuestion();
});

function nextQuestion() {
  timeValue = 30;
  progressWidth = 100;
  questionNumber++;

  if (questionNumber === 10) return showScore();
  
  qn.textContent = questionNumber + '/10';
  fetchQuestion(questionNumber);
}

resbtn.addEventListener('click', () => {
  location.reload();
});

/* function showError() {
  errorPage.style.display = 'block';
  message.textContent = 'An Error Occurred';
} */

const rel = () => {
  location.reload();
};


function handleCheck(){
   btn.disabled = true

  const optt = document.querySelectorAll('.opt1');
      optt.forEach((option) => {
        
          
        option.addEventListener('click', () => {
        clearInterval(timeInterval)

          option.classList.remove('correct');
          option.classList.remove('wrong');
          choice = option.querySelector('.spa').textContent;
          option.querySelector('.radiocheck').setAttribute('checked', 'true');
          option.classList.add(choice === correctAnswer ? 'correct' : 'wrong');
          
             is_checked = true
             if(is_checked){
              optt.forEach((option) =>{
                option.disabled = true
               })
               btn.disabled = false
             }

        });
      });
}
