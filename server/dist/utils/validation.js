"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePasswordLength = exports.validatePhoneNumber = void 0;
function validatePhoneNumber(phoneNumber) {
    if (new RegExp("\\+62[0-9]+|0[0-9]+").test(phoneNumber)) {
        return [{
                field: "phoneNumber",
                message: "invalid phone number",
            }];
    }
    return null;
}
exports.validatePhoneNumber = validatePhoneNumber;
function validatePasswordLength(password, field) {
    if (password.length <= 3) {
        return [{
                field: field,
                message: "length must be greater than 3!"
            }];
    }
    return null;
}
exports.validatePasswordLength = validatePasswordLength;
//# sourceMappingURL=validation.js.map