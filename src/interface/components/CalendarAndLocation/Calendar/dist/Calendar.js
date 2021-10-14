"use strict";
exports.__esModule = true;
exports.ReactCalendar = void 0;
var react_1 = require("react");
var react_calendar_1 = require("react-calendar");
var moment_1 = require("moment");
var react_transition_group_1 = require("react-transition-group");
var calendar_svg_1 = require("../../../../images/calendar.svg");
var arrowDown_svg_1 = require("../../../../images/arrowDown.svg");
require("./Calendar.scss");
var CalendarLocationContainer_1 = require("../CalendarLocationContainer/CalendarLocationContainer");
var react_2 = require("react");
var hooks_1 = require("hooks");
var core_1 = require("core");
var data_1 = require("data");
exports.ReactCalendar = function (_a) {
    var onChange = _a.onChange;
    //Boolean value to show Calendar
    var _b = react_1.useState(false), showCalendar = _b[0], setShowCalendar = _b[1];
    var dateString = hooks_1.useSearchQuery().dateString;
    var date = react_1.useMemo(function () { return core_1.getDateFromDateString(dateString); }, [dateString]);
    var updateSearchParams = hooks_1.useUpdateSearchQuery();
    //Function changin boolean val of showCalendar
    var hideOrShowCalendar = react_2.useCallback(function () { return setShowCalendar(!showCalendar); }, [showCalendar]);
    //What shows on top of the calendar
    var navigationLabel = function (navigation) { return navigation.label.charAt(0).toUpperCase() + navigation.label.slice(1); };
    //Function executes when the date in Calendar is changed
    var onChangeDate = function (date) {
        //onChange is used in RestaurantDescriptionPage
        //It informs the component that it should be updated
        //@todo refactor this "onChange"
        if (onChange)
            onChange();
        updateSearchParams({ dateString: core_1.getDateStringFromDate(date) });
        data_1.trackEvent({ category: GaCategory.PARAMETER_CHOICE, action: Action.DATE });
    };
    //Calendar style is used here, due to dynamic value showCalendar
    var calendarLocationContainerStyle = {
        borderRadius: showCalendar ? "8px 8px 0 0" : "8px"
    };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(CalendarLocationContainer_1["default"], { styling: calendarLocationContainerStyle, className: "menu-item calendar", leadingIcon: react_1["default"].createElement("img", { alt: "calendar icon", src: calendar_svg_1["default"] }), onClick: hideOrShowCalendar },
            react_1["default"].createElement("div", { className: "menu-item__text" }, date.toLocaleDateString()),
            react_1["default"].createElement("span", { className: "menu-item__right" },
                react_1["default"].createElement("img", { alt: "menu-item__arrow", src: arrowDown_svg_1["default"] }))),
        react_1["default"].createElement("div", { className: "absoluteContainer" },
            react_1["default"].createElement(react_transition_group_1.CSSTransition, { "in": showCalendar, unmountOnExit: true, timeout: 100 },
                react_1["default"].createElement(react_calendar_1["default"], { onClickDay: hideOrShowCalendar, navigationLabel: navigationLabel, defaultView: "month", view: "month", minDate: new Date(), maxDate: moment_1["default"]().add(21, "days").toDate(), next2Label: null, prev2Label: null, locale: "pl", onChange: onChangeDate, minDetail: "month", value: date })))));
};
