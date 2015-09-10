#pragma strict

public var masterScript: masterScript;

function Start () {

}

function Update () {

}

function OnBecameInvisible () {
	if(masterScript.execution==false){
		gameObject.SetActive(false);
	}
}