window.requestAnimFrame = (function () {
 return  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function (callback) {
   window.setTimeout(callback, 1000 / 60);
  };
})();


/*
 * config basica
 */
var FX = {
	config : {
		background	: 'rgba(0,0,0,0.1)',
		color		: 'rgb(225,255,255)',
		highlight	: 'rgb(222,200,20)'
	},
	dots : []
};

FX.canvas = document.getElementById('sinal');
FX.ctx = FX.canvas.getContext('2d');


/*
 * objeto matemático
 */ 
Math.TO_RAD = Math.PI/180;

Math.getDistance = function( x1, y1, x2, y2 ) {
	
	var 	xs = 0,
		ys = 0;
	 
	xs = x1 - x2;
	ys = y1 - y2;		
	xs = xs * xs;
	ys = ys * ys;
	 
	return Math.sqrt( xs + ys );
};

Math.getDegree = function( x1, y1, x2, y2 ) {
		
	var	dx = x2 - x1,
		dy = y2 - y1;
	
	return Math.atan2(dy,dx) / Math.TO_RAD;
};



/*
 * objeto dot
 */
var Dot = function( opts ) {

	this.color = opts.color;
  
//posição do sinal
  
	this.x = 0;
	this.y = 0;
	this.dest_x = (opts.dest_x - 200);
	this.dest_y = (opts.dest_y - 120);
};

Dot.prototype.update = function() {

	var 	d = this,
		dist_x = d.dest_x - d.x,
		dist_y = d.dest_y - d.y;

	d.x += dist_x * 0.02;
	d.y += dist_y * 0.02;
  
// tamanho dos quadradinhos
  
	FX.ctx.fillStyle = d.color;
	FX.ctx.fillRect( d.x-2, d.y-2, 15, 15);
};



/*
 * full screen canvas
 */
FX.setFullscreen = function() {
	FX.width = FX.canvas.width = window.innerWidth;
	FX.height = FX.canvas.height = window.innerHeight;
};

/*
 * Mouse
 */
FX.handleMouseEvent = function(e, power) {

 //tamanho do raio de pulsão do cursor 
	var 	radius = 120,
		k = FX.dots.length,
		i=0,
		mx, my, 
		dist, degree,
		d;

	if(e.offsetX) {
		mx = e.offsetX;
		my = e.offsetY;
	} else if(e.layerX) {
		mx = e.layerX;
		my = e.layerY;
	}

	mx -= FX.width/2;
	my -= FX.height/2;

	for( ;i<k;i=i+1 ) {

		d = FX.dots[i];

		dist = Math.getDistance( mx, my, d.x, d.y);		

		if( dist < radius ) {

			degree = Math.getDegree( d.x, d.y, mx, my );

			d.x += (Math.cos( degree * Math.TO_RAD ) * ((radius-dist) * power));
			d.y += (Math.sin( degree * Math.TO_RAD ) * ((radius-dist) * power));

			d.color = FX.config.highlight;

		} else {
			d.color = FX.config.color;
		}
	}
};

/*
 * criando o sinalizador
 */
FX.createHeart = function() {
	var 	coords = [[-2,2],[-2,3],[-2,12],[-1,1],[-1,2],[-1,13],[-3,6],[-3,7],[-3,8],[-3,9],[0,6],[0,7],[0,8],[0,9],[1,-1],[1,4],[1,5],[1,6],[1,7],[1,8],[1,9],[1,10],[1,11],[1,16],[2,-1],[2,-2],[2,3],[2,4],[2,5],[2,10],[2,11],[2,12],[2,16],[2,17],[3,-2],[3,2],[3,3],[3,4],[3,11],[3,12],[3,13],[3,17],[4,1],[4,2],[4,3],[4,6],[4,7],[4,8],[4,9],[4,12],[4,13],[4,14],[5,1],[5,2],[5,5],[5,6],[5,7],[5,8],[5,9],[5,10],[5,13],[5,14],[6,-3],[6,0],[6,1],[6,4],[6,5],[6,6],[6,7],[6,8],[6,9],[6,10],[6,11],[6,14],[6,15],[6,18],[7,-3],[7,0],[7,1],[7,4],[7,5],[7,6],[7,7],[7,8],[7,9],[7,10],[7,11],[7,14],[7,15],[7,18],[8,-3],[8,0],[8,1],[8,4],[8,5],[8,6],[8,7],[8,8],[8,9],[8,10],[8,11],[8,14],[8,15],[8,18],[9,-3],[9,0],[9,1],[9,4],[9,5],[9,6],[9,7],[9,8],[9,9],[9,10],[9,11],[9,14],[9,15],[9,18],[10,1],[10,2],[10,5],[10,6],[10,7],[10,8],[10,9],[10,10],[10,13],[10,14],[11,1],[11,2],[11,3],[11,6],[11,7],[11,8],[11,9],[11,12],[11,13],[11,14],[12,-2],[12,2],[12,3],[12,4],[12,11],[12,12],[12,13],[12,17],[13,-1],[13,-2],[13,3],[13,4],[13,5],[13,10],[13,11],[13,12],[13,16],[13,17],[15,6],[15,7],[15,8],[15,9],[16,1],[16,2],[16,13],[16,14],[17,2],[17,3],[17,12],[17,13],[18,7],[18,6],[18,8],[18,9],[14,-1],[14,9],[14,10],[14,11],[14,4],[14,5],[14,6],[14,7],[14,8],[14,16],[-2,13],[-1,14]],
		k = coords.length,
		raster = 17,
		i = 0;

	for( ;i<k;i=i+1 ) {
		FX.dots.push( new Dot({
			dest_x : coords[i][0] * raster,
			dest_y : coords[i][1] * raster,
			color: FX.config.color
		}) );
	}
};

/*
 * loop
 */
FX.loop = function() {

	var 	ctx = FX.ctx,
		k = FX.dots.length,
		i = 0;

	ctx.fillStyle = FX.config.background;
	ctx.fillRect(0,0, FX.width, FX.height );


	ctx.save();
	ctx.translate( FX.width/2, FX.height/2 );

	for( ;i<k;i=i+1 ) {
		FX.dots[i].update();
	}

	ctx.restore();
	
	requestAnimFrame( FX.loop );
};

/*
 * Events
 */
window.addEventListener('resize', FX.setFullscreen );
FX.canvas.addEventListener('mousemove', function(e) { FX.handleMouseEvent(e, -0.1); } );
FX.canvas.addEventListener('mousedown', function(e) { FX.handleMouseEvent(e, 1); } );


/*
 * Inic
 */
FX.setFullscreen();
FX.createHeart();
FX.loop();