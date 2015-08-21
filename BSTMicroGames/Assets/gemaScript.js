#pragma strict

public var ScriptContador: contador;

static var tiempoActual: int;
static var execution: boolean = true;

public var ruby: GameObject;
public var cherry: GameObject;
public var gameover: GameObject;

function Start(){
	ScriptContador.tiempoActual = 3;
}

function checkTouch(pos: Vector3){
	var wp : Vector3 = Camera.main.ScreenToWorldPoint(pos);
	var touchPos : Vector2 = new Vector2(wp.x, wp.y); 
	var hit = Physics2D.OverlapPoint(touchPos);  
	if(hit)  
		if(hit.transform.gameObject == ruby){  
			execution = false;
			cherry.SetActive(true);
		}
	
}

function Update(){
	if(execution){
		if(ScriptContador.tiempoActual > 0.0){
			if(Input.GetMouseButtonDown(0))
				checkTouch(Input.mousePosition);
		}
		else{
			execution = false;
			gameover.SetActive(true);
		}
	}
}