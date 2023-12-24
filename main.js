Webcam.set({
width:350,
height:300,
image_format:'png',
png_quality:100
});

camera=document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image"src="'+data_uri+'"/>';
    });
}

console.log('ml5 version:',ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/DdiBYBCOh/model.json',modelLoaded);

function modelLoaded(){
    console.log('Model Loaded!');
}

function speak(){
    var synth=window.speechSynthesis;
    speak_data_1=tospeak;
    
    var utterThis=new SpeechSynthesisUtterance(speak_data_1);
    synth.speak(utterThis);
}
function check()
{
    img=document.getElementById('captured_image');
    classifier.classify(img,gotResult);
}
prediction_1="";
function gotResult(error,results){
    if(error){
        console.error(error);
    }else{
       console.log(results);
       document.getElementById("result_emotion_name").innerHTML=results[0].label;
       prediction_1=results[0].label;
       tospeak="";
       if(prediction_1=="Amazing"){
        tospeak="This Looks Amazing";
        document.getElementById("update_emoji").innerHTML="&#128076";
       }
       else if(prediction_1=="Best"){
        tospeak="You're The Best";
        document.getElementById("update_emoji").innerHTML="&#128077";
       }
       else if(prediction_1=="Victory"){
        tospeak="What A Great Victory";
        document.getElementById("update_emoji").innerHTML="&#9996";
       }
       speak();
    }
}