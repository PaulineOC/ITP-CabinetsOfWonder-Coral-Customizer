const startDiv = document.getElementById("START");
const customizeDiv = document.getElementById("CUSTOMIZATION");
const endDiv = document.getElementById("END");

const mainContainer = document.getElementById('mainContainer');


//CONSTANT
const userCoral = {
	species: null, 
	color: null,
	name: '',
};

//START
const start = document.getElementById("start-btn");
start.onclick = () => {
	hideAll();
	customizeDiv.classList.remove("hidden");
	mainContainer.style.justifyContent = 'start';


};

const hideAll = () => {
	startDiv.classList.add("hidden");
	customizeDiv.classList.add("hidden");
	endDiv.classList.add("hidden");
};

onDOMContentLoaded = () => {

};

//MAIN
const leftContainer = document.getElementById('left');
const rightContainer = document.getElementById('right');


//Species

const coralContainer = document.getElementById('species-container');

const FS = document.getElementById('FSButton');
const AL = document.getElementById('ALButton');
const AM = document.getElementById('AMButton');

const FSImg = document.getElementById(CORAL_SPECIES['FUNGIA_SCUTARIA']);
const AMImg = document.getElementById(CORAL_SPECIES['ACROPORA_MILLEPORA']);
const ALImg = document.getElementById(CORAL_SPECIES['ACROPORA_LORIPES']);

const onSpeciesClick = (coral, e) => {
	userCoral.species = CORAL_SPECIES[coral];
	unselectSpeciesButtons();

	if(e.target.tagName === "IMG"){
		e.target.parentNode.classList.add('selected');
	}
	else if(e.target.tagName === "BUTTON"){
		e.target.classList.add('selected');
	}

	let top = document.getElementById('top');
	if(top){
		leftContainer.insertBefore(coralContainer,leftContainer.firstChild);
		leftContainer.classList.remove('hidden');
		top.remove();
		rightContainer.classList.remove('hidden');
	}

	hideAllCoralImgs();
	const currImg = document.getElementById(userCoral.species);
	currImg.classList.remove('hidden');


};

const unselectSpeciesButtons = () => {
	FS.classList.remove('selected');
	AL.classList.remove('selected');
	AM.classList.remove('selected');
};

const hideAllCoralImgs = () => {
	FSImg.classList.add('hidden');
	ALImg.classList.add('hidden');
	AMImg.classList.add('hidden');
}



FS.onclick = onSpeciesClick.bind(this, CORAL_SPECIES['FUNGIA_SCUTARIA']);
AL.onclick = onSpeciesClick.bind(this, CORAL_SPECIES['ACROPORA_LORIPES']);
AM.onclick = onSpeciesClick.bind(this, CORAL_SPECIES['ACROPORA_MILLEPORA']);


// Colors
const redButton = document.getElementById('RED');
const orangeButton = document.getElementById('ORANGE');
const yellowButton = document.getElementById('YELLOW');
const greenButton = document.getElementById('GREEN');
const cyanButton = document.getElementById('CYAN');
const blueButton = document.getElementById('BLUE');
const purpleButton = document.getElementById('PURPLE');
const pinkButton = document.getElementById('PINK');

const onColorClick = (color, e) => {
	userCoral.color = COLORS[color];
	unselectColorButtons();
	e.target.classList.add('selected');

	nameContainer.classList.remove('hidden');
	submitContainer.classList.remove('hidden');
};

const unselectColorButtons = () => {
	redButton.classList.remove('selected');
	orangeButton.classList.remove('selected');
	yellowButton.classList.remove('selected');
	greenButton.classList.remove('selected');
	cyanButton.classList.remove('selected');
	blueButton.classList.remove('selected');
	purpleButton.classList.remove('selected');
	pinkButton.classList.remove('selected');
};

redButton.onclick = onColorClick.bind(this, 'RED');
orangeButton.onclick = onColorClick.bind(this, 'ORANGE');
yellowButton.onclick = onColorClick.bind(this, 'YELLOW');
greenButton.onclick = onColorClick.bind(this, 'GREEN');
cyanButton.onclick = onColorClick.bind(this, 'CYAN');
blueButton.onclick = onColorClick.bind(this, 'BLUE');
purpleButton.onclick = onColorClick.bind(this, 'PURPLE');
pinkButton.onclick = onColorClick.bind(this, 'PINK');

//Name

const nameContainer = document.getElementById('name-container');
const name = document.getElementById('nameInput');

const hideMobileKeyboardOnReturn = (element) => {
    element.addEventListener('keyup', (keyboardEvent) => {
        const key = keyboardEvent.code || keyboardEvent.keyCode;
        if (key === 'Enter' || key === 13) {
            element.blur();
        }
    });
};

hideMobileKeyboardOnReturn(name);

//Submit
const submitContainer = document.getElementById('submit-container');


