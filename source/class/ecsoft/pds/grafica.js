qx.Class.define("ecsoft.pds.grafica", {  
  
  extend : qx.ui.core.Widget,
  
  construct : function()
  {
    this.base(arguments);  
    this.addListenerOnce("appear", this.__onAppearOnce, this);
    
  },
  members :
  {
    __onAppearOnce : function()
    {
      this.getContentElement().getDomElement().setAttribute("id", "canvasElement", true);
      
      var chart = new CanvasJS.Chart("canvasElement", {
		theme: 'cranks',
		zoomEnabled: true,
		//zoomType: "xy",
		title:{
			text: "" 
		},
		animationEnabled: false,
		axisX:{
			valueFormatString: "DD-MM-YY",
			gridThickness: 0.5,
			labelAngle:"0"
		},
		axisY :{
			includeZero:false
		},
		ToolTip: {
			enabled: false
		},
        data: [
          {
        	type: "scatter",
			color: "#73d216",
			markerBorderColor:"#73d216",
			markerType: "circle",
			markerSize: 10,
            dataPoints: [
                         { x: 10, y: 71},
                         { x: 20, y: 55},
                         { x: 30, y: 50 },
                         { x: 40, y: 65 },
                         { x: 50, y: 95 },
                         { x: 52, y: 68 },
                         { x: 54, y: 68 },
                         { x: 56, y: 68 },
                         { x: 60, y: 68 },
                         { x: 70, y: 28 },
                         { x: 80, y: 34 },
                         { x: 90, y: 14}
                         ]
          }
        ]
      });
    
      chart.render();
      
      var canvas = this.getContentElement().getDomElement().firstChild.firstChild;
      
      this.addListener("resize", function(e){
        this.info("resize event");
        
        canvas.setAttribute("width", e.getData().width);
        canvas.setAttribute("height", e.getData().height);
        //console.log(chart);
        //chart.setSize(100,100)
        //self.getRoot().fireDataEvent('resize');
        chart.render();
        qx.html.Element.flush(); 
      });
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