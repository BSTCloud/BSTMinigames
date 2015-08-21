#pragma strict

public var masterScript: masterScript;
public var gameDude: GameObject;

function Start () {

}

function Update () {

}

function OnCollisionEnter2D(coll: Collision2D) {
	if (coll.gameObject.tag == "STA_apple"){
		Debug.Log(coll.transform.position);
		gameDude.transform.position.x = coll.transform.position.x - 0.4;
		Destroy(coll.gameObject);
		masterScript.numCollidedApples += 1;
	}
}
