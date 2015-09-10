#pragma strict

public var currentMinigame: baseMinigame;
public var cMWin: boolean;

public var timeScript: timeCounter;
public var TTF_Hand1: GameObject;
public var TTF_Doggy: GameObject;
public var TTF_Frisbee: GameObject;

function Awake(){
	currentMinigame = new tapToFrisbee(gameObject,8,1);
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