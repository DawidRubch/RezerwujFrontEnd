"use strict";
exports.__esModule = true;
exports.SearchBar = void 0;
var react_1 = require("react");
var arrowDown_svg_1 = require("images/arrowDown.svg");
require("./SearchBar.scss");
var components_1 = require("interface/components");
function SearchBar(_a) {
    var getRoPArr = _a.getRoPArr;
    return (react_1["default"].createElement("aside", { className: "searchbar" },
        react_1["default"].createElement("ul", { className: "searchbar__list" },
            react_1["default"].createElement("li", { className: "searchbar__list__input" },
                react_1["default"].createElement(components_1.ReactCalendar, null)),
            react_1["default"].createElement("li", { className: "searchbar__list__input" },
                react_1["default"].createElement(components_1.PeopleAmountPicker, null)),
            react_1["default"].createElement("li", { className: "searchbar__list__input" },
                react_1["default"].createElement(components_1.TimePicker, null)),
            react_1["default"].createElement("li", { className: "searchbar__list__search" },
                react_1["default"].createElement(components_1.SearchButton, { onPressed: getRoPArr, additionalClassName: "searchbar__list__search__button" }))),
        react_1["default"].createElement("label", { className: "searchbar__iconContainer", htmlFor: "check" },
            react_1["default"].createElement(arrowDown_svg_1.ReactComponent, { className: "searchbar__iconContainer__icon" }))));
}
exports.SearchBar = SearchBar;
