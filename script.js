/* const timer = document.querySelector('.time')
const progress = document.querySelector('.progress')
const btn = document.querySelector('.next')
const radiocheck = document.querySelectorAll('.radiocheck')
const container = document.querySelector('.container')

let timeValue = 30
let qustionNumber = 0
let progressWidth = 100
let timeInt
let correctAns = ' '
let optt 
let choice = '' 
let score = 0

function timing(){
     timeInt = setInterval(() =>{
        timeValue--
        progressWidth -= 3.33
        if(timeValue < 0){
            nextQuestion()
        }
        if(timeValue < 20 && timeValue > 10 ){
            progress.style.backgroundColor = 'yellow'
            container.style.borderColor = 'yellow'
        }else if(timeValue <= 10 && timeValue > 0){
            progress.style.backgroundColor = 'red'
            container.style.borderColor = 'red'
        }else{
            progress.style.backgroundColor = 'green'
            container.style.borderColor = 'green'
        }
        
        progress.style.width = `${progressWidth}%`
        timer.textContent = timeValue + 's'
       },1000)
}
  

btn.addEventListener('click', (e) =>{
    checkAns(choice)
   clearInterval(timeInt)
   timing()
   document.querySelector('.intro').style.display = 'None'
   e.target.textContent = 'Next Question'
   nextQuestion()
})
function nextQuestion(){
    timeValue = 30
    progressWidth = 100
    
    qustionNumber++
    if(qustionNumber == 10){
        qustionNumber = 10
        btn.textContent = 'DONE'
        showScore()
    }

    let qn = document.querySelector('.qn')
    qn.textContent = qustionNumber + '/10'

    fetchQuestion(qustionNumber)
}

 const fetchQuestion = async function(qustionNumber){
    try{
        const response = await fetch('https://opentdb.com/api.php?amount=10&category=18&difficulty=medium')
        const data = await response.json()
    
        let quest = document.querySelector('.quest')
          quest.textContent = data.results[qustionNumber].question
         
           let optionsContainer = document.querySelector('.options');
        optionsContainer.innerHTML = '';
    
        correctAns =  data.results[qustionNumber].correct_answer
        let a =  data.results[qustionNumber].incorrect_answers
        let randIndex = Math.floor(Math.random() * a.length)
        let optArray = []
        optArray.splice(randIndex,0,correctAns)
    
        for(let i = 0; i < a.length; i++){
          optArray.push(a[i])
        }
    
    
        for(let i = 0; i < optArray.length; i++){
            optionsContainer.innerHTML += `
              <div class='opt1'>
                <span class='spa'>${optArray[i]}</span>
                <input type='radio' name='option' class='radiocheck'>
              </div>
            `
          }
          optt = document.querySelectorAll('.opt1')
          for(let i = 0; i < optt.length; i ++){
            optt[i].classList.remove('correct')
            optt[i].classList.remove('wrong')

          }
         optt.forEach((el) =>{
         el.addEventListener('click', () =>{
            choice = el.querySelector('.spa').textContent
            el.querySelector('.radiocheck').setAttribute('checked', 'true')
            el.classList.add('correct')
        })
    })
       
    }
   catch(err){
     showError()
   }
} 
 


function checkAns(choice){
    if(choice == correctAns){
        score += 10
    }else{
        score += 0
    }
    console.log(score)
}

function showScore(){
    document.querySelector('.res').style.display = 'block'
   let scores = document.querySelector('.scores')
   scores.textContent = score + '%'
   document.querySelector('.qn1').textContent = qustionNumber +'/10'
}

const resbtn = document.querySelector('.restart')
resbtn.addEventListener('click', () =>{
    location.reload()
})

function showError(){
    let errorpge = document.querySelector('.error')
    let message = document.querySelector('.errmessage')
     errorpge.style.display = 'block'
     message.textContent = 'An Error Occured'
}
const rel = () =>{
    location.reload()
} */

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
          <div class='opt1'>
            <span class='spa'>${option}</span>
            <input type='radio' name='option' class='radiocheck'>
          </div>
        `;
      });

      const optt = document.querySelectorAll('.opt1');
      optt.forEach((el) => {
        el.classList.remove('correct');
        el.classList.remove('wrong');
        el.addEventListener('click', () => {
          choice = el.querySelector('.spa').textContent;
          el.querySelector('.radiocheck').setAttribute('checked', 'true');
          el.classList.add(choice === correctAnswer ? 'correct' : 'wrong');
        });
      });
    })
    .catch(showError);
}

function checkAns(choice) {
  if (choice === correctAnswer) {
    score += 10;
  }
  console.log(score);
}

function showScore() {
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

  if (questionNumber === 10) {
    questionNumber = 10;
    btn.textContent = 'DONE';
    showScore();
  }

  qn.textContent = questionNumber + '/10';
  fetchQuestion(questionNumber);
}

resbtn.addEventListener('click', () => {
  location.reload();
});

function showError() {
  errorPage.style.display = 'block';
  message.textContent = 'An Error Occurred';
}

const rel = () => {
  location.reload();
};
