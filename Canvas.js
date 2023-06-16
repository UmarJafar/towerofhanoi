var Stack = /** @class */ (function () {
    function Stack() {
        var _this = this;
        this.isEmpty = function () { return !_this.tos; };
        this.empty = function () {
            for (var i = 0; i < _this.tos; i++) {
                delete _this.A[i];
            }
            _this.tos = 0;
        };
        this.push = function (item) {
            _this.A[_this.tos++] = item;
        };
        // pop = (): number => this.A[--this.tos];
        this.pop = function () {
            if (_this.isEmpty()) {
                return 0; // Return null when the stack is empty
            }
            return _this.A[--_this.tos];
        };
        this.peek = function () {
            if (_this.isEmpty()) {
                return undefined; // Return null when the stack is empty
            }
            return _this.A[_this.tos - 1];
        };
        this.length = function () { return _this.tos; };
        this.print = function () {
            var str = "";
            for (var i = _this.tos - 1; i >= 0; i--) {
                str += _this.A[i] + "\n";
            }
            return str;
        };
        this.A = [];
        this.tos = 0;
    }
    return Stack;
}());
var gameLevel = 3;
var steps = 0;
var S = new Stack(); //source
var T = new Stack(); //temp
var D = new Stack(); //destination
var gameColors = ["#ffff1a", "tomato", "black", "gray", "#800000", "blue"];
var rodWidth = 150;
var distance = 12.5;
var platesHeightStart;
var logo;
var myRodes = [];
var myPlates;
var myStacks = [S, T, D];
var poppedItem;
/* The canvas has a width of 600px and height400px
    Three rods each having with 150
    150 + 150 + 150 = 450
    space left = 600 - 450 = 150
    Divide the space 150 / 4 = 37.5
    Blue Print:
    37.5 + 150 + 37.5 + 150 + 37.5 + 150 + 37.5
*/
var myGameArea = /** @class */ (function () {
    function myGameArea() {
        var _this = this;
        this.start = function () {
            _this.canvas.width = 500;
            _this.canvas.height = 400;
            document.body.insertBefore(_this.canvas, document.getElementById("btnContainer"));
            _this.interval = setInterval(updateGameArea, 20);
            _this.canvas.setAttribute("id", "tower");
        };
        this.clear = function () {
            if (_this.context) {
                _this.context.clearRect(0, 0, _this.canvas.width, _this.canvas.height);
            }
        };
        this.canvas = document.createElement("canvas");
        this.context = this.canvas.getContext("2d");
        this.interval = 0;
    }
    return myGameArea;
}());
var myGame = new myGameArea();
function startGame() {
    var rod1 = new PlatesHolder(distance); // 37.5 	
    var rod2 = new PlatesHolder(distance + rodWidth + distance); //37.5 + 150 + 37.5
    var rod3 = new PlatesHolder(distance + rodWidth + distance + rodWidth + distance); //37.5 + 150 + 37.5 + 150 + 37.5
    myRodes = [rod1, rod2, rod3];
    initialize();
    myGame.start();
    logo = new Component(50, 50, "img/logo.png", 440, 10, "image");
}
function initialize() {
    S.empty();
    T.empty();
    D.empty();
    myPlates = [];
    steps = 0;
    var p;
    for (var i = gameLevel; i >= 1; i--) {
        S.push(i);
    }
    //Result:
    // 1
    // 2
    // 3
    //Source
    if (gameLevel === 6) {
        platesHeightStart = 300 - 3 * 15;
    }
    else if (gameLevel === 5) {
        platesHeightStart = 300 - 2 * 15;
    }
    else if (gameLevel === 4) {
        platesHeightStart = 300 - 15;
    }
    else if (gameLevel === 3) {
        platesHeightStart = 300;
    }
    for (var i = 1; i <= gameLevel; i++) {
        p = new Plates(i, gameColors[i - 1]);
        myPlates.push(p);
    }
    // console.log(platesHeightStart);
}
var PlatesHolder = /** @class */ (function () {
    function PlatesHolder(x) {
        var _this = this;
        this.update = function () {
            var ctx = myGame.context;
            if (ctx) {
                ctx.fillStyle = "red";
                ctx.fillRect(_this.x, 360, 150, 20); // horizontal rod (x-axis, y-axis, width, height)
                //vertical rod has with 20 and height 200
                // x coordinate of it is 150 / 2  =  75 - 10
                ctx.fillRect(_this.x + 65, 160, 20, 200);
            }
        };
        this.x = x;
    }
    return PlatesHolder;
}());
var Plates = /** @class */ (function () {
    function Plates(l, color) {
        var _this = this;
        this.update = function () {
            var rode = myRodes[_this.placedOn - 1];
            if (rode) {
                _this.x = rode.x + rodWidth / 2 - _this.level * 12;
            }
            var ctx = myGame.context;
            if (ctx) {
                ctx.fillStyle = _this.color;
                ctx.fillRect(_this.x, _this.y, _this.level * 24, 15); //(width = 24*, height = 15)
            }
            /* With of each six Plates
                 24
                 48
                 72
                 96
                 120
                 144
             */
        };
        this.push = function (rod) {
            var currentStack = myStacks[rod - 1];
            var length = 0;
            if (currentStack) {
                length = currentStack.length();
            }
            _this.y = 345;
            _this.y += -1 * (15 * length);
            _this.placedOn = rod;
            _this.update();
        };
        this.pop = function () { return _this.y = 100; };
        this.level = l;
        this.placedOn = 1; //Every rod is placed on first rot at start of game
        this.y = platesHeightStart + l * 15;
        this.color = color;
        // this.x; // =  (rodWidth / 2) - (this.level * 12);
    }
    return Plates;
}());
function print() {
    console.log(S.print());
    console.log(T.print());
    console.log(D.print());
}
var popFrom = function (stack) {
    console.log("fun: popFrom()");
    poppedItem = stack.pop();
    if (poppedItem - 1 >= 0) {
        var p = myPlates[poppedItem - 1];
        if (p != undefined)
            p.pop();
    }
    pushButton();
    print();
};
function pushTo(stack) {
    console.log("fun: pushTo()");
    steps++;
    var i = undefined;
    if (stack === S) {
        i = 1;
    }
    else if (stack === T) {
        i = 2;
    }
    else if (stack === D) {
        i = 3;
    }
    if (stack.isEmpty()) {
        //continue push
    }
    else {
        var topOfStack = stack.peek();
        if (topOfStack) {
            if (topOfStack < poppedItem) {
                return;
            }
        }
    }
    if (poppedItem - 1 >= 0) {
        var p = myPlates[poppedItem - 1];
        if (p != undefined)
            if (i && i > 0) {
                p.push(i);
                stack.push(poppedItem);
            }
    }
    popButton();
    console.log("PushTo\n");
    print();
}
function pushButton() {
    var popButtons = document.getElementById("btnPop");
    var pushButtons = document.getElementById("btnPush");
    if (popButtons)
        popButtons.style.display = "none";
    if (pushButtons)
        pushButtons.style.display = "block";
}
function popButton() {
    var popButtons = document.getElementById("btnPop");
    var pushButtons = document.getElementById("btnPush");
    if (popButtons)
        popButtons.style.display = "block";
    if (pushButtons)
        pushButtons.style.display = "none";
}
var Component = /** @class */ (function () {
    function Component(width, height, color, x, y, type) {
        var _this = this;
        this.update = function () {
            var ctx = myGame.context;
            if (ctx) {
                if (_this.type == "image") {
                    ctx.drawImage(_this.image, _this.x, _this.y, _this.width, _this.height);
                }
                else {
                    ctx.fillStyle = _this.color;
                    ctx.fillRect(_this.x, _this.y, _this.width, _this.height);
                }
            }
        };
        this.newPos = function () {
            _this.x += _this.speedX;
            _this.y += _this.speedY;
        };
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
    return Component;
}());
function checkIfWin() {
    if (S.isEmpty() && T.isEmpty() && D.length() === gameLevel) {
        if (gameLevel == 6) {
            window.location.replace("/");
            return;
        }
        console.log("You Win!");
        setTimeout(wait10ms, 100);
        gameLevel++;
        initialize();
        return true;
    }
    return false;
}
function wait10ms() {
    window.alert("You Win proceeding to level " + (gameLevel - 2));
}
function updateGameArea() {
    myGame.clear();
    for (var i = 0; i < myRodes.length; i++) {
        var rode = myRodes[i];
        if (rode)
            rode.update();
    }
    for (var i = 0; i < gameLevel; i++) {
        var plate = myPlates[i];
        if (plate)
            plate.update();
    }
    logo.update();
    var canvasCoordinates = this.myGame.canvas.getBoundingClientRect();
    var btnContainer = document.querySelector(".btnContainer");
    if (btnContainer && canvasCoordinates.x >= 0) {
        btnContainer.style.left = canvasCoordinates.x + "px";
    }
    if (btnContainer && canvasCoordinates.y >= 140) {
        btnContainer.style.top = canvasCoordinates.y + "px";
    }
    checkIfWin();
}
// const foo =(bar: unknown): void  =>{
// 	if(typeof bar === 'number' ){
// 		// let x : string = bar.toUpperCase();
// 		let x : number = bar++;
// 		console.log(x)
// 	}
// 	if(typeof bar === 'string' ){
// 		// let x : number = bar++;
// 		let x : string = bar.toUpperCase();
// 		console.log(x)
// 	}
// }
//
// foo(4)
// foo("ratingStats")
