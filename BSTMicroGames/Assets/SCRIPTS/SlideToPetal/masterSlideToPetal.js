#pragma strict

public var currentMinigame: baseMinigame;
public var cMWin: boolean;

//Variables
public var timeScript: timeCounter;
public var STP_Daisy: GameObject;

function Awake(){
	currentMinigame = new slideToPetal(gameObject,10,1);
	cMWin = false;
}

function Start () {
	currentMinigame.Start();
}

function Update () {
	if(currentMinigame.gameIsOver() != false)
		currentMinigame.Update();
	else{
		if(currentMinigame.checkWin() == true){
			cMWin = true;
		}
		else{
			cMWin = false;
		}
	}
}