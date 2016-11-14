var canvas = document.getElementById('tutorial');
var ctx = canvas.getContext('2d');

var intervalID;
var timeoutID;


var line = function(x0,y0, x1, y1) {
    ctx.beginPath();
    ctx.moveTo(x0,y0);
    ctx.lineTo(x1,y1);
    ctx.stroke();
};
var triangle = function(x0, y0, x1, y1, x2, y2){
    ctx.beginPath();
    ctx.moveTo(x0,y0);
    ctx.lineTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.fill();
};
var circle = function(x, y){
    var circle = new Path2D();
    circle.arc(x, y, 4, 0, 2 * Math.PI);
    ctx.fill(circle);
};
var circleArray = [];
circleArray = [[250, 380],[300, 350],[350, 320],[400, 300],[450, 350],[500, 380],[600, 300],[700, 300],[800, 380],[850, 360]];

var draw = function(){

    ctx.strokeStyle = "green";
    ctx.fillStyle = "green";
    ctx.font = "20px serif";

    var drawAxes = function() {

        //система координат

        line(20,500,1000,500);
        line(100,20,100,550);
        triangle(1005,500,990,495,990,505);
        triangle(100,15,95,30,105,30);

        ctx.fillText("x", 985, 520);
        ctx.fillText("y", 85, 30);
        ctx.fillText("0", 88, 495);

        var x, y;
        var addX = 100, addY = 500;

        //нумерация системы координат
        for(x = 100, y = 500;
            x < 950, y > 50;
            x+=100, y-=50){

            line(x, addY+3, x, addY-3);
            line(addX+3, y, addX-3, y);
        }
    };
    var drawDots = function(){
        var x0 = circleArray[0][0], y0 =circleArray[0][1];
        for(var i = 0; i < circleArray.length; i++){
                circle(circleArray[i][0], circleArray[i][1]);
                line(x0,y0,circleArray[i][0], circleArray[i][1]);
                x0 = circleArray[i][0];
                y0 = circleArray[i][1];
        }
    };

    var i, x0, y0, x, y, xi, yi, xk, yk, k, sum, p, plurality;
    x0 = circleArray[0][0];
    y0 = circleArray[0][1];
    x = circleArray[0][0];

    intervalID = window.setInterval(function() {

        if(x > circleArray[9][0]){
            line(x0, y0, circleArray[9][0], circleArray[9][1]);
            timeoutID = window.setTimeout(function(){
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                x0 = circleArray[0][0];
                y0 = circleArray[0][1];
                x = circleArray[0][0];
                drawAxes();
                drawDots();

            }, 1000);
        }

        else if(x < circleArray[9][0]){
            sum = 0;
            for(i = 0; i < circleArray.length; i++){

                xi = circleArray[i][0];
                yi = circleArray[i][1];

                plurality = 1;
                p = 1;
                for(k = 0; k < circleArray.length; k++){
                    xk = circleArray[k][0];
                    yk = circleArray[k][1];
                    if(i != k){
                        p = ((x-xk)/(xi-xk));
                    }
                    plurality *= p;
                }
                plurality *= yi;
                sum += plurality;
            }
            y = sum;

            line(x0, y0, x, y);
            x0 = x;
            y0 = y;

        }

        x+=1;

    }, 1);

    drawAxes();
    drawDots();
};