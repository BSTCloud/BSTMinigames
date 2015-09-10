#pragma strict

public var currentMinigame: baseMinigame;
public var cMWin: boolean;

//Variables
public var timeScript: timeCounter;
public var apples1: GameObject;
public var apples2: GameObject;
public var apples3: GameObject;
public var apples4: GameObject;
public var gameDude: GameObject;

public var spriteWin: Sprite;
public var spriteLose: Sprite;

function Awake(){
	currentMinigame = new shakeToApple(gameObject,6,1);
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