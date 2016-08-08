<?php 
require("Base.php");

class class_pds extends class_Base {
	function __construct() {
		parent::__construct();
	}

//FUNCIONES
//################################################################################################
function method_getChecks ($params, $error) {
	$p = @$params[0];
	$db = $this->db;
	
	$q = $db->query("
			SELECT * 
			FROM rec 
			WHERE id_avion = '".$p->id_avion."'
	");
	if ($db->error) { $error->SetError(JsonRpcError_Unknown, (__FILE__ . " - " . (__LINE__ - 1) . ": " . $db->error)); return $error; }
	
	$res = Array();
	while ($r = $q->fetch_object()) {
		$res []= $r;
	}
	
	return $res;
}

function method_getCranks ($params, $error) {
	$p = @$params[0];
	$db = $this->db;

	$q = $db->query("
			SELECT *
			FROM rec
			WHERE id_avion = '".$p->id_avion."'
			AND crank = 1
	");
	if ($db->error) { $error->SetError(JsonRpcError_Unknown, (__FILE__ . " - " . (__LINE__ - 1) . ": " . $db->error)); return $error; }

	$res = Array();
	while ($r = $q->fetch_object()) {
		$res []= $r;
	}

	return $res;
}

function method_getAviones ($params, $error) {
	$p = @$params[0];
	$db = $this->db;

	$q = $db->query("SELECT * FROM avion");
	if ($db->error) { $error->SetError(JsonRpcError_Unknown, (__FILE__ . " - " . (__LINE__ - 1) . ": " . $db->error)); return $error; }

	$res = Array();
	while ($r = $q->fetch_object()) {
		$res []= $r;
	}

	return $res;
}
	
//################################################################################################
}
?>