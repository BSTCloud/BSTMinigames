#pragma strict

public var ScriptGema: gemaScript;
static var tiempoActual: int = 5;
static var execution: boolean;

public var tiempo0: Sprite;
public var tiempo1: Sprite;
public var tiempo2: Sprite;
public var tiempo3: Sprite;
public var tiempo4: Sprite;
public var tiempo5: Sprite;

private var startTime: float = -0.1;
private var scoreTime: float = -0.1;
private var tiempoInicial: int = 0;
private var scoreArray : Sprite[] = new Sprite[6];

function Start(){
	scoreArray[0] = tiempo0;
	scoreArray[1] = tiempo1;
	scoreArray[2] = tiempo2;
	scoreArray[3] = tiempo3;
	scoreArray[4] = tiempo4;		
	scoreArray[5] = tiempo5;
}

function Update(){
	if(ScriptGema.execution){
		if(tiempoActual > 0){	
			if(startTime < Time.timeSinceLevelLoad){
				startTime += 0.1;			
			}
			//Debug.Log(startTime);
			if(startTime > tiempoInicial+1.0){
		   		++tiempoInicial;
		   		--tiempoActual;
		   		gameObject.GetComponent(SpriteRenderer).sprite = scoreArray[tiempoActual];
			}
		}
	}
}