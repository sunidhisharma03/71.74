
//  Data base link = https://ecothon-11b92-default-rtdb.asia-southeast1.firebasedatabase.app/
// web API KEY = AIzaSyBeMyr5JKwJYGv2rWnIR0tgtqQj1FMLQ7w



#include <Arduino.h>
#include <WiFi.h>
#include <Firebase_ESP_Client.h>
#include <addons/TokenHelper.h>
#include <addons/RTDBHelper.h>


#define SSID "nwaran_vako_xaina"
#define PASSWORD "12345678ku"

#define WEB_API "AIzaSyBeMyr5JKwJYGv2rWnIR0tgtqQj1FMLQ7w"
#define Data_base_url "https://ecothon-11b92-default-rtdb.asia-southeast1.firebasedatabase.app/"



FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

bool Sign_Up = true;
unsigned long send_Data_prev_millis= 0;

// pin defination 
int voltage1 = 34;
int voltage2 = 35;
int current1 = 32;
int current2 = 33;

int Relay1 = 27;
int Relay2 = 26;


void wifi_init(){
  WiFi.begin(SSID,PASSWORD);
  Serial.println("Conecting to wifi.");

  while (WiFi.status() != WL_CONNECTED){
    Serial.print(".");
  }
  Serial.println();
  Serial.println("Connected with IP :");
  Serial.print(WiFi.localIP());
  Serial.println();
}

void Firebase_Config(){
  config.api_key= WEB_API ;
  config.database_url = Data_base_url;  
  if (Firebase.signUp (&config,&auth, "","")){
    Serial.println("Successfull connection to database");
    Sign_Up = true;
  }
  else {
    Serial.printf("%s\n",config.signer.signupError.message.c_str());
  }
  config.token_status_callback  = tokenStatusCallback;
  Firebase.begin(&config,&auth);
  Firebase.reconnectWiFi(true);
}

float Voltage_Calibrate(float data){
  data = (data *5)/1200;
  if (data >= 0){
  return data;
  }
  else{
    return data;
  }
}

float Current_Calibrate(float data){
  
data = (data -2960) /5;
  if (data <= 0){
    return -1*data;
    if (data >= 0){
    return data;
    }
  }
}


void Data_send_to_firebse (float data , const char* Path, const char*value){
  if (Firebase.RTDB.setFloat(&fbdo, Path ,data)){
      Serial.println();
      Serial.print(data);
      Serial.print(" ");
      Serial.print(value);
      Serial.println(" -> Data Sent Successfull");    
    }
    else{
      Serial.println();
      Serial.print("Data Sent Failed : ");
      Serial.print(fbdo.errorReason());

    }
}


void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);
  wifi_init ();
  Firebase_Config();
  pinMode(voltage1, INPUT);
  pinMode(voltage2, INPUT);
  pinMode(current1, INPUT);
  pinMode(current2, INPUT);
  pinMode(Relay1, OUTPUT);
  pinMode(Relay2, OUTPUT);

}

void loop() {
  if(Firebase.ready()&& Sign_Up && (millis() - send_Data_prev_millis > 5000 || send_Data_prev_millis == 0 )){
    send_Data_prev_millis = millis();

    float voltage1_data = analogRead (voltage1);
    voltage1_data= Voltage_Calibrate(voltage1_data);
    Data_send_to_firebse (voltage1_data, "SensorReading/voltage1" , "voltage1");

    float voltage2_data = analogRead (voltage2);
    voltage2_data= Voltage_Calibrate(voltage2_data);
    Data_send_to_firebse (voltage2_data , "SensorReading/voltage2", "voltage2");

    float current1_data = analogRead (current1);
    current1_data = Current_Calibrate(current1_data);
    Data_send_to_firebse (current1_data , "SensorReading/current1", "current1");

    float current2_data = analogRead (current2);
    current2_data = Current_Calibrate(current2_data);
    current1_data = Current_Calibrate(current2_data );
    Data_send_to_firebse (current2_data , "SensorReading/current2","current2");

  
  
  
    if(Firebase.RTDB.getInt(&fbdo, "Relay/relay1")){
      if (fbdo.dataType()=="int"){
        int Relay_status = fbdo.intData();
        if (Relay_status == 1){
          digitalWrite(Relay1, LOW);
          Serial.println(" Relay1 is ON");
        }
        else if (Relay_status ==0) {
          digitalWrite(Relay1, HIGH);
          Serial.println("Relay1 is OFF");
        }
      }
      else{
        Serial.println("NO Data Received");
      } 

     if(Firebase.RTDB.getInt(&fbdo, "Relay/relay2")){
      if (fbdo.dataType()=="int"){
        int Relay_status = fbdo.intData();
        if (Relay_status == 1){
          digitalWrite(Relay2, LOW);
          Serial.println("Relay2 is ON");
        }
        else if (Relay_status ==0) {
          digitalWrite(Relay2, HIGH);
          Serial.println("Relay2 is OFF");
        }
      }
      else{
        Serial.println("NO Data Received");
      }
    }
  }
  }
}