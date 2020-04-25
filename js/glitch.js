let windowW = window.innerWidth;
let windowH = window.innerHeight;
let particles;
let isLoaded = false;
let glitch;
let font,  fontsize = 40;
let imgSrc;
let img;
let running = true;


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    particles=new ParticleOrbits();
    canvas.mousePressed(()=> {
        particles.mouseIsDown = true;
    });
    canvas.touchStarted(particles.touchStartHandler);
    canvas.touchMoved(particles.touchMoveHandler);
}

function preload() {
    
}

function setup() {
    //p5.js function
    canvas = createCanvas(windowW, windowH);
    canvas.parent('main-canvas');
    particles = new ParticleOrbits();
    img = loadImage('../images/octocat.png', function(img) {
        img.resize(0,0.1*width);
        glitch = new Glitch(img);
        isLoaded = true;
    });
    canvas.mousePressed(()=> {
        particles.mouseIsDown = true;
    });
    canvas.mouseClicked(()=> {
        particles.flipDirections = true;
    });
    canvas.touchStarted(()=> {
        if(touches.length == 1) {
            // maybe need to disable default?
			particles.shift.x = touches[0].x;
			particles.shift.y = touches[0].y;
		}
    });
    canvas.touchMoved(particles.touchMoveHandler);
    textSize(fontsize);
    textAlign(CENTER, CENTER);
    fill(255);
    
}

function draw() {
    background('#121212');
    particles.loop();
    // if (isLoaded) {
    //     glitch.show();
    // }else{
    //     img = loadImage(canvas.canvas.toDataURL(), function(img) {
    //         img.resize(0,particles.RADIUS);
    //         glitch = new Glitch(img);
    //         isLoaded = true;
    //     });
    // }
    // overlay circle to help text legibility especially on small screens
    push();
    noStroke();
    fill('rgba(12, 12, 12, 0.3)');
    ellipse(particles.centreX, particles.centreY, 160);
    fill(255, 255, 255)
    textSize(fontsize);
    text('deefunkt', width*0.5, height*0.5);
    fill(255, 255, 255);
    textSize(14);
    text('FPS: ' + floor(frameRate()), 30, 30);
    pop();

}
// function onMousePressed(){
//     img = loadImage(canvas.toDataURL(), function(img) {
//             img.resize(windowWidth, windowHeight);
//             glitch = new Glitch(img);
//             isLoaded = true;
//         });
//     if (isLoaded) {
//         glitch.show();
//     }
// }

function isScrolledIntoView(el) {
    var rect = el.getBoundingClientRect();
    var elemBottom = rect.bottom;
    // Only completely visible elements return true:
    var isVisible = (elemBottom >= window.innerHeight - 0.5*window.innerHeight);
    // Partially visible elements return true:
    if (!running){
        loop();
    }
    //isVisible = elemTop < window.innerHeight && elemBottom >= 0;
    return isVisible;
}

class Glitch {
    constructor(img) {
        this.channelLen = 4;
        this.imgOrigin = img;
        this.imgOrigin.loadPixels();
        this.copyData = [];
        this.flowLineImgs = [];
        this.shiftLineImgs = [];
        this.shiftRGBs = [];
        this.scatImgs = [];
        this.throughFlag = true;
        this.copyData = new Uint8ClampedArray(this.imgOrigin.pixels);

        // flow line
        for (let i = 0; i < 1; i++) {
            let o = {
                pixels: null,
                t1: floor(random(0, 1000)),
                speed: floor(random(4, 24)),
                randX: floor(random(24, 80))
            };
            this.flowLineImgs.push(o);
        }

        // shift line
        for (let i = 0; i < 6; i++) {
            let o = null;
            this.shiftLineImgs.push(o);
        }

        // shift RGB
        for (let i = 0; i < 1; i++) {
            let o = null;
            this.shiftRGBs.push(o);
        }

        // scat imgs
        for (let i = 0; i < 3; i++) {
            let scatImg = {
                img: null,
                x: 0,
                y: 0
            };
            this.scatImgs.push(scatImg);
        }
    }

    replaceData(destImg, srcPixels) {
        for (let y = 0; y < destImg.height; y++) {
            for (let x = 0; x < destImg.width; x++) {
                let index;
                index = (y * destImg.width + x) * this.channelLen;                                                                
                destImg.pixels[index] = srcPixels[index];
                destImg.pixels[index + 1] = srcPixels[index + 1];
                destImg.pixels[index + 2] = srcPixels[index + 2];
                destImg.pixels[index + 3] = srcPixels[index + 3];
            }
        }
        destImg.updatePixels();
    }

    flowLine(srcImg, obj) {

        let destPixels,
            tempY;
        destPixels = new Uint8ClampedArray(srcImg.pixels);
        obj.t1 %= srcImg.height;
        obj.t1 += obj.speed;
        tempY = floor(noise(obj.t1) * srcImg.height);
        // tempY = floor(obj.t1);
        for (let y = 0; y < srcImg.height; y++) {
            if (tempY === y) {
                for (let x = 0; x < srcImg.width; x++) {
                    let index;
                    index = (y * srcImg.width + x) * this.channelLen;
                    destPixels[index] = srcImg.pixels[index] + obj.randX;
                    destPixels[index+1] = srcImg.pixels[index+1] + obj.randX;
                    destPixels[index+2] = srcImg.pixels[index+2] + obj.randX;
                    destPixels[index+3] = srcImg.pixels[index+3];
                }
            }
        }
        return destPixels;
    }

    shiftLine(srcImg) {

        let offsetX;
        let rangeMin, rangeMax;
        let destPixels;
        let rangeH;

        destPixels = new Uint8ClampedArray(srcImg.pixels);
        rangeH = srcImg.height;
        rangeMin = floor(random(0, rangeH));
        rangeMax = rangeMin + floor(random(1, rangeH - rangeMin));
        offsetX = this.channelLen * floor(random(-40, 40));

        for (let y = 0; y < srcImg.height; y++) {
            if (y > rangeMin && y < rangeMax) {
                for (let x = 0; x < srcImg.width; x++) {
                        let r, g, b, a;
                        let r2, g2, b2, a2;
                        let index;

                        index = (y * srcImg.width + x) * this.channelLen;
                        destPixels[index] = srcImg.pixels[index + offsetX];
                        destPixels[index + 1] = srcImg.pixels[index + 1 + offsetX];
                        destPixels[index + 2] = srcImg.pixels[index + 2 + offsetX];
                        destPixels[index + 3] = srcImg.pixels[index + 3];
                }
            }
        }
        return destPixels;
    }

    shiftRGB(srcImg) {

        let randR, randG, randB;
        let destPixels;
        let range;

        range = 16;
        destPixels = new Uint8ClampedArray(srcImg.pixels);
        randR = (floor(random(-range, range)) * srcImg.width + floor(random(-range, range))) * this.channelLen;
        randG = (floor(random(-range, range)) * srcImg.width + floor(random(-range, range))) * this.channelLen;
        randB = (floor(random(-range, range)) * srcImg.width + floor(random(-range, range))) * this.channelLen;
        // randa = (floor(random(0, 128)) + floor(random(0, 128)));

        for (let y = 0; y < srcImg.height; y++) {
            for (let x = 0; x < srcImg.width; x++) {
                let index;

                index = (y * srcImg.width + x) * this.channelLen;
                destPixels[index] = srcImg.pixels[(index + randR) % srcImg.pixels.length];
                destPixels[index+1] = srcImg.pixels[(index+1 + randG) % srcImg.pixels.length];
                destPixels[index+2] = srcImg.pixels[(index+2 + randB) % srcImg.pixels.length];
                destPixels[index+3] = srcImg.pixels[index+3];            
            }
        }

        return destPixels;
    }

    getRandomRectImg(srcImg) {
        let startX;
        let startY;
        let rectW;
        let rectH;
        let destImg;
        startX = floor(random(0, srcImg.width - 30));
        startY = floor(random(0, srcImg.height - 50));
        rectW = floor(random(30, srcImg.width - startX));
        rectH = floor(random(1, 50));
        destImg = srcImg.get(startX, startY, rectW, rectH);
        destImg.loadPixels();
        return destImg;
    }

    show() {
      
        // restore the original state
        this.replaceData(this.imgOrigin, this.copyData);

        // sometimes pass without effect processing
        let n = floor(random(85));
        if (n > 75 && this.throughFlag) {
            this.throughFlag = false;
            setTimeout(() => {
                this.throughFlag = true;
            }, floor(random(400, 1600)));
        }
        if (!this.throughFlag) {
            push();
            translate((width - this.imgOrigin.width) / 2, (height - this.imgOrigin.height) / 2);
            image(this.imgOrigin, 0,2*height/5);
            pop();
            return;
        }

        // flow line
        this.flowLineImgs.forEach((v, i, arr) => {
            arr[i].pixels = this.flowLine(this.imgOrigin, v);
            if (arr[i].pixels) {
                this.replaceData(this.imgOrigin, arr[i].pixels);
            }
        })

        // shift line
        this.shiftLineImgs.forEach((v, i, arr) => {
            if (floor(random(100)) > 50) {
                arr[i] = this.shiftLine(this.imgOrigin);
                this.replaceData(this.imgOrigin, arr[i]);
            } else {
                if (arr[i]) {
                    this.replaceData(this.imgOrigin, arr[i]);
                }
            }
        })

        // shift rgb
        this.shiftRGBs.forEach((v, i, arr) => {
            if (floor(random(100)) > 65) {
                arr[i] = this.shiftRGB(this.imgOrigin);
                this.replaceData(this.imgOrigin, arr[i]);
            }
        })

        push();
        translate((width - this.imgOrigin.width) / 2, (height - this.imgOrigin.height) / 2);
        image(this.imgOrigin, 0,2*height/5);
        pop();

        // scat image
        this.scatImgs.forEach((obj) => {
            push();
            translate((width - this.imgOrigin.width) / 2, (height - this.imgOrigin.height) / 2);
            if (floor(random(100)) > 80) {
                obj.x = floor(random(-this.imgOrigin.width * 0.3, this.imgOrigin.width * 0.7));
                obj.y = floor(random(-this.imgOrigin.height * 0.1, this.imgOrigin.height));
                obj.img = this.getRandomRectImg(this.imgOrigin);
            }
            if (obj.img) {
                image(obj.img, obj.x , obj.y+2*height/5);
            }
            pop();
        })

    }

}
            
class ParticleOrbits{

    constructor() {
        this.particles = [];
        this.mouseIsDown = false;
        this.centreX = floor(width/2);
        this.centreY = floor(height/2);
        if (width > height){
            this.RADIUS = width*0.2*Math.sqrt(2);
        }else{
            this.RADIUS = height*0.2*Math.sqrt(2);
        }
        this.RADIUS_SCALE = 1;
        this.RADIUS_SCALE_MIN = 1;
        this.RADIUS_SCALE_MAX = 1.2;
        this.arcRadius = this.RADIUS;
        // The number of particles that are used to generate the trail
        this.num_particles = 30;
        this.flipDirections = false;

		
		for (var i = 0; i < this.num_particles; i++) {
			var particle = {
				position: {x: this.centreX, y: this.centreY},
				shift: {x: this.centreX, y: this.centreY},
				size: 3,
				angle: 0,
				speed: 0.01+Math.random()*0.04,
				targetSize: 1,
				fillColor: '#' + (Math.random()*0x404040+0xaaaaaa | 0).toString(16),
				orbit: this.RADIUS*.5 + (this.RADIUS * .5 * Math.random())
			};
			
			this.particles.push( particle );
		}
	}
	
	mouseDownHandler() {
		this.mouseIsDown = true;
	}
	
	touchStartHandler(event) {
		
	}
	
	touchMoveHandler(event) {
		if(touches.length == 1) {
			// maybe need to disable default?

			this.centreX = touches[0].x;
			this.centreY = touches[0].y;
		}
	}
	
	loop() {
		if( mouseIsPressed ) {
            // Scale upward to the max scale
            // PD controller
			this.RADIUS_SCALE += ( this.RADIUS_SCALE_MAX - this.RADIUS_SCALE ) * (0.02);
		}
		else {
            // Scale downward to the min scale
            // PD controller
			this.RADIUS_SCALE -= ( this.RADIUS_SCALE - this.RADIUS_SCALE_MIN ) * (0.02);
		}
        
		for (let i = 0, len = this.particles.length; i < len; i++) {
			var particle = this.particles[i];
            var lp = {
                x: particle.position.x, 
                y: particle.position.y 
            };
            if (10000*Math.random() > 9950){
                // spontaneous emission/absorbtion
                particle.orbit = -1*(this.RADIUS*.5 + (this.RADIUS * .5 * Math.random()));
                this.arcRadius = this.RADIUS*.5 + (this.RADIUS * .5 * Math.random());
                particle.fillColor = '#' + (Math.random()*0x404040+0xaaaaaa | 0).toString(16);
            }
            var lastTheta = particle.angle;
			// Offset the angle to keep the spin going
			particle.angle += particle.speed;
            // // Follow mouse with some lag
            // if (i%5 == 0){
            //     particle.shift.x += ( mouseX - particle.shift.x) * (particle.speed)*(i%15)/45;
            //     particle.shift.y += ( mouseY - particle.shift.y) * (particle.speed)*(i%15)/45;
            // }
			// Apply position
			particle.position.x = particle.shift.x + Math.cos(i + particle.angle) * (particle.orbit*this.RADIUS_SCALE);
			particle.position.y = particle.shift.y - Math.sin(i + particle.angle) * (particle.orbit*this.RADIUS_SCALE);
			// Limit to screen bounds
			particle.position.x = Math.max( Math.min( particle.position.x, width), 0 );
			particle.position.y = Math.max( Math.min( particle.position.y, height), 0 );
			
			particle.size += ( particle.targetSize - particle.size ) * 0.05;
			
			// If we're at the target size, set a new one.
			if( Math.round( particle.size ) == Math.round( particle.targetSize ) ) {
				particle.targetSize = 1 + Math.random() * 7;
			}
            push();
            
			beginShape();
			fill(particle.fillColor);
			stroke(particle.fillColor);
            strokeWeight(particle.size);
            line(lp.x, lp.y, particle.position.x, particle.position.y)
            noFill();
            arc(particle.shift.x, particle.shift.y, 
                particle.orbit,particle.orbit, 
                lastTheta, particle.angle+0.6,);
            endShape();

            noFill();
            if (i%2 == 0){
                stroke('rgba(15, 15, 15, 0.15)');
                strokeWeight(particle.size*1.2);
                for (var j=0; j<30;j++){                    
                    arc(particle.shift.x, particle.shift.y, 
                        particle.orbit,particle.orbit, 
                        lastTheta, particle.angle+(j/50),);
                }
            }
            pop();
            // fill(particle.fillColor);
            // text(str(lastTheta), width*0.5, height*0.5);
        
        }
	}
}
