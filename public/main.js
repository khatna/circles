var bandw = false;

var data = {
		q: {
			sound: new Howl({
	  		src: ['public/sounds/bubbles.mp3']
			}),
			color: '#1abc9c'
		},
		w: {
			sound: new Howl({
	  		src: ['public/sounds/clay.mp3']
			}),
			color: '#2ecc71'
		},
		e: {
			sound: new Howl({
	  		src: ['public/sounds/confetti.mp3']
			}),
			color: '#3498db'
		},
		r: {
			sound: new Howl({
	  		src: ['public/sounds/corona.mp3']
			}),
			color: '#9b59b6'
		},
			t: {
			sound: new Howl({
	  		src: ['public/sounds/dotted-spiral.mp3']
			}),
			color: '#34495e'
		},
		y: {
			sound: new Howl({
	  		src: ['public/sounds/flash-1.mp3']
			}),
			color: '#16a085'
		},
		u: {
			sound: new Howl({
	  		src: ['public/sounds/flash-2.mp3']
			}),
			color: '#27ae60'
		},
		i: {
			sound: new Howl({
	  		src: ['public/sounds/flash-3.mp3']
			}),
			color: '#2980b9'
		},
		o: {
			sound: new Howl({
				src: ['public/sounds/glimmer.mp3']
			}),
			color: '#8e44ad'
		},
		p: {
			sound: new Howl({
	  		src: ['public/sounds/moon.mp3']
			}),
			color: '#2c3e50'
		},
		a: {
			sound: new Howl({
	  		src: ['public/sounds/pinwheel.mp3']
			}),
			color: '#f1c40f'
		},
		s: {
			sound: new Howl({
	  		src: ['public/sounds/piston-1.mp3']
			}),
			color: '#e67e22'
		},
			d: {
			sound: new Howl({
	  		src: ['public/sounds/piston-2.mp3']
			}),
			color: '#e74c3c'
		},
		f: {
			sound: new Howl({
	  		src: ['public/sounds/prism-1.mp3']
			}),
			color: '#95a5a6'
		},
		g: {
			sound: new Howl({
	  		src: ['public/sounds/prism-2.mp3']
			}),
			color: '#f39c12'
		},
		h: {
			sound: new Howl({
	  		src: ['public/sounds/prism-3.mp3']
			}),
			color: '#d35400'
		},
		j: {
			sound: new Howl({
	  		src: ['public/sounds/splits.mp3']
			}),
			color: '#1abc9c'
		},
		k: {
			sound: new Howl({
	  		src: ['public/sounds/squiggle.mp3']
			}),
			color: '#2ecc71'
		},
		l: {
			sound: new Howl({
	  		src: ['public/sounds/strike.mp3']
			}),
			color: '#3498db'
		},
		z: {
			sound: new Howl({
	  		src: ['public/sounds/suspension.mp3']
			}),
			color: '#9b59b6'
		},
		x: {
			sound: new Howl({
	  		src: ['public/sounds/timer.mp3']
			}),
			color: '#34495e'
		},
		c: {
			sound: new Howl({
	  		src: ['public/sounds/ufo.mp3']
			}),
			color: '#16a085'
		},
		v: {
			sound: new Howl({
	  		src: ['public/sounds/veil.mp3']
			}),
			color: '#27ae60'
		},
		b: {
			sound: new Howl({
	  		src: ['public/sounds/wipe.mp3']
			}),
			color: '#2980b9'
		},
		n: {
			sound: new Howl({
				src: ['public/sounds/zig-zag.mp3']
			}),
			color: '#8e44ad'
		},
		m: {
			sound: new Howl({
	  		src: ['public/sounds/moon.mp3']
			}),
			color: '#2c3e50'
		}
	};

var circles = [];

var text = new PointText({
    point: view.center,
    justification: 'center',
    content: 'press a key',
    fillColor: new Color(0, 0.8),
    fontFamily: 'Bai Jamjuree',
    fontWeight: 'bold',
    fontSize: 36,
    dy: 0
});

// whenever a key is pressed
function onKeyDown(event) {
	// draw circles and play apporopriate sound file
	if (data[event.key]) {
		// move text up
		text.dy += -2;
		text.fontSize += -5;
		text.content = "keep it up!";
		
		var maxPoint = new Point(view.size.width, view.size.height);
		var randomPoint = Point.random();
		var point = maxPoint * randomPoint;
		
		var circle = new Path.Circle(point, 300);
		
		if (bandw) {
			circle.fillColor = "white";
		} else {
			circle.fillColor = data[event.key].color;
		}
	
		data[event.key].sound.play();

		circles.push(circle);
	}
}

// animation
function onFrame() {
	if (text) {
		text.position += new Point(0, text.dy);
		bandw ? text.fillColor = "white" : text.fillColor = new Color(0, 0.8);
	}
	for (var i = 0; i < circles.length; i++) {
		if (!bandw) circles[i].fillColor.hue += 1;
		circles[i].scale(0.9); 

		if (circles[i].area < 1) {
			circles[i].remove();
			circles.splice(i, 1);
			i--;
		}
		
		if (text && text.position.y > view.size.height) {
			text = null;
		} 
	}
}

// Handling "bandw" mode
$("button").click(function() {
	$("#myCanvas").toggleClass("bandw");
	$(this).toggleClass("bandw");
	bandw = !bandw;
	if (bandw) $(this).html("lights on");
	else       $(this).html("lights off");
});