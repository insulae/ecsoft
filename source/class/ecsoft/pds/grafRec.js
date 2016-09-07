qx.Class.define("ecsoft.pds.grafRec", {  
  
  extend : qx.ui.core.Widget,
  
  construct : function()
  {
    this.base(arguments);  
    this.addListenerOnce("appear", this.__onAppearOnce, this);
    this.addListener("appear", this._cambio, this);
  },
  members :
  {
	crearGrafica: function(datosVoltaje,datosAmperaje){
		this._datosVoltaje = datosVoltaje;
		this._datosAmperaje = datosAmperaje;
		
		      this._chart = new CanvasJS.Chart("canvasRec", {
		    		theme: 'voltaje',
		    		zoomEnabled: true,
		    		title:{
		    			text: "" 
		    		},
		    		animationEnabled: false,
		    		axisX :{
		    			valueFormatString: "mm:ss"
		    		},
		    		axisY :{
		     			title: "AMP",
		     			titleFontFamily:"lato",
		     			titleFontWeight: "bold",
		     			titleFontSize: 15,
		    			titleFontColor: "#14E9FF",
		    			labelFontFamily: "lato",
		    			labelFontWeight: "bold",
		    			labelFontSize: 12,
		    			labelFontColor: "#14E9FF",
		    			includeZero:false
		    		},
		    		axisY2 :{
		     			title: "VOLT",
		     			titleFontFamily:"lato",
		     			titleFontWeight: "bold",
		     			titleFontSize: 15,
		    			titleFontColor: "#14E900",
		    			labelFontFamily: "lato",
		    			labelFontWeight: "bold",
		    			labelFontSize: 12,
		    			labelFontColor: "#14E900",
		    			includeZero:false
		    		},		
		    		ToolTip: {
		    			enabled: false
		    		},
		    	    data: [
		    			    {
		    			     type: "spline",
		    			     color: "#14E9FF",
		    			     dataPoints: this._datosAmperaje,
		    			     markerSize: "0"
		    			    },
		    			    {
		    			     type: "spline",
		    			     color: "#14E900",
		    			     axisYType: "secondary",
		    			     dataPoints: this._datosVoltaje,
		    			     markerSize: "0"
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
      this.getContentElement().getDomElement().setAttribute("id", "canvasRec", true);
    },
	_cambio: function(){
		if(this._canvas){
		    this._chart.render();
		    qx.html.Element.flush();
		}
  	}   
  }
});

var callback = function(){
// 	
//  var win = new qx.ui.window.Window("CanvasJS");
//  win.setLayout(new qx.ui.layout.Grow());
//  win.set({
//    width: 300,
//    height: 200
//  });
//  
//  var qxCanvas = new ecsoft.pds.grafica();
//  
//  win.add(qxCanvas);
//  win.open();
// 
//	this.getRoot().add(win, {left:10, top: 10});
};

var loader = new qx.bom.request.Script();
loader.onload = callback;
loader.open("GET", "http://localhost/ecsoft/libs/GrafPan.js");
loader.send();