
var size_waypoint: float = 0.1;

function OnDrawGizmos() {
	Gizmos.color = Color.yellow;
	Gizmos.DrawSphere(transform.position, size_waypoint);
}
