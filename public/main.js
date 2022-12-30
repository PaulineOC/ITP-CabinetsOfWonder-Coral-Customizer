const startDiv = document.getElementById("START");
const customizeDiv = document.getElementById("CUSTOMIZATION");
const endDiv = document.getElementById("END");

const mainContainer = document.getElementById('mainContainer');


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



const endingContainer = document.getElementById('END');
const endTransition = () => {
	//Reset customize.js
	console.log('Vending:');
	hideAll();
	endingContainer.classList.remove('hidden');
};


submit.onclick = onSubmitClick.bind(this, endTransition);


//END


window.addEventListener('DOMContentLoaded', () => {
	console.log('DOM loaded');
	setupMQTT();
});





