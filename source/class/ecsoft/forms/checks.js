qx.Class.define("ecsoft.forms.checks", {
extend : qx.ui.core.Widget,
events : {
	"eventoChecks" : "qx.event.type.Data"
},
members : {
	
},
construct : function () {
	this.base(arguments);
	this._setLayout(new qx.ui.layout.VBox(3));
	
	var custom = {tableColumnModel : function(obj) {
		return new qx.ui.table.columnmodel.Resize(obj);
	}};
	
	var tbmGral = new qx.ui.table.model.Simple();
	tbmGral.setColumns(
		["id", "Dato 1", "Dato 2"],
		["id_usuario", "nick", "nro_vendedor"]
	);
	
	this._tblGral = new qx.ui.table.Table(tbmGral, custom);
	this._tblGral.setWidth(1200);
	this._tblGral.setHeight(250);
	this._tblGral.getTableColumnModel().setColumnVisible(0, false);
	
	var rbeGral = this._tblGral.getTableColumnModel().getBehavior();
	rbeGral.set(0, {width:30, minWidth:30});
	
	rbeGral.set(1, {width:"40%", minWidth:30});
	rbeGral.set(1, {width:"55%", minWidth:30});
	
	this._add(this._tblGral);
	
	var rpc = new qx.io.remote.Rpc("services/", "ecsoft.checks");
	var res = rpc.callSync("getDatos");
	
	this._tblGral.getTableModel().setDataAsMapArray(res, true, true);
}
});