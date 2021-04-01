var gamelevel = 3;
var steps;

var S = new Stack(); //source
var T = new Stack(); //temp
var D = new Stack(); //destination
var gameColors = ["#ffff1a", "tomato", "black", "gray", "#800000","blue"];

const rodWidth = 150; 
const distance = 12.5;
var platesHightStart;


var myRodes = [];	
var myPlates = [];
var myStacks = [S, T, D];
/* The canvas has a width of 600px and height400px
	Three rods each having with 150	
	150 + 150 + 150 = 450
	space left = 600 - 450 = 150
	Divide the space 150 / 4 = 37.5
	Blue Print:
	37.5 + 150 + 37.5 + 150 + 37.5 + 150 + 37.5 
*/

function startGame() {
    rod1 = new platesHolder(distance); // 37.5 	
    rod2 = new platesHolder(distance + rodWidth + distance); //37.5 + 150 + 37.5
    rod3 = new platesHolder(
		distance + rodWidth + distance + rodWidth + distance
	); //37.5 + 150 + 37.5 + 150 + 37.5
    myRodes = [rod1, rod2, rod3];
    initialize();
    myGameArea.start();   
}

function initialize(){
	S.empty(); T.empty(); D.empty(); 

	myPlates = [];
	
	steps = 0;

	// document.getElementById("counter").innerHTML = steps;

	var p;
	for(var i = gamelevel; i>= 1; i--){
		S.push(i); 
	}
	//Result:
	// 1
	// 2
	// 3
	//Source
	if(gamelevel === 6){
		platesHightStart = 300 - 3*15;
	}
	else if(gamelevel === 5){
		platesHightStart = 300 - 2*15;
	}
	else if(gamelevel === 4){
		platesHightStart = 300 - 15;
	}
	else if(gamelevel === 3){
		platesHightStart = 300;
		
	}
	for(var i=1; i<=gamelevel; i++){
		p = new plates(i, gameColors[i-1]);
		myPlates.push(p);
	}
	// console.log(platesHightStart);
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 500;
        this.canvas.height = 400;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.getElementById("btnContainer"));
        this.interval = setInterval(updateGameArea,  20);
		this.canvas.setAttribute("id", "tower");
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function platesHolder(x){
	this.x = x;
    this.update = function(){
        ctx = myGameArea.context;
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, 360, 150, 20); // horizontal rod (x-axis, y-axis, width, height)
    	//vertical rod has with 20 and height 200
		// x cordinate of it is 150 / 2  =  75 - 10  
		ctx.fillRect(this.x + 65, 160, 20, 200); 
    }
}

function plates(l, color ){
	this.level = l;
	this.placedOn = 1; //Every rod is placed on first rot at start of game
	this.y = platesHightStart + l*15;
	this.x; // =  (rodWidth / 2) - (this.level * 12);	

	this.update = function(){
		this.x = myRodes[this.placedOn-1].x + rodWidth/2 - this.level*12;
        ctx = myGameArea.context;
        ctx.fillStyle = color;
		ctx.fillRect(this.x , this.y, this.level*24, 15); //(width = 24*, height = 15)
		/* With of each six plates
			24
			48
			72
			96
			120
			144
		*/
	}
    this.push = function(rod){
    	var length = myStacks[rod-1].length();
    	this.y = 345;
    	this.y += -1*(15 * length);
    	this.placedOn = rod;
    	this.update(); 
    }
    this.pop = function(){
    	this.y = 100;
    }
	console.log(this);
}



function print(){
	console.log(S.print());
	console.log(T.print());
	console.log(D.print());
}

var popedItem;
function popFrom(stack){
	if(stack.isEmpty()){
		return;
	}
	popedItem = stack.pop();
	myPlates[popedItem-1].pop();
	pushButton();
	print();
}

function pushTo(stack){
	steps++;
	var i;
	if(stack === S){
		i = 1;
	}
	else if(stack === T){
		i = 2;
	}
	else if(stack === D){
		i = 3;
	}
	if(stack.peek() < popedItem) return;
	myPlates[popedItem-1].push(i);
	stack.push(popedItem);
	popButton();
	print();
}


function pushButton(){
	document.getElementById("btnPop").style.display = "none";
	document.getElementById("btnPush").style.display = "block";
}

function popButton(){
	// document.getElementById("counter").innerHTML = steps;
	document.getElementById("btnPop").style.display = "block";
	document.getElementById("btnPush").style.display = "none";
}


function updateGameArea() {
    myGameArea.clear();
    myRodes[0].update();
    myRodes[1].update();
    myRodes[2].update();
    for(var i=0; i<gamelevel; i++){
    	myPlates[i].update();
    }
	document.querySelector(".btnContainer").style.left = document.getElementById("tower").getBoundingClientRect().x + "px";
	// console.log(document.getElementById("tower").getBoundingClientRect().x, document.querySelector(".btnContainer"));
}



