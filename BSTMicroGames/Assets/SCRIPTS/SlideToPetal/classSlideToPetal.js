#pragma strict

public class slideToPetal extends baseMinigame{

	//Variables
	public var fatherScript: masterSlideToPetal;
	public var timeScript: timeCounter;
	
	public var STP_Daisy: GameObject;
	
	private var DaisyAnimator: Animator;
	private var remainingPetals: int = 16;
	private var flowerPetals: int = 16;
	private var currentObject: GameObject;
	private var isHolding: boolean = false;
	private var platform: RuntimePlatform = Application.platform;

	//Methods
	public function slideToPetal(fatherGameObject: GameObject, time: int, difficulty: int){
		super(fatherGameObject, time, difficulty);
	}
	
	public function initializeExternalParameters(){
		fatherScript = fatherGameObject.GetComponent(masterSlideToPetal);
		timeScript = fatherScript.timeScript;
		STP_Daisy = fatherScript.STP_Daisy;
	}

	function Start () {
		initializeExternalParameters();
		timeScript.actualTime = time;
		DaisyAnimator = STP_Daisy.GetComponent(Animator);
	}
	
	function checkSwipe(pos: Vector3){
		var wp : Vector3 = Camera.main.ScreenToWorldPoint(pos);
		var touchPos : Vector2 = new Vector2(wp.x, wp.y); 
		var hit = Physics2D.OverlapPoint(touchPos);  
		if (Input.GetMouseButtonDown (0) && !isHolding){
	    	if(hit)
		    	if (hit.gameObject.tag=="STP_Petal" && hit.gameObject.GetComponent(PolygonCollider2D).isTrigger == true){
		    		--flowerPetals;
		       		isHolding = true;
			        currentObject = hit.gameObject;
			     }
		}
		if (Input.GetMouseButtonUp (0) && isHolding){
			currentObject.GetComponent(Transform).position = new Vector3(touchPos.x, touchPos.y, -2);
			currentObject.GetComponent(PolygonCollider2D).isTrigger=false;
		 	currentObject.GetComponent(Rigidbody2D).isKinematic = false;
		 	isHolding = false;
		}
		if (isHolding) {
			currentObject.GetComponent(Transform).position = new Vector3(touchPos.x, touchPos.y, -3);
		}
	}

	function Update () {
		if(this.execution == true){
		    if(platform == RuntimePlatform.WindowsPlayer || platform == RuntimePlatform.WindowsEditor)
		   		checkSwipe(Input.mousePosition);
			if(flowerPetals == 0){
				timeScript.execution=false;
				win=true;
			}
			if((remainingPetals == 0 && flowerPetals == 0) || timeScript.actualTime<=0){
				this.execution = false;
			}
		}
		if(this.execution == false){
			if(timeScript.execution == false && win == false){
				DaisyAnimator.SetBool("loseGame", true);
			}
			if(timeScript.execution == false && win == true){;
				DaisyAnimator.SetBool("endGame", true);
			}
		}
		
	}
	
	function interactExternalComponent(){
		--remainingPetals;
	}
}