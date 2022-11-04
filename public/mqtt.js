
// MQTT: 
function setupMQTT(){
  // MQTT client details:
  let MQTTBroker = {
      hostname: `itp-cow-coral.cloud.shiftr.io`,
      port: `443`
  };
  // client credentials:
  let MQTTCreds = {
      clientID: 'CoralCustomizer-v2',
      userName: 'itp-cow-coral',
      password: 'KfJGdpgNyNgxeDJX'
  }

  //MQTT - Private:

  client = new Paho.MQTT.Client(MQTTBroker.hostname, Number(MQTTBroker.port), MQTTCreds.clientID);
    // set callback handlers for the client:
    client.onConnectionLost = (e) => {
      console.log(e.errorMessage);
      console.log("lost connection");
    };
    client.onMessageArrived = onMQTTMessageArrive;
  // connect to the MQTT broker:
    client.connect(
        {
            onSuccess: () => {
            console.log("Connected to MQTT Broker");  
              client.subscribe(`/${MQTT_TOPICS['CUSTOMIZER']}`);
            },       // callback function for when you connect
            userName: MQTTCreds.userName,   // username
            password: MQTTCreds.password,   // password
            useSSL: true                // use SSL
        }
    );
}

function sendMqttMessage(data) {
    // if the client is connected to the MQTT broker:
    if (client.isConnected()) {

        const formattedData = {
          ...data,
          state: MQTT_TOPICS['CUSTOMIZER']
        };
        console.log(formattedData);

        const finalDataString = JSON.stringify(formattedData);
        // start an MQTT message:
        message = new Paho.MQTT.Message(finalDataString);
        // choose the destination topic:
        message.destinationName = MQTT_TOPICS['CUSTOMIZER'];
        // send it:
        client.send(message);
        return true;
    }
    else{
      console.log("Not connected");
      return false;
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