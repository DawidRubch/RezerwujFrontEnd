"use strict";
exports.__esModule = true;
exports.ConfirmationError = void 0;
var react_1 = require("react");
var alert_circle_svg_1 = require("../../../../../images/alert-circle.svg");
require("./Confirmation.scss");
exports.ConfirmationError = function (_a) {
    var onClose = _a.onClose;
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("div", { className: "modalIconContainer" },
            react_1["default"].createElement(alert_circle_svg_1.ReactComponent, { className: "modalIconContainer__Icon" })),
        react_1["default"].createElement("div", { className: "modalContent" },
            react_1["default"].createElement("h6", { className: "modalContent__mainText modalContent__mainText_err" }, "Ups! Co\u015B posz\u0142o nie tak!"),
            react_1["default"].createElement("p", { className: "modalContent__text" }, "Nie uda\u0142o si\u0119 potwierdzi\u0107 twojej rezerwacji. Sprawd\u017A swoje po\u0142\u0105czenie internetowe i spr\u00F3buj ponownie."),
            react_1["default"].createElement("button", { className: "modalContent__button", onClick: function () { return onClose(); } }, "OK"))));
};
