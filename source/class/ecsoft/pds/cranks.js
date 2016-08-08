qx.Class.define("ecsoft.pds.cranks", {
extend : qx.ui.core.Widget,
events : {
	"cambiarDatosGraf" : "qx.event.type.Data"
},
construct : function () {
	this.base(arguments);
	this._setLayout(new qx.ui.layout.Canvas());
	
	//RPC
	this._rpc = new qx.io.remote.Rpc("services/", "ecsoft.pds");
	
	var custom = {tableColumnModel : function(obj) {
		return new qx.ui.table.columnmodel.Resize(obj);
	}};
	
	var tbmGral = new qx.ui.table.model.Simple();
	tbmGral.setColumns(
		["id", "Fecha", "Observación"],
		["id_rec", "fyh", "observacion"]
	);
	
	this.tblGral = new qx.ui.table.Table(tbmGral, custom);
	this.tblGral.getTableColumnModel().setColumnVisible(0, false);
	
	var rbeGral = this.tblGral.getTableColumnModel().getBehavior();
		rbeGral.set(0, {width:30, minWidth:30});
		rbeGral.set(1, {width:"12%", minWidth:120});
		rbeGral.set(2, {width:"88%", minWidth:30});
	
	
	this._add(this.tblGral,{edge:0});
	this.setBackgroundColor("#a4c9e1");
	
	
	this.traerDatos(2);
	
	//eventos
	this.tblGral.addListener("click",function(){
		var id_rec = this.tblGral.getTableModel().getValueById("id_rec",this.tblGral.getFocusedRow());
		this.fireDataEvent("cambiarDatosGraf",id_rec);

	},this);
},
members : {
	traerDatos: function(filtros){
		var res = this._rpc.callSync("getCranks",filtros);
		this.tblGral.getTableModel().setDataAsMapArray(res, true, true);
	}
}

});