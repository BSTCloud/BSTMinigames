#pragma strict

public var TTF_Hand1: GameObject;
public var TTF_Cloud1: GameObject;
public var TTF_Cloud2: GameObject;
public var TTF_Cloud3: GameObject;
public var TTF_Doggy: GameObject;
public var TTF_Frisbee: GameObject;
public var exclam: GameObject;

protected var TTF_Hand1TFO: Transform;
protected var TTF_DoggyTFO: Transform;
protected var CloudTFOArray: Transform[] = new Transform[3];

protected var cloudDeltaMovement: float = -3;

private var screenSize: Vector2;
private var handAnimator: Animator;
private var dogAnimator: Animator;
private var platform: RuntimePlatform = Application.platform;
static public var execution: boolean = true;
private var hitOnce: boolean = true;

function Start () {

	handAnimator =  TTF_Hand1.GetComponent(Animator);
	dogAnimator = TTF_Doggy.GetComponent(Animator);

	screenSize.x = Vector2.Distance (Camera.main.ScreenToWorldPoint(new Vector2(0,0)),Camera.main.ScreenToWorldPoint(new Vector2(Screen.width, 0)));  
   	screenSize.y = Vector2.Distance (Camera.main.ScreenToWorldPoint(new Vector2(0,0)),Camera.main.ScreenToWorldPoint(new Vector2(0, Screen.height)));   
   	
   	TTF_Hand1TFO = TTF_Hand1.transform;
   	TTF_DoggyTFO = TTF_Doggy.transform;
    CloudTFOArray[0] = TTF_Cloud1.transform;
    CloudTFOArray[1] = TTF_Cloud2.transform;
    CloudTFOArray[2] = TTF_Cloud3.transform;

   	TTF_Hand1TFO.position.x = screenSize.x/2 + 0.2;
    TTF_Hand1TFO.position.y = -screenSize.y/2;
    
    for(var i=0; i<3; ++i){
    	CloudTFOArray[i].position.x = Random.Range(-screenSize.x/2, screenSize.x/2);
    	CloudTFOArray[i].position.y = Random.Range(-3.0, 3.0);
    }
}

function checkTouch(pos: Vector3){
	var wp : Vector3 = Camera.main.ScreenToWorldPoint(pos);
	var touchPos : Vector2 = new Vector2(wp.x, wp.y); 
	var hit = Physics2D.OverlapPoint(touchPos);  
	if(hit){
		hitOnce = false;
		if(hit.gameObject.tag == "TTF_Doggy" && hit.gameObject.GetComponent(BoxCollider2D).isTrigger == true){
			handAnimator.SetBool("winHandPose2", true);
			TTF_Frisbee.GetComponent(Animator).SetBool("frisbeeLaunch", true);
			TTF_DoggyTFO.parent.GetComponent(Animator).speed = 0;
			dogAnimator.SetBool("doggyWin", true);
			yield WaitForSeconds(1);
			Destroy(TTF_Doggy);
			gameObject.GetComponent(Animator).SetBool("winMiniGame", true);
			yield WaitForSeconds(1);
			TTF_Cloud1.SetActive(false);
			TTF_Cloud2.SetActive(false);
			TTF_Cloud3.SetActive(false);
			//ganar
		}
		else{
			TTF_Frisbee.GetComponent(Animator).SetBool("frisbeeLaunch", true);
			TTF_DoggyTFO.parent.GetComponent(Animator).speed = 0;
			dogAnimator.SetBool("doggyLose", true);
			handAnimator.SetBool("loseHandPose2", true);
			//Parar ejecucion
		}
	}
}

function Update () {

	for(var i=0; i<3; ++i){
		CloudTFOArray[i].Translate(Vector3(cloudDeltaMovement,0,0) * Time.deltaTime);
		cloudDeltaMovement+=0.25;
		
		if(CloudTFOArray[i].position.x<(-screenSize.x/2)-3){
			CloudTFOArray[i].position.y = Random.Range(-screenSize.y/2, screenSize.y/2);
			CloudTFOArray[i].position.x=3+screenSize.x/2;
		}
	}
	cloudDeltaMovement = -3;
	
	if(hitOnce)
		if(platform == RuntimePlatform.WindowsPlayer || platform == RuntimePlatform.WindowsEditor){
	  		if(Input.GetMouseButtonDown(0)){   
	   			checkTouch(Input.mousePosition);
	  		}
	  	}
}