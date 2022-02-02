"use strict";
exports.__esModule = true;
exports.BookingContainer = void 0;
var react_1 = require("react");
var core_1 = require("core");
var components_1 = require("../../../../components");
require("./BookingContainer.scss");
var BookingHoursArr_1 = require("../../../../components/BookingHoursArray/BookingHoursArr");
var hooks_1 = require("hooks");
var index_1 = require("domain/index");
var restaurantOrPubRepository = new index_1.RestaurantOrPubRepository();
function BookingContainer(_a) {
    var alternativeBookingHours = _a.alternativeBookingHours, state = _a.state;
    //useState Hooks
    var _b = react_1.useState(false), reloadBookingArr = _b[0], setReloadBookingArr = _b[1];
    var _c = react_1.useState(alternativeBookingHours), altBookTimes = _c[0], setAltBookTimes = _c[1];
    var _d = hooks_1.useSearchQuery(), bookTime = _d.bookTime, name = _d.name;
    //get alt booking hours for new alt booking hours
    var getNewAltBookingHours = function () {
        var _a;
        setReloadBookingArr(!reloadBookingArr);
        restaurantOrPubRepository
            .getRoPAlternativeBookingHours((_a = name === null || name === void 0 ? void 0 : name.toString()) !== null && _a !== void 0 ? _a : "", bookTime)
            .then(function (res) {
            var bookTimesMapped = res.map(function (bt) { return core_1.bookTimeFromJson(bt); });
            setAltBookTimes(bookTimesMapped);
        });
    };
    var onChange = function () { return setReloadBookingArr(true); };
    return (react_1["default"].createElement("div", { className: "placeOrder" },
        react_1["default"].createElement("div", { className: "placeOrder__header" },
            react_1["default"].createElement("b", { className: "placeOrder__header__label" },
                "Z\u0142\u00F3\u017C rezerwacj\u0119 w ",
                name)),
        react_1["default"].createElement("div", { className: "placeOrder__innerContainer" },
            react_1["default"].createElement("div", { className: "placeOrder__innerContainer__param" },
                react_1["default"].createElement("b", { className: "placeOrder__innerContainer__param__label" }, "Data")),
            react_1["default"].createElement("div", { className: "placeOrder__innerContainer__inputContainer" },
                react_1["default"].createElement(components_1.ReactCalendar, { onChange: onChange })),
            react_1["default"].createElement("div", { className: "placeOrder__innerContainer__param" },
                react_1["default"].createElement("b", { className: "placeOrder__innerContainer__param__label" }, "Godzina")),
            react_1["default"].createElement("div", { className: "placeOrder__innerContainer__inputContainer" },
                react_1["default"].createElement(components_1.TimePicker, { onChange: onChange })),
            react_1["default"].createElement("div", { className: "placeOrder__innerContainer__param" },
                react_1["default"].createElement("b", { className: "placeOrder__innerContainer__param__label" }, "Ilo\u015B\u0107 os\u00F3b")),
            react_1["default"].createElement("div", { className: "placeOrder__innerContainer__inputContainer" },
                react_1["default"].createElement(components_1.PeopleAmountPicker, { onChange: onChange })),
            react_1["default"].createElement("div", { className: "placeOrder__innerContainer__bookingHours" }, reloadBookingArr ? (react_1["default"].createElement("button", { className: "placeOrder__innerContainer__bookingHours__reloadButton", onClick: getNewAltBookingHours }, "Od\u015Bwie\u017C")) : (react_1["default"].createElement(BookingHoursArr_1.BookingHoursComponent, { restaurantOrPub: state, type: "universal", alternativeBookingHours: altBookTimes }))))));
}
exports.BookingContainer = BookingContainer;
