#pragma strict

public var masterScript: masterSlideToPetal;

function Start () {

}

function Update () {
	
}

function OnCollisionEnter2D(coll: Collision2D) {
	if (coll.gameObject.tag == "STP_Petal"){
		Destroy(coll.gameObject);
		masterScript.currentMinigame.interactExternalComponent();
	}
}