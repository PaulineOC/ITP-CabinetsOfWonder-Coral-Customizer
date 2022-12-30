const startDiv = document.getElementById("START");
const customizeDiv = document.getElementById("CUSTOMIZATION");
const endDiv = document.getElementById("END");

const mainContainer = document.getElementById('mainContainer');


//START
const start = document.getElementById("start-btn");
start.onclick = () => {
	hideAll();
	customizeDiv.classList.remove("hidden");
};

const hideAll = () => {
	startDiv.classList.add("hidden");
	customizeDiv.classList.add("hidden");
	endDiv.classList.add("hidden");
};

const endingContainer = document.getElementById('END');

const loaderContainer = document.getElementById('loaderContainer');
const final = document.getElementById('finalContainer');


const timerText = document.getElementById('timerText');
let timer = 99;
let loaderTimer = null;

const toEndScreens = () => {
	hideAll();
	endingContainer.classList.remove('hidden');
	loaderTimer = setInterval(vendingTimer , 2500);
};


const vendingTimer = () => {
		loaderContainer.classList.add('hidden');
		final.classList.remove('hidden');
		clearInterval(loaderTimer);

		const newClock = 	`
			<div class="base-timer">
				<svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
					<g class="base-timer__circle">
				      <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
				      <path
				        id="base-timer-path-remaining"
				        stroke-dasharray="283"
				        class="base-timer__path-remaining ${remainingPathColor}"
				        d="
				          M 50, 50
				          m -45, 0
				          a 45,45 0 1,0 90,0
				          a 45,45 0 1,0 -90,0
				        "
				      ></path>
				    </g>
				  </svg>
				  <span class="resetText">Resetting in:&nbsp;</span>
				  <span id="base-timer-label" class="base-timer__label">${formatTime(
				    timeLeft
				  )}</span>
			</div>`;
		document.getElementById("clock").innerHTML = newClock;
		startTimer();

	}


submit.onclick = onSubmitClick.bind(this, toEndScreens);

 
window.addEventListener('DOMContentLoaded', () => {
	console.log('DOM loaded');
	setupMQTT();
});



/* TIMER */
// Credit: Mateusz Rybczonec

const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;

const COLOR_CODES = {
  info: {
    color: "green"
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD
  }
};

const TIME_LIMIT = 10;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;


function onTimesUp() {
  clearInterval(timerInterval);
  resetInteractive();
}

function startTimer() {
  timerInterval = setInterval(() => {
    timePassed = timePassed += 1;
    timeLeft = TIME_LIMIT - timePassed;
    document.getElementById("base-timer-label").innerHTML = formatTime(
      timeLeft
    );
    setCircleDasharray();
    setRemainingPathColor(timeLeft);

    if (timeLeft === 0) {
      onTimesUp();
    }
  }, 1000);
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  return `${time}`;
}

function setRemainingPathColor(timeLeft) {
  const { alert, warning, info } = COLOR_CODES;
  if (timeLeft <= alert.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(warning.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(alert.color);
  } else if (timeLeft <= warning.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(info.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(warning.color);
  }
}

function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / TIME_LIMIT;
  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
  const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
  document
    .getElementById("base-timer-path-remaining")
    .setAttribute("stroke-dasharray", circleDasharray);
}


// RESET 
const resetInteractive = () => {
	console.log('Resetting');
	resetEnd();
	resetStart();
	resetCustomization();


};

const resetStart = () => {
	startDiv.classList.remove('hidden');
};

const resetCustomization = () => {
	userCoral.species = null;

	unselectSpeciesButtons();
	coralResponse.classList.add('invisible');

	hideAllCoralImgs();
	FSImg.classList.add('invisible');

	removeColorsClasses(FSImg);
	removeColorsClasses(AMImg);
	removeColorsClasses(ALImg);


	//Hide Colors
	userCoral.color = null;
	colorContainer.classList.add('invisible');
	unselectColorButtons();

	//Hide Name
	userCoral.name = '';
	nameContainer.classList.add('invisible');
	nameInput.value = '';

	//Hide Finish Button
	submitContainer.classList.add('invisible');
	submit.disabled = false;

};

const resetEnd = () => {
	timeLeft = TIME_LIMIT;
	timePassed = 0;
	document.getElementById("clock").innerHTML = ``;
	final.classList.add('hidden');
	loaderContainer.classList.remove('hidden');
	endingContainer.classList.add('hidden');

};





