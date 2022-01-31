timer=0;
score=0;
timer_check="";
answer_holder="";
image_array=["apple","mango","strawberry","aeroplane","star","line","triangle"];
random_number=Math.floor(Math.random*7);
sketch=image_array[random_number];
function update_canvas(){
background("white");
random_number=Math.floor(Math.random*7);
sketch=image_array[random_number];
document.getElementById("sketches").innerHTML="Skecth to be drawn"+sketch;
}
function setup(){
    canvas=createCanvas(250,250);
    canvas.position(650,400);
    canvas.mouseReleased(classifyCanvas);
    app1=window.speechSynthesis;
}
function preload(){
classifier=ml5.imageClassifier("DoodleNet");
}
function draw(){
    strokeWeight(13);
    stroke("black");
    if (mouseIsPressed){
line(pmouseX,pmouseY,mouseX,mouseY);
}
timer++;
document.getElementById("yo").innerHTML="Timer :"+timer;
if(timer>400){
timer=0;
timer_check='completed';
}
if(results[0].label==sketch){
score++;
document.getElementById("hello").innerHTML=score; 
answer_holder="set";  
}
if(answer_holder=="set" || timer_check=="completed"){
update_canvas();
timer_check="";
answer_holder="";
timer=0;
}
}
function classifyCanvas(){
    classifier.classify(canvas,gotResult);
    }
    function gotResult(error,results){
        if (error){
    console.log(error);
        }
    else{
        console.log(results);
        document.getElementById("hi").innerHTML="Your Sketch: "+results[0].label;
        console.log(results[0].label);
        document.getElementById("hello").innerHTML="Confidence: "+Math.round(results[0].confidence*100);
    voice1=new SpeechSynthesisUtterance(results[0].label);
    app1.speak(voice1);
    }
    }
    function clearCanvas(){
        background("white");
    }