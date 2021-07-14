"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                  ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
exports.__esModule = true;
exports.ConfirmReservationPage = void 0;
var react_1 = require("react");
require("./ConfirmReservationPage.scss");
var AdditionalRestaurantInfo_1 = require("./localComponents/AdditionalRestaurantInfo/AdditionalRestaurantInfo");
var Entities_1 = require("../../../core/Entities");
var ConfirmReservationHooks_1 = require("../../../InterfaceFunctions/PagesFunctions/ConfirmReservationPageFunctions/ConfirmReservationHooks");
var ConfirmReservationFunctions_1 = require("../../../InterfaceFunctions/PagesFunctions/ConfirmReservationPageFunctions/ConfirmReservationFunctions");
var ConfirmationForm_1 = require("./localComponents/ConfirmationForm/ConfirmationForm");
var RoPNameAndBookTimeInfo_1 = require("./localComponents/RoPNameAndBookTimeInfo/RoPNameAndBookTimeInfo");
var ConfirmationModal_1 = require("./localComponents/ConfirmationModal/ConfirmationModal");
var Loader_1 = require("../../components/Loader/Loader");
var GA_1 = require("../../../data/trackers/GA");
var GAevent_1 = require("../../../core/Interfaces/GAevent");
function ConfirmReservationPage() {
  var _this = this;
  var _a = react_1.useState(false),
    modalOpen = _a[0],
    setModalOpen = _a[1];
  var _b = react_1.useState(false),
    confirmationSuccess = _b[0],
    setConfirmationSuccess = _b[1];
  var _c = ConfirmReservationHooks_1.useConfirmPageSearchQueriesAndState(),
    minute = _c.minute,
    hour = _c.hour,
    day = _c.day,
    month = _c.month,
    year = _c.year,
    people = _c.people,
    state = _c.state,
    name = _c.name;
  //Creating bookTime object out of search query data
  var bookTime = new Entities_1.BookTime(
    +minute,
    +hour,
    +day,
    +month,
    +year,
    +people
  );
  //Repository with all functions for this component
  var confirmReservationFunctions = new ConfirmReservationFunctions_1[
    "default"
  ](bookTime);
  //Input use state hooks
  var InputObject = ConfirmReservationHooks_1.useInput(state);
  var onConfirm = function (event) {
    return __awaiter(_this, void 0, void 0, function () {
      var response;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            event.preventDefault();
            return [
              4 /*yield*/,
              confirmReservationFunctions.onClickConfirmReservation(
                name,
                InputObject
              ),
            ];
          case 1:
            response = _a.sent();
            if (response.data === "Success") {
              setConfirmationSuccess(true);
            }
            setModalOpen(true);
            GA_1["default"].trackEvent({
              category: GAevent_1.Category.RESERVATION,
              action: GAevent_1.Action.SAVED_RESERVATION,
            });
            return [2 /*return*/];
        }
      });
    });
  };
  //Function runs only on component initial render
  react_1.useEffect(function () {
    confirmReservationFunctions.callsApiIfItDoesntHavePassedData(
      state,
      name,
      InputObject.setLocationState
    );
  }, []);
  if (InputObject.locationState) {
    return react_1["default"].createElement(
      react_1["default"].Fragment,
      null,
      react_1["default"].createElement(
        "main",
        { className: "main-container" },
        react_1["default"].createElement(
          "div",
          { className: "reservation-container" },
          react_1["default"].createElement(
            "header",
            { className: "image-and-restaurant-info" },
            react_1["default"].createElement(RoPImage, {
              inputObject: InputObject,
            }),
            react_1["default"].createElement(
              RoPNameAndBookTimeInfo_1.RoPNameAndBookTimeInfo,
              {
                name: name.toString(),
                confirmReservationFunctions: confirmReservationFunctions,
              }
            )
          ),
          react_1["default"].createElement(
            ConfirmationForm_1.ConfirmationForm,
            { inputObject: InputObject, onSubmit: onConfirm }
          )
        ),
        react_1["default"].createElement(
          AdditionalRestaurantInfo_1.AdditionalRestaurantInfo,
          null
        )
      ),
      react_1["default"].createElement(ConfirmationModal_1.ConfirmationModal, {
        open: modalOpen,
        success: confirmationSuccess,
        onClose: function () {
          return setModalOpen(false);
        },
      })
    );
  }
  return react_1["default"].createElement(Loader_1.Loader, null);
}
exports.ConfirmReservationPage = ConfirmReservationPage;
//Place image
var RoPImage = function (_a) {
  var inputObject = _a.inputObject;
  var locationState = inputObject.locationState;
  return react_1["default"].createElement("img", {
    className: "restaurant-image",
    alt: "retaurant",
    src: locationState.image || locationState.restaurantOrPub.image,
  });
};
