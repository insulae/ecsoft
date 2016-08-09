qx.Class.define("ecsoft.pds.grafChecks", {  
  
  extend : qx.ui.core.Widget,
  
  construct : function()
  {
    this.base(arguments);  
    this.addListenerOnce("appear", this.__onAppearOnce, this);
    this._chart='';
    this._canvas='';
    
  },
  members :
  {
	crearGrafica: function(datos){
		this._datosVoltaje = datosVoltaje;
		this._datosAmperaje = datosAmperaje;
		
		      this._chart = new CanvasJS.Chart("canvasRec", {
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
					     color: colorCheck,
					     markerBorderColor:colorCheck,
					     markerType: "circle",
					     markerSize: 10,
					     dataPoints: this.datos		     
					    }]	     
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