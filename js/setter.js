"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.transform = exports.makeSetters = void 0;
function makeSetters(target) {
    return function (prop) {
        return {
            to: function (value) {
                var _a;
                return (__assign(__assign({}, target), (_a = {}, _a[prop] = value, _a)));
            },
            set: function (prop2) { return transform(makeSetters(target[prop])(prop2), target, prop); }
        };
    };
}
exports.makeSetters = makeSetters;
function transform(s, target, prop) {
    var to = function (c) {
        var _a;
        return (__assign(__assign({}, target), (_a = {}, _a[prop] = s.to(c), _a)));
    };
    return {
        to: to,
        set: function (c) { return transform(s.set(c), target, prop); }
    };
}
exports.transform = transform;
