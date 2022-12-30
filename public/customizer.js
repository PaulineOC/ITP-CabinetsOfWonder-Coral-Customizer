const CORAL_TYPE = {
  FUNGIA_SCUTARIA: "FUNGIA_SCUTARIA",
  ACROPORA_LORIPES: "ACROPORA_LORIPES",
  ACROPORA_MILLEPORA: "ACROPORA_MILLEPORA"
}; 


const STATES = {
  START: "START",
  CUSTOMIZATION: "CUSTOMIZATION",
  END: "END",
}; 

let GameState = STATES.START;



// Images:
let ocean;
let FSCoral;
let ALCoral;
let AMCoral;
let AMCoral2;

//Form selection:
let selectedCoral = null;
let selectedColor = { red: 0, green: 0, blue: 255};
let selectedName = ``;

//Form stuff:

const fontSize1 = 60;
const fontSize2 = 48;
const fontSize3 = 24;
let startButton;

let FSCoralButton;
let ALCoralButton;
let AMCoralButton;
let nameInput;
let colorPicker;
let submitButton;


let topic = 'CoralCustomizer';
let topic2 = 'ResetCustomizer';


function preload(){
  ocean = loadImage('Assets/ocean.png');
  FSCoral = loadImage('Assets/FSCoral-G.png');
  ALCoral = loadImage('Assets/ALCoral-G.png');
  AMCoral = loadImage('Assets/AMCoral-G.png');
  AMCoral2 = loadImage('Assets/AMCoral-G2.png');
  setupMQTT();

}


function setup() {
  console.log("Setup");
  ctx = createCanvas(window.innerWidth, window.innerHeight);

  //Form setup:
  setupUI();
}


function setupUI(){

  //START
  startButton = createButton('Start');
  startButton.position(window.innerWidth/2-fontSize2, window.innerHeight/2+fontSize2+50);
  startButton.style('font-size', `${48}px`);
  startButton.style('background-color', 'white');


  imageMode(CENTER);
  FSCoralButton = createImg('Assets/FSCoral-G.png');
  FSCoralButton.position(window.innerWidth/2-200, (window.innerHeight/2)-(125));
  FSCoralButton.mousePressed(()=>{
    selectedCoral = CORAL_TYPE.FUNGIA_SCUTARIA;
  });

  ALCoralButton = createImg('Assets/ALCoral-G.png');
  ALCoralButton.position(window.innerWidth/2, (window.innerHeight/2)-(125));
  ALCoralButton.mousePressed(()=>{
    selectedCoral = CORAL_TYPE.ACROPORA_LORIPES;
  });

  AMCoralButton = createImg('Assets/AMCoral-G2.png');
  AMCoralButton.position(window.innerWidth/2+200, (window.innerHeight/2)-(125));
  AMCoralButton.mousePressed(()=>{
    selectedCoral = CORAL_TYPE.ACROPORA_MILLEPORA;
  });

  nameInput = createInput('').attribute('maxlength', 12);
  nameInput.position(window.innerWidth/2-100, window.innerHeight/2+10);
  nameInput.size(200, 20);
  nameInput.input((e)=>{
    selectedName = e.target.value;
  });

  colorPicker = createColorPicker(color(selectedColor.red, selectedColor.green, selectedColor.blue));
  let y = window.innerHeight/2 + 100;
  colorPicker.position(window.innerWidth/2-20, 520);

  const submitWidth = textWidth("Submit");
  submitButton = createButton('Submit');
  submitButton.position(window.innerWidth/2-submitWidth, 600);
  submitButton.style('font-size', `${fontSize3}px`);
  submitButton.style('background-color', 'white');
  submitButton.mousePressed(()=>{
    submitFn();
  });

  // Defaulting:
  startButton.mousePressed(()=>{
      startButton.hide();
      GameState = STATES.CUSTOMIZATION;
      showCustomizerElements();
  });
  hideCustomizerElements();
}

function submitFn(){
  const colors = colorPicker.color().levels;
  selectedColor.red = colors[0];
  selectedColor.green = colors[1];
  selectedColor.blue = colors[2];

  if(selectedName && selectedName !== " " &&  selectedCoral){
      sendMqttMessage();
      hideCustomizerElements();
      GameState = STATES.END;
  }
}


function showCustomizerElements(){
  FSCoralButton.show();
  ALCoralButton.show();
  AMCoralButton.show();
  nameInput.show();
  colorPicker.show();
  submitButton.show();
}

function hideCustomizerElements(){
  FSCoralButton.hide();
  ALCoralButton.hide();
  AMCoralButton.hide();
  nameInput.hide();
  colorPicker.hide();
  submitButton.hide();
}

function draw() {
  imageMode(CORNER);
  image(ocean, 0,0, window.innerWidth, window.innerHeight);

  switch(GameState){
    case STATES.START:
      drawStart(); 
      break;
    case STATES.CUSTOMIZATION: 
      drawCustomizer();
      break;
    case STATES.END:
      drawEnd();
      break;
  }
}

function drawStart(){
  imageMode(CENTER);
  fill('black');
  textAlign(CENTER);
  textSize(fontSize1);
  const phrase1 = "Welcome to the Coral Customizer";
  const phrase1Width = textWidth(phrase1);
  text(phrase1, window.innerWidth/2, (window.innerHeight/2)-fontSize1);

  textSize(fontSize2);
  const phrase2 = `Fill out your coral's information`;
  const phrase2Width = textWidth(phrase2);

  text(phrase2, window.innerWidth/2, (window.innerHeight/2)+fontSize2);
}

function drawCustomizer(){
  fill(255,255,255, 200);
  rectMode(CENTER);
  rect(
    window.innerWidth/2, 
    window.innerHeight/2, 
    window.innerWidth* 0.75, 
    window.innerHeight*0.75);

  //Coral Type
  textSize(fontSize3);
  fill('black');
  const phrase1 = "Which coral did you select?";
  const phrase1Width = textWidth(phrase1);
  text(phrase1, window.innerWidth/2, (window.innerHeight/2)-200);

  const phrase2 = `Selected coral: ${selectedCoral === null ? `` : selectedCoral.replace('_', ' ').toLowerCase()}`;
  const phrase2Width = textWidth(phrase2);
  text(phrase2, window.innerWidth/2, (window.innerHeight/2)-150);

  const phrase3 = "What name would you like to give it (up to 12 letters)?";
  const phrase3Width = textWidth(phrase3);
  text(phrase3, window.innerWidth/2, (window.innerHeight/2));

  const phrase4 = "Choose your corals color";
  const phrase4Width = textWidth(phrase3);
  text(phrase4, window.innerWidth/2, (window.innerHeight/2)+75);

}

function drawEnd(){

  imageMode(CENTER);
  fill('black');
  textAlign(CENTER);
  textSize(fontSize1);
  const phrase1 = "Thanks for submitting your coral's information";
  const phrase1Width = textWidth(phrase1);
  text(phrase1, window.innerWidth/2, (window.innerHeight/2)-fontSize1);

  textSize(fontSize2);
  const phrase2 = `Please continue to the next interactive`;
  const phrase2Width = textWidth(phrase2);

  text(phrase2, window.innerWidth/2, (window.innerHeight/2)+fontSize2);

}

function resetInteractive(){
  hideCustomizerElements();
  console.log("Restarting");
  startButton.show();
  GameState = STATES.START;
}


function keyPressed() {
  if(keyCode=== DOWN_ARROW){
    resetInteractive();
  }
}

// MQTT: 
function setupMQTT(){
  // MQTT client details:
  let MQTTBroker = {
      hostname: `itp-cow-coral.cloud.shiftr.io/mqtt`,
      port: `1883`
  };
  // client credentials:
  let MQTTCreds = {
      clientID: 'Coral-Community',
      userName: 'itp-cow-coral',
      password: 'KfJGdpgNyNgxeDJX'
  }
    //MQTT - Private:

  client = new Paho.MQTT.Client(MQTTBroker.hostname, Number(MQTTBroker.port), MQTTCreds.clientID);
    // set callback handlers for the client:
    client.onConnectionLost = () => {
      console.log("lost connection");
    };
    client.onMessageArrived = onMQTTMessageArrive;
  // connect to the MQTT broker:
    client.connect(
        {
            onSuccess: () => {
            console.log("connected");  
              client.subscribe(topic);
              client.subscribe(topic2);
            },       // callback function for when you connect
            userName: MQTTCreds.userName,   // username
            password: MQTTCreds.password,   // password
            useSSL: true                // use SSL
        }
    );
}

function sendMqttMessage() {
    // if the client is connected to the MQTT broker:
    if (client.isConnected()) {
        const finalData = {
          coralType: selectedCoral,
          name: selectedName,
          red: selectedColor.red.toString(),
          green: selectedColor.green.toString(),
          blue: selectedColor.blue.toString(),
          state: "CORAL_CUSTOMIZER",
        };

        console.log(finalData);
        const finalDataString = JSON.stringify(finalData);
        // start an MQTT message:
        message = new Paho.MQTT.Message(finalDataString);
        // choose the destination topic:
        message.destinationName = topic;
        // send it:
        client.send(message);
    }
}

//Use MQTT to reset interactive
const onMQTTMessageArrive = (message) => {
  const actualData = JSON.parse(message.payloadString);
  console.log("Message has arrived: ", actualData);
  if(actualData == 'RESET'){
    resetInteractive();
  }
};