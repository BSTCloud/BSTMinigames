#pragma strict

static var actualTime: int;
static var execution: boolean;
public var time0: Sprite;
public var time1: Sprite;
public var time2: Sprite;
public var time3: Sprite;

private var startTime: float = -0.1;
private var scoreTime: float = -0.1;
private var initialTime: int = 0;
private var timeArray : Sprite[] = new Sprite[4];

function Start () {
	execution = true;
	timeArray[0] = time0;
	timeArray[1] = time1;
	timeArray[2] = time2;
	timeArray[3] = time3;
}

function Update () {
	if(execution){
		//Debug.Log(actualTime);
		if(actualTime > 0){
			if(startTime < Time.timeSinceLevelLoad){
				startTime += 0.1;
			}
			if(startTime > initialTime+1.0){
		   		++initialTime;
		   		--actualTime;
		   		if(actualTime<=3){
		   			gameObject.GetComponent(SpriteRenderer).sprite = timeArray[actualTime];
		   		}
			}
		}
		if(actualTime <= 0){
			execution = false;
		}
	}
}