qx.Class.define("ecsoft.pds.grafChecks", {  
  
  extend : qx.ui.core.Widget,
  
  construct : function()
  {
    this.base(arguments);  
    
    var loader = new qx.bom.request.Script();
    loader.onload = function(){};
    loader.open("GET", "http://localhost/ecsoft/libs/GrafPan.js");
    loader.send();
    
    this.addListenerOnce("appear", this.__onAppearOnce, this);
    this.addListener("appear", this._cambio, this);
  },
  members :
  {
	crearGrafica: function(datos,datoSeleccionado){
      this._chart = new CanvasJS.Chart("canvasChecks", {
    		theme: 'voltaje',
    		zoomEnabled: true,
			//zoomType: "xy",
			title:{
				text: "" 
			},
			animationEnabled: false,
			axisX:{
				valueFormatString: "DD-MM-YY",
				gridThickness: 0.5
			},
			axisY :{
				includeZero:false
			},
			ToolTip: {
				enabled: false
			},
			    data: [
			    {
			    //amp:#13E2E0, vol: #73d216
			     type: "scatter",
			     color: "#14E900",
			     markerBorderColor:"#14E900",
			     markerType: "circle",
			     markerSize: 10,
			     dataPoints: datos		     
			    },{
				    //amp:#13E2E0, vol: #73d216
				     type: "scatter",
				     color: "#14E900",
				     markerBorderColor:"#ff0000",
				     markerType: "circle",
				     markerSize: 10,
				     markerBorderThickness:4,
				     dataPoints: datoSeleccionado		     
				 }
			    ]	     
			 });
    	
      this._chart.render();
      
      this._canvas = this.getContentElement().getDomElement().firstChild.firstChild;
      this.addListener("resize", function(e){
	        this.info("resize event");
	        this._canvas.setAttribute("width", e.getData().width);
	        this._canvas.setAttribute("height", e.getData().height);
	        //console.log(chart);
	        //chart.setSize(100,100)
	        //self.getRoot().fireDataEvent('resize');
	        this._chart.render();
	        qx.html.Element.flush(); 
	      });
	},
    __onAppearOnce : function()
    {
      this.getContentElement().getDomElement().setAttribute("id", "canvasChecks", true);
    },
	_cambio: function(){
		if(this._canvas){
		    this._chart.render();
		    qx.html.Element.flush();
		}
  	}	
  }
});
