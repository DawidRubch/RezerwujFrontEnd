"use strict";
exports.__esModule = true;
exports.ConfirmationModal = void 0;
var react_1 = require("react");
var ConfirmationSuccess_1 = require("./ConfirmationSuccess");
var ConfirmationError_1 = require("./ConfirmationError");
require("./ConfirmationModal.scss");
exports.ConfirmationModal = function (_a) {
    var open = _a.open, success = _a.success, onClose = _a.onClose;
    return (react_1["default"].createElement("aside", { className: open ? "modalBackgroundOverlay" : "modalHidden" },
        react_1["default"].createElement("div", { className: "modalContainer" }, success ? (react_1["default"].createElement(ConfirmationSuccess_1.ConfirmationSuccess, null)) : (react_1["default"].createElement(ConfirmationError_1.ConfirmationError, { onClose: onClose })))));
};
