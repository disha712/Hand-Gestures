https://teachablemachine.withgoogle.com/models/k7brqPloB/
prediction1="";
prediction2="";

Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
})

camera=document.getElementById("camera");
Webcam.attach('#camera');
function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'">';
    })
}

console.log('ml5 version:',ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/Wovfz2XB7/model.json',modelLoaded);

function modelLoaded(){
    console.log("Model is Loaded");
}

function speak(){
    synth=window.speechSynthesis;
    speak_data1="The first prediction is "+prediction1;
    speak_data2="The second prediction is"+prediction2;
    utterThis=new SpeechSynthesisUtterance(speak_data+speak_data2);
    synth.speak(utterThis);
}

function check(){
    img=document.getElementById('captured_image');
    classifier.classify(img,gotResult);
}

function gotResult(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_gesture_name1").innerHTML=results[0].label;
        document.getElementById("result_gesture_name2").innerHTML=results[1].label;
        prediction1=results[0].label;
        prediction2=results[1].label;
        speak();

        if (results[0].label=="victory") {
            document.getElementById("update_gesture1").innerHTML="&#9996;";
        }
        if (results[0].label=="good") {
            document.getElementById("update_gesture1").innerHTML="&#128077;";
        }
        if (results[0].label=="bad") {
            document.getElementById("update_gesture1").innerHTML="&#128078;";
        }
        if (results[1].label=="victory") {
            document.getElementById("update_gesture2").innerHTML="&#9996;";
        }
        if (results[1].label=="good") {
            document.getElementById("update_gesture2").innerHTML="&#128077;";
        }
        if (results[1].label=="bad") {
            document.getElementById("update_gesture2").innerHTML="&#128078;";
        }
}
}