﻿#pragma strict

public var timeScript: timeCounter;
public var apples1: GameObject;
public var apples2: GameObject;
public var apples3: GameObject;
public var apples4: GameObject;
public var gameDude: GameObject;

public var appleNumber: int;
public var appleNumber2: int;
public var appleNumber3: int;
public var applesArray: GameObject[]= new GameObject[4];

public var numApples: int;
static var numCollidedApples: int;
private var platform: RuntimePlatform = Application.platform;

public var spriteWin: Sprite;
public var spriteLose: Sprite;

function Start () {
	numApples = 12;
	numCollidedApples = 0;
	
	timeScript.actualTime = 6;
	applesArray[0] = apples1;
	applesArray[1] = apples2;
	applesArray[2] = apples3;
	applesArray[3] = apples4;
	
	for (var i=0; i<4; ++i){
		appleNumber = Random.Range(0,7);
		appleNumber2 = Random.Range(0,7);
		appleNumber3 = Random.Range(0,7);
		
		while(appleNumber==appleNumber2 || appleNumber2==appleNumber3 || appleNumber==appleNumber3){
			if(appleNumber==appleNumber2 || appleNumber2==appleNumber3)
				appleNumber2=Random.Range(0,7);
			if(appleNumber==appleNumber3)
				appleNumber3=Random.Range(0,7);
		}

		applesArray[i].transform.GetChild(appleNumber).gameObject.GetComponent(Renderer).enabled = true;
		applesArray[i].transform.GetChild(appleNumber2).gameObject.GetComponent(Renderer).enabled = true;
		applesArray[i].transform.GetChild(appleNumber3).gameObject.GetComponent(Renderer).enabled = true;
	}
}

function checkTouch(pos: Vector3){
	var wp : Vector3 = Camera.main.ScreenToWorldPoint(pos);
	var touchPos : Vector2 = new Vector2(wp.x, wp.y); 
	var hit = Physics2D.OverlapPoint(touchPos);  
	if(hit)  
		if(hit.gameObject.tag == "STA_apple" && hit.gameObject.GetComponent(CircleCollider2D).isTrigger == true){ 
			--numApples;
			hit.gameObject.GetComponent(CircleCollider2D).isTrigger = false;
			hit.gameObject.GetComponent(Rigidbody2D).isKinematic = false;
		}
}

function Update () {
	if(timeScript.execution == false){
		if(numApples == 0 && numCollidedApples == 12){
			gameDude.GetComponent(SpriteRenderer).sprite = spriteWin;
		}
		if(numApples != 0){
			gameDude.GetComponent(SpriteRenderer).sprite = spriteLose;
		}
	}
	else{
		if(numApples == 0){
			timeScript.execution = false;
			//has ganado
		}
		if(platform == RuntimePlatform.WindowsPlayer || platform == RuntimePlatform.WindowsEditor){
	  		if(Input.GetMouseButtonDown(0)){   
	   			checkTouch(Input.mousePosition);
	  		}
	  	}
  	}
}