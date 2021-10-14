"use strict";
exports.__esModule = true;
exports.RestaurantDescriptionContainer = void 0;
var react_1 = require("react");
var restaurant_menu_svg_1 = require("images/restaurant-menu.svg");
require("./RestaurantDescriptionContainer.scss");
function RestaurantDescriptionContainer(_a) {
    var information = _a.information, mobileBookingComponent = _a.mobileBookingComponent;
    //Mapping place tags to JSX components
    var placeTagsMappingToJSXComponents = information === null || information === void 0 ? void 0 : information.tags.map(function (tag, index) { return (react_1["default"].createElement("div", { className: "restaurantDescription__tags__tag", key: index }, tag)); });
    return (react_1["default"].createElement("section", { className: "restaurantDescription" },
        react_1["default"].createElement("h1", { className: "restaurantDescription__name" }, information === null || information === void 0 ? void 0 : information.name),
        react_1["default"].createElement("h6", { className: "restaurantDescription__type" }, information === null || information === void 0 ? void 0 : information.type),
        react_1["default"].createElement("div", { className: "restaurantDescription__tags" }, placeTagsMappingToJSXComponents),
        react_1["default"].createElement("hr", { className: "restaurantDescription__hr" }),
        react_1["default"].createElement("div", { className: "restaurantDescription__bookingContainer_mobile" }, mobileBookingComponent),
        react_1["default"].createElement("p", { className: "restaurantDescription__descriptionText" }, information === null || information === void 0 ? void 0 : information.shortDescription),
        react_1["default"].createElement("hr", { className: "restaurantDescription__hr" }),
        react_1["default"].createElement("div", { className: "restaurantDescription__linkContainer" },
            react_1["default"].createElement("a", { className: "restaurantDescription__linkContainer__link", href: "/" },
                "Zobacz menu restauracji",
                react_1["default"].createElement("div", { className: "restaurantDescription__linkContainer__link__iconContainer" },
                    react_1["default"].createElement(restaurant_menu_svg_1.ReactComponent, { className: "restaurantDescription__linkContainer__link__iconContainer__icon" }))))));
}
exports.RestaurantDescriptionContainer = RestaurantDescriptionContainer;
