class  Stack{
	protected A : number[];
	protected tos : number;

	constructor(){
		this.A = [];
		this.tos = 0;
	}

	isEmpty = () : boolean => !this.tos;

	empty = () : void => {
		for(let i : number =0; i<this.tos; i++){
			delete this.A[i];
		}
		this.tos = 0;
	}

	push = (item : number) : void => {
		this.A[this.tos++] = item;
	}

	// pop = (): number => this.A[--this.tos];

	pop = (): number  => {
		if (this.isEmpty()) {
			return 0; // Return null when the stack is empty
		}
		return this.A[--this.tos]!;
	};

	peek = (): number | undefined => {
		if (this.isEmpty()) {
			return undefined; // Return null when the stack is empty
		}
		return this.A[this.tos - 1];
	}

	length = (): number => this.tos

	print = () : string => {
		let str:string = "";
		for(let i : number = this.tos-1; i>=0; i--){
			str += this.A[i] + "\n";
		}
		return str;
	}
}




let gameLevel = 3;
let steps :number = 0
const S = new Stack(); //source
const T = new Stack(); //temp
const D = new Stack(); //destination

const gameColors : string[] = ["#ffff1a", "tomato", "black", "gray", "#800000","blue"];

const rodWidth : number = 150;
const distance : number = 12.5;
let platesHeightStart: number;
let logo: Component;


let myRodes : PlatesHolder[] = [];
let myPlates: Plates[];
let myStacks = [S, T, D];
let poppedItem: number;

/* The canvas has a width of 600px and height400px
	Three rods each having with 150	
	150 + 150 + 150 = 450
	space left = 600 - 450 = 150
	Divide the space 150 / 4 = 37.5
	Blue Print:
	37.5 + 150 + 37.5 + 150 + 37.5 + 150 + 37.5 
*/
class myGameArea{
	public canvas : HTMLCanvasElement;
	public context : CanvasRenderingContext2D | null;
	public interval : number;

	constructor() {
		this.canvas = document.createElement("canvas")
		this.context = this.canvas.getContext("2d");
		this.interval = 0;
	}

	start = () => {
		this.canvas.width = 500;
		this.canvas.height = 400;
		document.body.insertBefore(this.canvas, document.getElementById("btnContainer"));
		this.interval = setInterval(updateGameArea,  20);
		this.canvas.setAttribute("id", "tower");
	}
	clear  = () => {
		if(this.context){
			this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		}
	}
}

const  myGame = new myGameArea()

function startGame() {
    const rod1 : PlatesHolder  = new PlatesHolder(distance); // 37.5 	
    const rod2 : PlatesHolder = new PlatesHolder(distance + rodWidth + distance); //37.5 + 150 + 37.5
	const rod3 : PlatesHolder = new PlatesHolder(
		distance + rodWidth + distance + rodWidth + distance
	); //37.5 + 150 + 37.5 + 150 + 37.5
    myRodes = [rod1, rod2, rod3];
    initialize();
	myGame.start();
	logo = new Component(50, 50, "img/logo.png", 440, 10, "image");

}

function initialize(){
	S.empty(); T.empty(); D.empty();
	myPlates = [];
	steps = 0;

	let  p;
	for(let i = gameLevel; i>= 1; i--){
		S.push(i); 
	}
	//Result:
	// 1
	// 2
	// 3
	//Source
	if(gameLevel === 6){
		platesHeightStart = 300 - 3*15;
	}
	else if(gameLevel === 5){
		platesHeightStart = 300 - 2*15;
	}
	else if(gameLevel === 4){
		platesHeightStart = 300 - 15;
	}
	else if(gameLevel === 3){
		platesHeightStart = 300;
		
	}
	for(let i=1; i<=gameLevel; i++){
		p = new Plates(i, gameColors[i-1]);
		myPlates.push(p);
	}
	// console.log(platesHeightStart);
}

class PlatesHolder{
	public x: number;

	constructor(x:number){
		this.x = x;
	}

    update = () =>{
		let ctx = myGame.context;
		if(ctx){
			ctx.fillStyle = "red";
			ctx.fillRect(this.x, 360, 150, 20); // horizontal rod (x-axis, y-axis, width, height)
			//vertical rod has with 20 and height 200
			// x coordinate of it is 150 / 2  =  75 - 10
			ctx.fillRect(this.x + 65, 160, 20, 200);

		}
    }
}

class Plates{
	public level:number
	public placedOn:number;
	public x: number;
	public y: number;
	public color: string;

	constructor(l:number, color: any) {
		this.level = l;
		this.placedOn = 1; //Every rod is placed on first rot at start of game
		this.y = platesHeightStart + l*15;
		this.color = color
		// this.x; // =  (rodWidth / 2) - (this.level * 12);
	}

	update = () =>{
		let rode :PlatesHolder |undefined = myRodes[this.placedOn-1];
		if(rode){
			this.x =  rode.x + rodWidth/2 - this.level*12 ;
		}
        let ctx = myGame.context;
		if(ctx){
			ctx.fillStyle = this.color;
			ctx.fillRect(this.x , this.y, this.level*24, 15); //(width = 24*, height = 15)
		}
       /* With of each six Plates
			24
			48
			72
			96
			120
			144
		*/
	}
    push = (rod : number) =>{
		let currentStack : Stack |undefined =  myStacks[rod-1]
		let length =0
		if(currentStack){
			length = currentStack.length();
		}
    	this.y = 345;
    	this.y += -1*(15 * length);
    	this.placedOn = rod;
    	this.update(); 
    }
    pop = () => this.y = 100;

}



function print(){
	console.log(S.print());
	console.log(T.print());
	console.log(D.print());
}

const popFrom = (stack : Stack) : void=> {
	console.log("fun: popFrom()");
	poppedItem = stack.pop();
	if(poppedItem-1 >= 0){
		let p: Plates | undefined  = myPlates[poppedItem-1];
		if(p != undefined)
			p.pop();
	}
	pushButton();
print();
}

function pushTo(stack: Stack){
	console.log("fun: pushTo()");
	steps++;
	let i : number | undefined = undefined;
	if(stack === S){
		i = 1;
	}
	else if(stack === T){
		i = 2;
	}
	else if(stack === D){
		i = 3;
	}

	if(stack.isEmpty()){
		//continue push
	}else{
		let topOfStack :number | undefined= stack.peek()
		if(topOfStack){
			if(topOfStack  < poppedItem){
				return
			}
		}
	}
	if(poppedItem-1 >= 0){
		let p: Plates | undefined  = myPlates[poppedItem-1];
		if(p != undefined)
			if(i && i >0){
				p.push(i);
				stack.push(poppedItem);
			}
	}
	popButton();

	console.log("PushTo\n");print();
}

function pushButton(){
	let popButtons : HTMLElement | null = document.getElementById("btnPop");
	let pushButtons : HTMLElement | null = document.getElementById("btnPush");

	if(popButtons)
		popButtons.style.display = "none";
	if(pushButtons)
		pushButtons.style.display = "block";
}

function popButton(){
	let popButtons : HTMLElement | null = document.getElementById("btnPop");
	let pushButtons : HTMLElement | null = document.getElementById("btnPush");

	if(popButtons)
	popButtons.style.display = "block";
	if(pushButtons)
		pushButtons.style.display = "none";
}


class Component{
	public width:number
	public height:number
	public color:string
	public speedX:number
	public speedY:number
	public x:number
	public y:number
	public type:string
	public image: HTMLImageElement;

	constructor(width: number, height:number, color:string, x:number, y:number, type:string) {
		this.type = type;
		this.width = width;
		this.height = height;
		this.x = x;
		this.y = y;
		this.speedX = 0;
		this.speedY = 0;

		if (type == "image") {
			this.image = new Image();
			this.image.src = color;
		}

	}

   update = () => {
		let ctx = myGame.context;
		if(ctx){
			if (this.type == "image") {
				ctx.drawImage(this.image,
					this.x,
					this.y,
					this.width, this.height);
			} else {
				ctx.fillStyle = this.color;
				ctx.fillRect(this.x, this.y, this.width, this.height);
			}
		}

    }
    newPos = () => {
        this.x += this.speedX;
        this.y += this.speedY;
    }
}

function checkIfWin() {
    if (S.isEmpty() && T.isEmpty() && D.length() === gameLevel) {
	if (gameLevel == 6) {
	    window.location.replace("/");
	    return;
	}
	console.log("You Win!");
	setTimeout(wait10ms, 100)
	gameLevel++;
	initialize();
	return true;
    }
    return false;
}

function wait10ms() {
    window.alert("You Win proceeding to level " + (gameLevel - 2))
}
function updateGameArea() {
    myGame.clear();
	for (let i : number = 0;  i< myRodes.length; i++ ){
		let rode = myRodes[i];
		if(rode)
			rode.update()
	}
    for(let i=0; i<gameLevel; i++){
		let plate: Plates | undefined = myPlates[i];
		if(plate)
			plate.update();
    }
	logo.update();
	let canvasCoordinates  = this.myGame.canvas.getBoundingClientRect();
	const btnContainer : HTMLDivElement | null =  document.querySelector(".btnContainer");
	if(btnContainer && canvasCoordinates.x >= 0 ){
		btnContainer.style.left = canvasCoordinates.x + "px";
	} 
	if(btnContainer && canvasCoordinates.y >= 140 ){
		btnContainer.style.top = canvasCoordinates.y + "px";
	}
	checkIfWin();
}


