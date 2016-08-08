/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/**
 * This is the main application class of your custom application "ecsoft"
 *
 * @asset(ecsoft/*)
 */
qx.Class.define("ecsoft.Application", {
extend : qx.application.Standalone,
members : {
/**
 * This method contains the initial application code and gets called 
 * during startup of the application
 * 
 * @lint ignoreDeprecated(alert)
 */
main : function() {
	this.base(arguments);
	if (qx.core.Environment.get("qx.debug")) {
		qx.log.appender.Native;
		qx.log.appender.Console;
	}
	var doc = this.getRoot();
	//doc.add(new ecsoft.forms.checks(),{edge:0});
	doc.setBackgroundColor("#e5caa7");
	
	//MENU GENERAL
	var menuGral = new qx.ui.groupbox.GroupBox();
		menuGral.set({minWidth:150,maxWidth:150});
		menuGral.setLayout(new qx.ui.layout.VBox(2).set({alignX:"left"}));
	
		var btnPDS = new qx.ui.form.Button("PDS");
		var btnInventario = new qx.ui.form.Button("Inventario");
		var btnAlarmas = new qx.ui.form.Button("Alarmas");
		var btnConfiguracion = new qx.ui.form.Button("Configuración");
		
	menuGral.add(btnPDS);
	menuGral.add(btnInventario);
	menuGral.add(btnAlarmas);
	menuGral.add(btnConfiguracion);
	
	//APLICACION
	doc.add(menuGral,{top: "0%", bottom:"70%", left: "1%",right:"90%", edge:1});
	doc.add(new ecsoft.pds.pds(),{top: "0%", left: "1%", width: "1%", height: "1%", edge:1});
	
	btnPDS.addListener("click",function(){
   	 //TODO Como hacer bien el switch este para ir cambiando de un js a otro
	//TODO porque aqui .add va y no ._add
		doc.add(new ecsoft.pds.pds(),{top: "0%", left: "1%", width: "1%", height: "1%", edge:1}); 
	},this);	
}
}});



//var win = new qx.ui.window.Window();
//win.setLayout(new qx.ui.layout.Canvas());
//win.add(new ecsoft.forms.checks(),{edge:0});
//win.open();
