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
	
	doc.add(new ecsoft.forms.checks());
}
}});