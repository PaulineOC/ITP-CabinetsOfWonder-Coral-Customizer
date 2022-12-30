
//CONSTANT
const userCoral = {
	species: null, 
	color: null,
	name: '',
};

//MAIN
const leftContainer = document.getElementById('left');
const rightContainer = document.getElementById('right');

const coralResponse = document.getElementById('coralResponse');

const toggleCoralResponse = (category, selection) => {

	coralResponse.classList.remove('invisible');

	const ans = CORAL_RESPONSES[category][selection];
	console.log(ans);

	console.log(coralResponse);

	coralResponse.innerHTML = ans;

};

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

	hideAllCoralImgs();

	const currImg = document.getElementById(userCoral.species);
	currImg.classList.remove('hidden');

	// Unhide color section

	//NEW
	const container = document.getElementById('CUSTOMIZATION');
	container.classList.add('CustomizationFilled');

	const left = document.getElementById('left');
	left.prepend(coralContainer);

	colorContainer.classList.remove('invisible');
	coralResponse.classList.remove('invisible');

	//Toggle Response: 
	toggleCoralResponse(CORAL_RESPONSE_CATEGORIES.SPECIES,userCoral.species);
};

const unselectSpeciesButtons = () => {
	FS.classList.remove('selected');
	AL.classList.remove('selected');
	AM.classList.remove('selected');
};

const hideAllCoralImgs = () => {
	FSImg.classList.remove('invisible');
	FSImg.classList.add('hidden');
	ALImg.classList.add('hidden');
	AMImg.classList.add('hidden');
}

FS.onclick = onSpeciesClick.bind(this, CORAL_SPECIES['FUNGIA_SCUTARIA']);
AL.onclick = onSpeciesClick.bind(this, CORAL_SPECIES['ACROPORA_LORIPES']);
AM.onclick = onSpeciesClick.bind(this, CORAL_SPECIES['ACROPORA_MILLEPORA']);




// Colors
const colorContainer = document.getElementById('color-container');

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
	e.target.classList.add('colorSelected');

	nameContainer.classList.remove('invisible');
	submitContainer.classList.remove('invisible');

	const coralPrevImgsContainer = document.getElementById('coralPreviewContainer');

	const coralPrevImgs = coralPrevImgsContainer.children.forEach((coral)=>{
		removeColorsClasses(coral);
 		coral.classList.add(COLORS[color]);
	});
};

const removeColorsClasses = (element) => {
	element.classList.remove('RED');
	element.classList.remove('ORANGE');
	element.classList.remove('YELLOW');
	element.classList.remove('GREEN');
	element.classList.remove('CYAN');
	element.classList.remove('BLUE');
	element.classList.remove('PINK');
	element.classList.remove('PURPLE');
};


const unselectColorButtons = () => {
	redButton.classList.remove('colorSelected');
	orangeButton.classList.remove('colorSelected');
	yellowButton.classList.remove('colorSelected');
	greenButton.classList.remove('colorSelected');
	cyanButton.classList.remove('colorSelected');
	blueButton.classList.remove('colorSelected');
	purpleButton.classList.remove('colorSelected');
	pinkButton.classList.remove('colorSelected');
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
const nameLabel = document.getElementById('name');
const nameInput = document.getElementById('nameInput');

const hideMobileKeyboardOnReturn = (element) => {
    element.addEventListener('keyup', (keyboardEvent) => {
        const key = keyboardEvent.code || keyboardEvent.keyCode;
        if (key === 'Enter' || key === 13) {
            element.blur();
        }
    });
};

hideMobileKeyboardOnReturn(nameInput);
nameInput.addEventListener('input', (e) => {

	if(hasSubmit){
		if(nameInput.value.trim().length > 0 ){
			nameLabel.classList.remove('has-error');
			nameInput.classList.remove('has-error');
		}
		else{
			nameLabel.classList.add('has-error');
			nameInput.classList.add('has-error');
		}
	}
});

//Submit
const submitContainer = document.getElementById('submit-container');
const submit = document.getElementById('submit');
let hasSubmit = false;

const onSubmitClick = (endCb) => {
	hasSubmit = true;
	console.log("On submit fn:");

	if(nameInput.value && nameInput.value.trim().length > 0){

		submit.classList.add('disabled');
		submit.disabled = true;

		console.log("Name is valid - SUBMITTING");
		userCoral.name = name.value.trim();
		sendMqttMessage(userCoral);

		endCb();
	}
	else{
		nameLabel.classList.add('has-error');
		nameInput.classList.add('has-error');
	}
};


//RESET

