var Stack = /** @class */ (function () {
    function Stack() {
        this.A = [];
        this.tos = 0;
    }
    Stack.prototype.isEmpty = function () {
        return !this.tos;
    };
    Stack.prototype.empty = function () {
        for (var i = 0; i < this.tos; i++) {
            delete this.A[i];
        }
        this.tos = 0;
    };
    Stack.prototype.push = function (item) {
        this.A[this.tos++] = item;
    };
    Stack.prototype.pop = function () {
        return this.A[--this.tos];
    };
    Stack.prototype.peek = function () {
        return this.A[this.tos - 1];
    };
    Stack.prototype.length = function () {
        return this.tos;
    };
    Stack.prototype.print = function () {
        var str = "";
        for (var i = this.tos - 1; i >= 0; i--) {
            str += this.A[i] + "\n";
        }
        return str;
    };
    return Stack;
}());
