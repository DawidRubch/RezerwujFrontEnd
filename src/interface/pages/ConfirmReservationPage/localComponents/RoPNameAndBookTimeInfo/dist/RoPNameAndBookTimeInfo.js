"use strict";
exports.__esModule = true;
exports.RoPNameAndBookTimeInfo = void 0;
var react_1 = require("react");
require("./RoPNameAndBookTimeInfo.scss");
var SmallBookingInfo_1 = require("../SmallBookingInfo/SmallBookingInfo");
var calendar_svg_1 = require("images/calendar.svg");
var group_svg_1 = require("images/group.svg");
var clock_svg_1 = require("images/clock.svg");
var core_1 = require("core");
exports.RoPNameAndBookTimeInfo = function (_a) {
    var name = _a.name, dateString = _a.dateString, hour = _a.hour, people = _a.people;
    return (react_1["default"].createElement("div", { className: "restaurantDetails" },
        react_1["default"].createElement("b", { className: "restaurantDetails__name" }, name),
        react_1["default"].createElement("div", { className: "restaurantDetails__info" },
            react_1["default"].createElement(SmallBookingInfo_1.SmallBookingInfo, { insideText: dateString, icon: react_1["default"].createElement("img", { className: "restaurantDetails__info__icon", src: calendar_svg_1["default"], alt: "calendar-icon" }) }),
            react_1["default"].createElement(SmallBookingInfo_1.SmallBookingInfo, { insideText: "" + hour, icon: react_1["default"].createElement("img", { className: "restaurantDetails__info__icon", src: clock_svg_1["default"], alt: "clock-icon" }) }),
            react_1["default"].createElement(SmallBookingInfo_1.SmallBookingInfo, { insideText: people + " " + core_1.PERSON_CONJUCTED_POLISH[+people], icon: react_1["default"].createElement("img", { className: "restaurantDetails__info__icon", src: group_svg_1["default"], alt: "people-icon" }) }))));
};
