qx.Class.define("ecsoft.pds.pds", {
extend : qx.ui.core.Widget,
events : {
	"cambiarDatosAvion" : "qx.event.type.Data"
},
construct : function () {
	this.base(arguments);	
	this._setLayout(new qx.ui.layout.Canvas());
	
	//RPC
 	var rpc = new qx.io.remote.Rpc("services/", "ecsoft.pds");
 	var aviones = rpc.callSync("getAviones");
 	
 	
 	//OBJETOS
	var menuPDS = new qx.ui.groupbox.GroupBox();
		menuPDS.set({minWidth:150,maxWidth:150});
		menuPDS.setLayout(new qx.ui.layout.VBox(2).set({alignX:"left"}));
 	
 		var lblAviones = new qx.ui.basic.Label("Aviones");
 		var lstAviones = new qx.ui.form.List();
	    	lstAviones.set({minHeight:200, minWidth:50, selectionMode : "one" });
	    
	    	var item;
	    	for( var i=0; i<aviones.length; i++ )
	    	{
	    		item = new qx.ui.form.ListItem(aviones[i].patente, "icon/16/places/folder.png",aviones[i].id_avion);
	    		lstAviones.add(item);
	    	};
	
	    var lblFecDesde = new qx.ui.basic.Label("Desde:");
	    var fecDesde = new qx.ui.form.DateField();
	    
	    var lblFecHasta = new qx.ui.basic.Label("Hasta:");
	    var fecHasta = new qx.ui.form.DateField();
	    
	    var lblFiltro = new qx.ui.basic.Label("Filtro");
	    var txtFiltro = new qx.ui.form.TextField();
	    
	   
	 menuPDS.add(lblAviones);
	 menuPDS.add(lstAviones);
	 menuPDS.add(lblFecDesde);
	 menuPDS.add(fecDesde);
	 menuPDS.add(lblFecHasta);
	 menuPDS.add(fecHasta);
	 menuPDS.add(lblFiltro);
	 menuPDS.add(txtFiltro);
    
    //TABS PDS
    var tbvPDS = new qx.ui.tabview.TabView();
    	tbvPDS.setContentPadding(0,0,0,0);
    	tbvPDS.setBackgroundColor("#e5caa7");

	
		//tabs
		 var checks = new qx.ui.tabview.Page("Checks","");
	     	checks.setLayout(new qx.ui.layout.Canvas());
	     	var tblChecks = new ecsoft.pds.checks();
	     	checks.setBackgroundColor("#e5caa7");
	     	
	     	var txaArea = new qx.ui.form.TextArea();
	     	
	     	checks.setLayout(new qx.ui.layout.Canvas());
	     	checks.add(new ecsoft.pds.grafica(),{top: "1%", left: "1%", bottom: "30%", edge:1});	     	
	     checks.add(tblChecks,{top: "71%", left: "1%", bottom:"0%", edge:1});
	     //checks.add(txaArea,{top: "1%", left: "1%", bottom: "30%", edge:1});
	     
		 var cranks = new qx.ui.tabview.Page("Cranks", "");
	     	cranks.setLayout(new qx.ui.layout.Canvas());
	     	var tblCranks= new ecsoft.pds.cranks();
	     	cranks.setBackgroundColor("#e5caa7");
	     	
	     cranks.add(tblCranks,{top: "71%", left: "1%", bottom:"0%", edge:1});
	     cranks.add(new ecsoft.pds.cranks(),{top: "1%", left: "1%", bottom: "30%", edge:1});

		 
		 var grabaciones = new qx.ui.tabview.Page("Grabaciones", "");
	     	grabaciones.setLayout(new qx.ui.layout.Canvas());
	     	grabaciones.add(new ecsoft.pds.grafica(),{top: "1%", left: "1%", bottom: "30%", edge:1});
		 
	     
     
     tbvPDS.add(checks);
     tbvPDS.add(cranks);
     tbvPDS.add(grabaciones);
     
     this._add(menuPDS,{top:"30%", bottom:"50%", right:"90%", edge:0});
     this._add(tbvPDS,{left:"14%", top:"1%", edge:0});
 	
     
     //eventos
     tblChecks.addListener("cambiarDatosGraf",function(e){
    	 txaArea.setValue(e.getData());
     },this);

     this.addListener("cambiarDatosAvion",function(e){
    	 tblChecks.traerDatos(e.getData());
    	 tblCranks.traerDatos(e.getData());
     },this);

     lstAviones.addListener("changeSelection",function(){
    	 //TODO como mierda se agrega un value y tomarlo
    	 var id_avion = lstAviones.getSelection()[0].getModel();
 		this.fireDataEvent("cambiarDatosAvion",id_avion);
 	},this);
},

members : {
	
}





/*
 * en el api si la documentacion dice: stringify(var value, Function replacer?, String space?) el ? quiere decir que no es obligatorio
 *  alert(qx.lang.Json.stringify(lstAviones.getSelection()[0].getModel())); //para ver si es un objeto de datos (json) que contiene
 * alert(lstAviones.getSelection()[0].getModel()); //para ver que objeto es
 * 
 * en el api model quiere decir que puedo pasarle un json o una constante o una variable, si es un json luego puedo llamar de la forma getModel().value
 * 
 */
});