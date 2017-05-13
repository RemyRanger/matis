
var sphere = new Sphere3D();
            var html5logo = new Image();
            var html5radius = 50;
            var html5direction = 0.5;
            var rotation = 0;
            var distance = 1000;

            function Point3D() {
                this.x = 0;
                this.y = 0;
                this.z = 0;
            }

            function Sphere3D(radius) {
                this.point = new Array();
                this.color = "rgb(100,0,255)"
                this.radius = (typeof(radius) == "undefined") ? 20.0 : radius;
                this.radius = (typeof(radius) != "number") ? 20.0 : radius;
                this.numberOfVertexes = 0;
                var Teta1 = <%= teta1 %>;
                //var Teta1 = 0;//canvas.Teta1;
                var Teta2 = 3.14;//canvas.Teta2;

                // Ciclo da 0ø a 360ø con passo di 10ø...calcola la circonf. di mezzo
                for(var alpha = Teta1; alpha <= Teta2; alpha += 0.17) {
                  for(r=this.radius; r>0; r-=5) {
                    p = this.point[this.numberOfVertexes] = new Point3D();

                    p.x = Math.cos(alpha) * r;
                    p.y = 0;
                    p.z = Math.sin(alpha) * r;

                    this.numberOfVertexes++;
                  }
                }

                // Ciclo da 0ø a 90ø con passo di 10ø...calcola la prima semisfera (direction = 1)
                // Ciclo da 0ø a 90ø con passo di 10ø...calcola la seconda semisfera (direction = -1)
                for(r=this.radius; r>0; r-=5) {
                  for(var direction = 1; direction >= 1; direction -= 2) {
                    for(var beta = 0.17; beta < 1.445; beta += 0.17) { //1.445
                        var radius = Math.cos(beta) * r;
                        var fixedY = Math.sin(beta) * r * direction;

                        for(var alpha = Teta1; alpha < Teta2; alpha += 0.17) {
                            p = this.point[this.numberOfVertexes] = new Point3D();

                            p.x = Math.cos(alpha) * radius;
                            p.y = fixedY;
                            p.z = Math.sin(alpha) * radius;

                            this.numberOfVertexes++;
                        }
                    }
                }
              }
              }

            function rotateX(point, radians) {
                var y = point.y;
                point.y = (y * Math.cos(radians)) + (point.z * Math.sin(radians) * -1.0);
                point.z = (y * Math.sin(radians)) + (point.z * Math.cos(radians));
            }

            function rotateY(point, radians) {
                var x = point.x;
                point.x = (x * Math.cos(radians)) + (point.z * Math.sin(radians) * -1.0);
                point.z = (x * Math.sin(radians)) + (point.z * Math.cos(radians));
            }

            function rotateZ(point, radians) {
                var x = point.x;
                point.x = (x * Math.cos(radians)) + (point.y * Math.sin(radians) * -1.0);
                point.y = (x * Math.sin(radians)) + (point.y * Math.cos(radians));
            }

            function projection(xy, z, xyOffset, zOffset, distance) {
                return ((distance * xy) / (z - zOffset)) + xyOffset;
            }

            function render() {
                var canvas = document.getElementById("sphere3d");
                var width = canvas.getAttribute("width");
                var height = canvas.getAttribute("height");
                var ctx = canvas.getContext('2d');
                var x, y;

                var p = new Point3D();

                ctx.save();
                ctx.clearRect(0, 0, width, height);

                ctx.globalCompositeOperation = "lighter";

                for(i = 0; i < sphere.numberOfVertexes; i++) {

                    p.x = sphere.point[i].x;
                    p.y = sphere.point[i].y;
                    p.z = sphere.point[i].z;

                    //rotateX(p, rotation);
                    rotateY(p, rotation);
                    //rotateZ(p, rotation);

                    x = projection(p.x, p.z, width/2.0, 100.0, distance);
                    y = projection(p.y, p.z, height/2.0, 100.0, distance);

                    if((x >= 0) && (x < width)) {
                        if((y >= 0) && (y < height)) {
                            if(p.z < 0) {
                                drawPoint(ctx, x, y, 1, "rgba(200,200,200,0.6)");
                            } else {
                                drawPointWithGradient(ctx, x, y, 2, "rgb(230,230,230)", 0.8);
                            }
                        }
                    }
                }
                ctx.restore();
                //ctx.fillStyle = "rgb(0,0,0)";
                //ctx.fillText('salut', width-90, height-5);
                rotation += Math.PI/90.0;

            }

            function drawPoint(ctx, x, y, size, color) {
                ctx.save();
                ctx.beginPath();
                ctx.fillStyle = color;
                ctx.arc(x, y, size, 0, 2*Math.PI, true);
                ctx.fill();
                ctx.restore();
            }

            function drawPointWithGradient(ctx, x, y, size, color, gradient) {
                var reflection;

                reflection = size / 4;

                ctx.save();
                ctx.translate(x, y);
                var radgrad = ctx.createRadialGradient(-reflection,-reflection,reflection,0,0,size);

                radgrad.addColorStop(0, '#FFFFFF');
                radgrad.addColorStop(gradient, color);
                radgrad.addColorStop(1, 'rgba(1,159,98,0)');

                ctx.fillStyle = radgrad;
                ctx.fillRect(-size,-size,size*2,size*2);
                ctx.restore();
            }

            function drawHalo(ctx, x, y, size, color, gradient) {
                var reflection;

                reflection = size / 4;

                ctx.save();
                ctx.translate(x, y);
                var radgrad = ctx.createRadialGradient(0,0,reflection,0,0,size);

                radgrad.addColorStop(0, '#FFFFFF');
                radgrad.addColorStop(gradient, color);
                radgrad.addColorStop(1, 'rgba(1,159,98,0)');

                ctx.fillStyle = radgrad;
                ctx.fillRect(-size,-size,size*2,size*2);
                ctx.restore();
            }

            function init(){
                // Set framerate to 30 fps
                setInterval(render, 1000/30);

            }
