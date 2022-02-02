"use strict";
exports.__esModule = true;
exports.RestaurantPubComponent = void 0;
var components_1 = require("interface/components");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var hooks_1 = require("hooks");
var routes_1 = require("routes");
require("./RestaurantPubComponent.scss");
var core_1 = require("core");
function RestaurantPubComponent(_a) {
    var restaurantPubArr = _a.restaurantPubArr;
    var _b = hooks_1.useSearchQuery(), hour = _b.hour, people = _b.people, dateString = _b.dateString, name = _b.name;
    var BasicInfo = function (_a) {
        var RoP = _a.RoP, platform = _a.platform;
        return (react_1["default"].createElement("div", { className: "restaurantComponent__basicInfo_" + platform },
            react_1["default"].createElement(LinkComponent, { RoP: RoP }),
            react_1["default"].createElement("div", { className: "restaurantComponent__type" }, RoP.type)));
    };
    var LinkComponent = react_1.useCallback(function (_a) {
        var RoP = _a.RoP;
        var searchQObject = { dateString: dateString, hour: hour, people: people, name: RoP.name };
        var search = core_1.generateSearchQueryFromObject(searchQObject);
        return (react_1["default"].createElement(react_router_dom_1.Link, { className: "restaurantComponent__link", to: {
                pathname: routes_1.Routes.RESTAURANT_INFO,
                state: {
                    from: routes_1.Routes.RESTAURANTS_ARRAY,
                    RoP: RoP
                },
                search: search
            } },
            react_1["default"].createElement("b", { className: "restaurantComponent__link__name" }, RoP.name)));
    }, [dateString, hour, people, name]);
    return (react_1["default"].createElement("main", { className: "restaurantArray" }, restaurantPubArr === null || restaurantPubArr === void 0 ? void 0 : restaurantPubArr.map(function (RoP, index) { return (react_1["default"].createElement("div", { className: "restaurantComponentWraper", key: index },
        react_1["default"].createElement("div", { className: "restaurantComponent" },
            react_1["default"].createElement(BasicInfo, { platform: "mobile", RoP: RoP }),
            react_1["default"].createElement("img", { className: "restaurantComponent__img", alt: "Restaurant", src: RoP.image }),
            react_1["default"].createElement("div", { className: "restaurantComponent__additionalInfo" },
                react_1["default"].createElement(BasicInfo, { platform: "pc", RoP: RoP }),
                react_1["default"].createElement(TagsArray, { RoPTags: RoP.tags }),
                react_1["default"].createElement(components_1.BookingHoursComponent, { restaurantOrPub: RoP, type: "pc", alternativeBookingHours: RoP.alternativeBookingHours }))),
        react_1["default"].createElement("hr", { className: "restaurantComponentWraper__hr" }))); })));
}
exports.RestaurantPubComponent = RestaurantPubComponent;
var TagsArray = function (_a) {
    var RoPTags = _a.RoPTags;
    return (react_1["default"].createElement("div", { className: "restaurantComponent__additionalInfo__tagContainer" }, RoPTags.map(function (tag, index) { return (react_1["default"].createElement("span", { key: index, className: "restaurantComponent__additionalInfo__tagContainer__tag" }, tag)); })));
};
