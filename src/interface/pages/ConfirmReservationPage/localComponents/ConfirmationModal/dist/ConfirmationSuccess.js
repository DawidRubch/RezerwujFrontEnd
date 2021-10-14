"use strict";
exports.__esModule = true;
exports.ConfirmationSuccess = void 0;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var check_circle_svg_1 = require("../../../../../images/check-circle.svg");
require("./Confirmation.scss");
exports.ConfirmationSuccess = function () {
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("div", { className: "modalIconContainer" },
            react_1["default"].createElement(check_circle_svg_1.ReactComponent, { className: "modalIconContainer__Icon" })),
        react_1["default"].createElement("div", { className: "modalContent" },
            react_1["default"].createElement("h6", { className: "modalContent__mainText modalContent__mainText_success" }, "Dzi\u0119kujemy!"),
            react_1["default"].createElement("p", { className: "modalContent__text" },
                "Wys\u0142ali\u015Bmy zapytanie do restauracji. ",
                react_1["default"].createElement("br", null),
                " Prosz\u0119 oczekiwa\u0107 SMS z potwierdzeniem."),
            react_1["default"].createElement("span", { className: "modalContent__redirectLabel" },
                "Powr\u00F3t do",
                react_1["default"].createElement(react_router_dom_1.Link, { className: "modalContent__redirectLink", to: "/" }, "strony g\u0142\u00F3wnej.")))));
};
