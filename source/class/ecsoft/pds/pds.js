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
 		this._lstAviones = new qx.ui.form.List();
 		this._lstAviones.set({minHeight:200, minWidth:50, selectionMode : "one" });
	    
	    	var item;
	    	for( var i=0; i<aviones.length; i++ )
	    	{
	    		item = new qx.ui.form.ListItem(aviones[i].patente, "icon/16/places/folder.png",aviones[i].id_avion);
	    		this._lstAviones.add(item);
	    	};
	
	    
	    var fecFormato = new qx.util.format.DateFormat("yyyy-MM-dd"); //defino formato
	    var lblFecDesde = new qx.ui.basic.Label("Fec.Desde:");
	    this._fecDesde = new qx.ui.form.DateField();
	    this._fecDesde.setDateFormat(fecFormato); //seteo el formato
	    
	    //seteo en fecDesde para que sea 2 meses 
	    var todayTime = new Date();
		var ano = todayTime.getFullYear();
	    var mes = todayTime.getMonth()-1;
	    var dia = todayTime.getDate();
	    this._fecDesde.setValue(this._fecDesde.getDateFormat().parse(ano+"-"+mes+"-"+dia));
	    
	    var lblFecHasta = new qx.ui.basic.Label("Fec. Hasta:");
	    this._fecHasta = new qx.ui.form.DateField();
	    this._fecHasta.setValue(new Date());
	    this._fecHasta.setDateFormat(fecFormato);
	    
	    
	    
	    
	    
	    var lblObservacion = new qx.ui.basic.Label("Observación");
	    this._txtObservacion = new qx.ui.form.TextField();
	    
	    var lblFiltrar = new qx.ui.basic.Label("Filtrar:");
	    var btnFiltrar = new qx.ui.form.Button("Filtrar");
	    
	    
	   
	 menuPDS.add(lblAviones);
	 menuPDS.add(this._lstAviones);
	 menuPDS.add(lblFecDesde);
	 menuPDS.add(this._fecDesde);
	 menuPDS.add(lblFecHasta);
	 menuPDS.add(this._fecHasta);
	 menuPDS.add(lblObservacion);
	 menuPDS.add(this._txtObservacion);
	 menuPDS.add(btnFiltrar);
    
    //TABS PDS
    var tbvPDS = new qx.ui.tabview.TabView();
    	tbvPDS.setContentPadding(0,0,0,0);
    	tbvPDS.setBackgroundColor("#e5caa7");

	
		//tabs
		 var checks = new qx.ui.tabview.Page("Checks","");
	     	checks.setLayout(new qx.ui.layout.Canvas());
	     	this._tblChecks = new ecsoft.pds.checks();
	     	checks.setBackgroundColor("#e5caa7");
	     	
	     	
	     	checks.setLayout(new qx.ui.layout.Canvas());
	     	//checks.add(new ecsoft.pds.grafica(),{top: "1%", left: "1%", bottom: "30%", edge:1});
	     checks.add(this._tblChecks,{top: "71%", left: "1%", bottom:"0%", edge:1});
	     
		 var cranks = new qx.ui.tabview.Page("Cranks", "");
	     	cranks.setLayout(new qx.ui.layout.Canvas());
	     	this._tblCranks= new ecsoft.pds.cranks();
	     	cranks.setBackgroundColor("#e5caa7");
	     
	     this._grafCranks = new ecsoft.pds.grafica2();
	     cranks.add(this._tblCranks,{top: "71%", left: "1%", bottom:"0%", edge:1});
	     cranks.add(this._grafCranks,{top: "1%", left: "1%", bottom: "30%", edge:1});

	     
		 var grabaciones = new qx.ui.tabview.Page("Grabaciones", "");
		 	grabaciones.setLayout(new qx.ui.layout.Canvas());
		 	grabaciones.setBackgroundColor("#e5caa7");
		 	
	     	this._tblGrabaciones= new ecsoft.pds.grabaciones();
		 	this._grafGrabaciones = new ecsoft.pds.grafica2();
		 	grabaciones.add(this._tblGrabaciones,{top: "71%", left: "1%", bottom:"0%", edge:1});
		     grabaciones.add(this._grafGrabaciones,{top: "1%", left: "1%", bottom: "30%", edge:1});	     	
	     	//grabaciones.add(this._grafica,{top: "1%", left: "1%", bottom: "30%", edge:1});
		 
	     
     
     tbvPDS.add(checks);
     tbvPDS.add(cranks);
     tbvPDS.add(grabaciones);
     
     this._add(menuPDS,{top:"30%", bottom:"50%", right:"90%", edge:0});
     this._add(tbvPDS,{left:160, top:"1%", edge:0});
 	
     
//################################################# EVENTOS ################################################# 
     this._tblChecks.addListener("cambiarDatosGraf",function(e){
    	 //var datosChecks= rpc.callSync("getCheck",e.getData());
    	 //console.log(datosChecks);
     },this);

     this._tblCranks.addListener("cambiarDatosGraf",function(e){
    	 
    	 var datosGrafica = [
             
                  { x: 54, y: 68 },
                  { x: 56, y: 68 },
                  { x: 60, y: 68 },
                  { x: 70, y: 28 },
                  { x: 80, y: 34 },
                  { x: 90, y: 14}
                  ];
    	 
    	 this._grafCranks.setDatos(datosGrafica);
    	 this._grafCranks.mostrarGrafica();

     },this);
     
     this._tblGrabaciones.addListener("cambiarDatosGraf",function(e){
    	 
    	 var filtros={};
    	 filtros.id_rec = e.getData();
    	 var datos = rpc.callSync("getGrabacionDatos",filtros);
    	 
    	var grabaVoltaje=[];
    	var grabaAmperaje=[];
    	for (var i=0; i<datos.length; i++) {
    		var sensores = qx.lang.Json.parse(sensores);
    		console.log(sensores);
    		grabaVoltaje.push({x: new Date((datos[i].fyh+"."+datos[i].mseg)), y: sensores.vol});
    		grabaAmperaje.push({x: new Date((datos[i].fyh+"."+datos[i].mseg)), y: sensores.amp});
    	}
    	 var datosGrafica = grabaVoltaje;
    	 
    	 this._grafGrabaciones.mostrarGrafica();
    	 this._grafGrabaciones.setDatos(datosGrafica);

     },this);       
     
     //eventos menu
     this._lstAviones.addListener("changeSelection", this._cambiarDatos, this);
     btnFiltrar.addListener("execute",this._cambiarDatos,this);
     
},

members : {
	_cambiarDatos:  function(){
   	 var filtros={};
	 filtros.id_avion = this._lstAviones.getSelection()[0].getModel();
	 filtros.fecDesde = this._fecDesde.getDateFormat().format(this._fecDesde.getValue());
	 filtros.fecHasta = this._fecHasta.getDateFormat().format(this._fecHasta.getValue());
	 filtros.observacion = this._txtObservacion.getValue();
	 
	 this._tblChecks.traerDatos(filtros);
	 this._tblCranks.traerDatos(filtros);
	 this._tblGrabaciones.traerDatos(filtros);
	}	
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