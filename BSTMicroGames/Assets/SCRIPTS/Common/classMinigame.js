#pragma strict

public class baseMinigame{

	//Variables
	public var fatherGameObject: GameObject;
	public var execution: boolean;
	public var win: boolean;
	public var time: int;
	public var difficulty: int;
	
	//Methods
	public function baseMinigame(fatherGameObject: GameObject, time: int, difficulty: int){
		this.fatherGameObject = fatherGameObject;
		execution = true;
		win = false;
		this.time = time;
		this.difficulty = difficulty;
	}
	public function Start(){}
	public function initializeExternalParameters(){}
	public function checkTouch(pos: Vector3){}
	public function Update(){}
	public function interactExternalComponent(){}
	public function checkWin(): boolean {return win;}
	public function gameIsOver(): boolean {return execution;}
}