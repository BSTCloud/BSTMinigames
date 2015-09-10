#pragma strict

public class tapToFrisbee extends baseMinigame{

	//Variables
	public var fatherScript: masterTapToFrisbee;
	public var timeScript: timeCounter;
	
	public var TTF_Hand1: GameObject;
	public var TTF_Doggy: GameObject;
	public var TTF_Frisbee: GameObject;

	protected var TTF_Hand1TFO: Transform;
	protected var TTF_DoggyTFO: Transform;

	private var screenSize: Vector2;
	private var handAnimator: Animator;
	private var dogAnimator: Animator;
	private var platform: RuntimePlatform = Application.platform;
	private var hitOnce: boolean = true;
	
	//Methods
	public function tapToFrisbee(fatherGameObject: GameObject, time: int, difficulty: int){
		super(fatherGameObject, time, difficulty);
	}
	
	public function initializeExternalParameters(){
		fatherScript = fatherGameObject.GetComponent(masterTapToFrisbee);
		timeScript = fatherScript.timeScript;
		TTF_Hand1 = fatherScript.TTF_Hand1;
		TTF_Doggy = fatherScript.TTF_Doggy;
		TTF_Frisbee = fatherScript.TTF_Frisbee;
	}
	
	public function Start(){
		initializeExternalParameters();
		
		timeScript.actualTime = time;
		handAnimator =  TTF_Hand1.GetComponent(Animator);
		dogAnimator = TTF_Doggy.GetComponent(Animator);
		TTF_Hand1TFO = TTF_Hand1.transform;
   		TTF_DoggyTFO = TTF_Doggy.transform;
   		
   		screenSize.x = Vector2.Distance (Camera.main.ScreenToWorldPoint(new Vector2(0,0)),Camera.main.ScreenToWorldPoint(new Vector2(Screen.width, 0)));  
   		screenSize.y = Vector2.Distance (Camera.main.ScreenToWorldPoint(new Vector2(0,0)),Camera.main.ScreenToWorldPoint(new Vector2(0, Screen.height)));   
   	
   		TTF_Hand1TFO.position.x = screenSize.x/2 + 0.2;
    	TTF_Hand1TFO.position.y = -screenSize.y/2;
	}
	
	function winning(){
		handAnimator.SetBool("winHandPose2", true);
		TTF_Frisbee.GetComponent(Animator).SetBool("frisbeeLaunch", true);
		TTF_DoggyTFO.parent.GetComponent(Animator).speed = 0;
		dogAnimator.SetBool("doggyWin", true);
		fatherGameObject.GetComponent(Animator).SetBool("winMiniGame", true);
		//Activar en la version final
		this.execution=false;
		this.win=true;
	}

	function losing(){
		handAnimator.SetBool("loseHandPose2", true);
		TTF_Frisbee.GetComponent(Animator).SetBool("frisbeeLaunch", true);
		TTF_DoggyTFO.parent.GetComponent(Animator).speed = 0;
		dogAnimator.SetBool("doggyLose", true);
		//Activar en la version final
		this.execution=false;
		this.win=false;
	}

	function checkTouch(pos: Vector3){
		var wp : Vector3 = Camera.main.ScreenToWorldPoint(pos);
		var touchPos : Vector2 = new Vector2(wp.x, wp.y); 
		var hit = Physics2D.OverlapPoint(touchPos);  
		if(hit){
			timeScript.execution = false;
			
			//Codigo para reiniciar el nivel
			
			if(hit.gameObject.tag == "resetButton" && hit.gameObject.GetComponent(BoxCollider2D)){
				 Application.LoadLevel(Application.loadedLevel);
			}
			
			//Fin del codigo para reiniciar el nivel
			
			if(hitOnce)
				if(hit.gameObject.tag == "TTF_Doggy" && hit.gameObject.GetComponent(BoxCollider2D).isTrigger == true){
					hit.gameObject.GetComponent(BoxCollider2D).isTrigger=false;
					winning();
				}
				else
					losing();
					
			hitOnce = false;
		}
	}

	function Update () {
		if(platform == RuntimePlatform.WindowsPlayer || platform == RuntimePlatform.WindowsEditor){
	  		if(Input.GetMouseButtonDown(0)){   
	   			checkTouch(Input.mousePosition);
	  		}
	  	}
	  	if(timeScript.execution==false)
	  		if(hitOnce==true)
	  			losing();
	  		
	}
}