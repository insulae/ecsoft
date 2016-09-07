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
	
	
	this._grafica = new ecsoft.pds.grafCrank();
	
	this._add(this._grafica,{bottom: "30%", edge:1});
	this._add(this.tblGral,{top: "71%", left: "1%", bottom:"0%", edge:1});
	this.setBackgroundColor("#8994a6");
	
	//eventos
	this.tblGral.getSelectionModel().addListener("changeSelection",function(){
		var id_rec = this.tblGral.getTableModel().getValueById("id_rec",this.tblGral.getFocusedRow());
		this.traerGrafica(id_rec);
	},this);
},
members : {
	traerDatos: function(filtros){
	 	var datos = this._rpc.callSync("getCranks",filtros);
		this.tblGral.getTableModel().setDataAsMapArray(datos, true, true);
	},
	traerGrafica: function(id_rec){
		var filtros={};
		filtros.id_rec=id_rec;
		var datos = this._rpc.callSync("getCrankDatos",filtros);
		var datosVoltaje=[];
    	var datosAmperaje=[];
    	for (var i=0; i<datos.length; i++) {
    		var sensores = qx.lang.Json.parse(datos[i].sensores);    		
	    	
    		datosVoltaje.push({x: new Date((datos[i].fyh+"."+datos[i].mseg)), y: sensores.vol});
	    	datosAmperaje.push({x: new Date((datos[i].fyh+"."+datos[i].mseg)), y: sensores.amp});
	    }
	   	this._grafica.crearGrafica(datosVoltaje,datosAmperaje);
	}
}

});