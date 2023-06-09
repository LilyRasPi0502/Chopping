var StepCount = 0;
var VegetableRAnimetion = new Array();
var VegetableLAnimetion = new Array();
var VegetableStep = new Array();
var Yuki = new Array();
var Score = 0;


function showCoords(event) {
	Yuki.push("YukiAction");
	
	document.getElementById("loopMe").play();
}

function Vegetable(Left, Right, Step){
	StepValue = parseInt(document.getElementById(Step).value) + 1;
	document.getElementById(Left).src = "data/V" + StepValue + "L.png";
	document.getElementById(Right).src = "data/V" + StepValue + "R.png";
	Top = parseInt(document.getElementById(Right).style.top);
	document.getElementById(Left).style.top = Top + 100;
	document.getElementById(Right).style.top = Top + 100;
	document.getElementById(Step).value = StepValue;
}

function YukiAction(id, Step){
	StepValue = parseInt(document.getElementById(Step).value) + 1;
	document.getElementById(Step).value = StepValue;
	document.getElementById(id).src = "data/Yuki" + StepValue + ".png";
}
function Timer(){
	StepCount++;
	//console.log("VegetableStep.length: " + VegetableStep.length)
	if(StepCount % 5 == 0 && Yuki.length != 0){
		StepValue = parseInt(document.getElementById(Yuki[0]).value);
		YukiAction("Yuki", Yuki[0]);
		if(StepValue >= 4){
			Yuki.shift();
			document.getElementById("YukiAction").value = StepValue = 0;
			document.getElementById("Yuki").src = "data/Yuki0.png";
		}
	}
	if(StepCount % 10 == 0 && VegetableStep.length != 0){
		for(let i = 0; i < VegetableStep.length; i++){
			StepValue = parseInt(document.getElementById(VegetableStep[i]).value);
			Vegetable(VegetableLAnimetion[i], VegetableRAnimetion[i], VegetableStep[i]);
			if(StepValue >= 4){
				Score ++;
				VegetableCount = parseInt(VegetableLAnimetion[i].replace("Vegetable", "").replace("L", "")) + 1;
				if(VegetableCount == 3){
					VegetableCount = 0;
				}
				VegetableInit("Vegetable" + VegetableCount + "L");
				VegetableRAnimetion.shift();
				VegetableLAnimetion.shift();
				VegetableStep.shift();
				break;
			}
		}
	}
	document.getElementById("Score").innerHTML = "Score: "+Score;
}
function VegetableOnClick(Vegetable){
	if(Vegetable.id.indexOf("R") == -1){
		VegetableRAnimetion.push(Vegetable.id.replace("L", "R"));
		VegetableLAnimetion.push(Vegetable.id);
	}
	if(Vegetable.id.indexOf("L") == -1){
		VegetableLAnimetion.push(Vegetable.id.replace("R", "L"));
		VegetableRAnimetion.push(Vegetable.id);
	}
	VegetableStep.push("V" + Vegetable.id.split("Vegetable")[1].replace("R", "").replace("L", ""));
}
function VegetableInit(Vegetable){
	if(Vegetable.indexOf("R") == -1){
		document.getElementById(Vegetable.replace("L", "R")).src = "data/V0R.png";
		document.getElementById(Vegetable).src = "data/V0R.png";
		document.getElementById(Vegetable.replace("L", "R")).style.top = 600;
		document.getElementById(Vegetable).style.top = 600;
	}
	if(Vegetable.indexOf("L") == -1){
		document.getElementById(Vegetable.replace("R", "L")).src = "data/V0L.png";
		document.getElementById(Vegetable).src = "data/V0R.png";
		document.getElementById(Vegetable.replace("R", "L")).style.top = 600;
		document.getElementById(Vegetable).style.top = 600;
	}
	document.getElementById("V" + Vegetable.split("Vegetable")[1].replace("R", "").replace("L", "")).value = 0;
}
function YukiOnClick(Chara){
	Yuki.push("YukiAction");
}
window.setInterval(Timer, 10);