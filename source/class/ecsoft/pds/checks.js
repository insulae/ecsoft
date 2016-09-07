qx.Class.define("ecsoft.pds.checks", {
extend : qx.ui.core.Widget,
events : {
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
		["id", "Fecha", "Volt", "Amp", "Observación"],
		["id_check", "fyh", "vol", "amp", "observacion"]
	);
	
	this.tblGral = new qx.ui.table.Table(tbmGral, custom);
	this.tblGral.getTableColumnModel().setColumnVisible(0, false);
	
	var rbeGral = this.tblGral.getTableColumnModel().getBehavior();
		rbeGral.set(0, {width:30, minWidth:30});
		rbeGral.set(1, {width:"12%", minWidth:120});
		rbeGral.set(2, {width:"5%", minWidth:50});
		rbeGral.set(3, {width:"5%", minWidth:50});
		rbeGral.set(4, {width:"78%", minWidth:30});
		
	this._grafica = new ecsoft.pds.grafChecks();
		
	this._add(this._grafica,{bottom: "30%", edge:1});
	this._add(this.tblGral,{top: "71%", left: "1%", bottom:"0%", edge:1});
	this.setBackgroundColor("#8994a6");
	
	//eventos
	this.tblGral.getSelectionModel().addListener("changeSelection",function(){
		var id_check = this.tblGral.getTableModel().getValueById("id_check",this.tblGral.getFocusedRow());
		this.traerGrafica();
	},this);
	
	this.addListenerOnce("appear",function(){
		this.traerGrafica("aparece");
	},this);

//MEMBERS
},
members : {
	traerDatos: function(filtros){
		var datos = this._rpc.callSync("getChecks",filtros);
		for(var i=0; i<datos.length; i++){
			var sensores = qx.lang.Json.parse(datos[i].sensores);
			datos[i].vol = sensores.vol;
			datos[i].amp = sensores.amp;
		}
		this.tblGral.getTableModel().setDataAsMapArray(datos, true, true);
		
		//traer grafica	   	 
	   	this._datosVoltaje=[];
	   	this._datosAmperaje=[];
	   	for (var i=0; i<datos.length; i++) {
	   		var sensores = qx.lang.Json.parse(datos[i].sensores);
	   		this._datosVoltaje.push({x: new Date(datos[i].fyh), y: sensores.vol});
			this._datosAmperaje.push({x: new Date(datos[i].fyh), y: sensores.amp});
	   	}
	},
	traerGrafica: function(accion){
		if(accion == "aparece"){
			var vol = this.tblGral.getTableModel().getValueById("vol",0);
			var amp = this.tblGral.getTableModel().getValueById("amp",0);
			var fyh = this.tblGral.getTableModel().getValueById("fyh",0);
		}else{
			var vol = this.tblGral.getTableModel().getValueById("vol",this.tblGral.getFocusedRow());
			var amp = this.tblGral.getTableModel().getValueById("amp",this.tblGral.getFocusedRow());
			var fyh = this.tblGral.getTableModel().getValueById("fyh",this.tblGral.getFocusedRow());			
		}
		
	 	var volSeleccionado=[{x: new Date(fyh), y: vol}];
		var ampSeleccionado=[{x: new Date(fyh), y: amp}];
		//this.debug(qx.lang.Json.stringify(volSeleccionado));
		
		if(this.tblGral.getTableModel().getRowCount()>0){
			this._grafica.crearGrafica(this._datosVoltaje,volSeleccionado);		
		}
			
		
	}
}

});