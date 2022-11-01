
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
            console.log("Connected to MQTT Broker");  
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
const onMQTTMessageArrive = (message, resetCb) => {
  const actualData = JSON.parse(message.payloadString);
  console.log("Message has arrived: ", actualData);
  if(actualData == 'RESET'){
    resetCb();
  }
};