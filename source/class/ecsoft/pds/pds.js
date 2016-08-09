qx.Class.define("ecsoft.pds.pds", {
extend : qx.ui.core.Widget,
events : {
	"cambiarDatosAvion" : "qx.event.type.Data"
},
construct : function () {
	this.base(arguments);	
	this._setLayout(new qx.ui.layout.Canvas());
	var colorBase = "#8994a6";
	
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
	    		item = new qx.ui.form.ListItem(aviones[i].patente, "ico/16/avion.png",aviones[i].id_avion);
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
	 this._tbvPDS = new qx.ui.tabview.TabView();
	 	this._tbvPDS.setContentPadding(0,0,0,0);
	 	this._tbvPDS.setBackgroundColor(colorBase);

	
		//tab_check
	 	this._checks = new qx.ui.tabview.Page("Checks","ico/24/check.png");
	 		this._checks.setLayout(new qx.ui.layout.Canvas());
	     	this._tblChecks = new ecsoft.pds.checks();
	     	this._checks.setBackgroundColor(colorBase);
	     this._checks.add(new ecsoft.pds.grafChecks(),{top: "1%", left: "1%", bottom: "30%", edge:1});
	     this._checks.add(this._tblChecks,{top: "71%", left: "1%", bottom:"0%", edge:1});
	     
	     //tab_cranks
		 this._cranks = new qx.ui.tabview.Page("Cranks","ico/24/crank.png");
		 	this._cranks.setLayout(new qx.ui.layout.Canvas());
		 	this._cranks.setBackgroundColor(colorBase);
	     	
		 	this._tblCranks= new ecsoft.pds.cranks();
	     	this._grafCranks = new ecsoft.pds.grafCrank();
	     	
	     this._cranks.add(this._tblCranks,{top: "71%", left: "1%", bottom:"0%", edge:1});
	     this._cranks.add(this._grafCranks,{bottom: "30%", edge:1});
	     
	     //tab_grabaciones
	     this._grabaciones = new qx.ui.tabview.Page("Grabaciones","ico/24/grabacion.png");
	     	this._grabaciones.setLayout(new qx.ui.layout.Canvas());
	     	this._grabaciones.setBackgroundColor(colorBase);
 	
	     	this._tblGrabaciones= new ecsoft.pds.grabaciones();
	     	this._grafGrabaciones = new ecsoft.pds.grafRec();
 	
	     this._grabaciones.add(this._tblGrabaciones,{top: "71%", left: "1%", bottom:"0%", edge:1});
	     this._grabaciones.add(this._grafGrabaciones,{bottom: "30%", edge:1});	     	
 	     
	     
	     
     
     this._tbvPDS.add(this._checks);
     this._tbvPDS.add(this._cranks);
     this._tbvPDS.add(this._grabaciones);
     
     this._add(menuPDS,{top:"30%", bottom:"50%", right:"90%", edge:0});
     this._add(this._tbvPDS,{left:160, top:"1%", edge:0});
 	
     
//################################################# EVENTOS ################################################# 
     
     //CRANKS
     this._tblCranks.addListener("cambiarDatosGraf",function(e){
    	 
    	 var filtros={};
    	 filtros.id_rec = e.getData();
    	 var datos = rpc.callSync("getCranksDatos",filtros);
    	 
    	var datosVoltaje=[];
    	var datosAmperaje=[];
    	for (var i=0; i<datos.length; i++) {

    		
    		var sensores = qx.lang.Json.parse(datos[i].sensores);
    		
    		datosVoltaje.push({x: new Date((datos[i].fyh+"."+datos[i].mseg)), y: sensores.vol});
    		datosAmperaje.push({x: new Date((datos[i].fyh+"."+datos[i].mseg)), y: sensores.amp});
    	}

   		this._grafCranks.crearGrafica(datosVoltaje,datosAmperaje);
     },this);       
     
     //GRABACIONES
     this._tblGrabaciones.addListener("cambiarDatosGraf",function(e){
    	 var filtros={};
    	 filtros.id_rec = e.getData();
    	 var datos = rpc.callSync("getGrabacionDatos",filtros);
    	 
    	var datosVoltaje=[];
    	var datosAmperaje=[];
    	for (var i=0; i<datos.length; i++) {

    		
    		var sensores = qx.lang.Json.parse(datos[i].sensores);
    		
    		datosVoltaje.push({x: new Date((datos[i].fyh+"."+datos[i].mseg)), y: sensores.vol});
    		datosAmperaje.push({x: new Date((datos[i].fyh+"."+datos[i].mseg)), y: sensores.amp});
    	}

   		this._grafGrabaciones.crearGrafica(datosVoltaje,datosAmperaje);
     },this);       
          
     
     //eventos menu
     this._lstAviones.addListener("changeSelection", this._cambiarDatos, this);
     this._tbvPDS.addListener("changeSelection", function(){
    	 this._cambiarDatos();
     }, this);
     
     btnFiltrar.addListener("execute",this._cambiarDatos,this);
},

members : {
	_cambiarDatos:  function(){
		 var filtros={};
		 filtros.id_avion = this._lstAviones.getSelection()[0].getModel();
		 filtros.fecDesde = this._fecDesde.getDateFormat().format(this._fecDesde.getValue());
		 filtros.fecHasta = this._fecHasta.getDateFormat().format(this._fecHasta.getValue());
		 filtros.observacion = this._txtObservacion.getValue();
		 
		 if(this._tbvPDS.isSelected(this._checks)){
			 this._tblChecks.traerDatos(filtros);
		 }else if(this._tbvPDS.isSelected(this._cranks)){
			 this._tblCranks.traerDatos(filtros);	 
		 }else if(this._tbvPDS.isSelected(this._grabaciones)){
			 this._tblGrabaciones.traerDatos(filtros);
		 }	 
	 
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