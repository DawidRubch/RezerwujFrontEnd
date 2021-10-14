"use strict";
exports.__esModule = true;
exports.RestaurantDescriptionError = void 0;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var error_svg_1 = require("images/error.svg");
require("./RestaurantDescriptionError.scss");
function RestaurantDescriptionError() {
    return (react_1["default"].createElement("div", { className: "restaurantDescriptionError" },
        react_1["default"].createElement("div", { className: "restaurantDescriptionError__imageContainer" },
            react_1["default"].createElement(error_svg_1.ReactComponent, { className: "restaurantDescriptionError__imageContainer__img" })),
        react_1["default"].createElement("p", { className: "restaurantDescriptionError__message" },
            "Przepraszamy, co\u015B posz\u0142o nie tak!",
            react_1["default"].createElement("br", null),
            "Wr\u00F3\u0107 do",
            react_1["default"].createElement(react_router_dom_1.Link, { className: "restaurantDescriptionError__message_link", to: "/" }, "strony g\u0142\u00F3wnej"),
            "i spr\u00F3buj jeszcze raz!")));
}
exports.RestaurantDescriptionError = RestaurantDescriptionError;
