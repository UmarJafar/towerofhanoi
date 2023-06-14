"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
                return 0; // Return null when the stack is empty
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
exports.default = Stack;
