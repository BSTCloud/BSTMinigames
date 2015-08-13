#pragma strict

public var timeScript: timeCounter;
public var apples1: GameObject;
public var apples2: GameObject;
public var apples3: GameObject;
public var apples4: GameObject;

public var appleNumber: int;
public var appleNumber2: int;
public var appleNumber3: int;
public var applesArray: GameObject[]= new GameObject[4];

function Start () {
	Random.seed = System.Environment.TickCount;
	
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

function Update () {

}