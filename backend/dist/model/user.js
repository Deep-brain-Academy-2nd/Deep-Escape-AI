"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
// 유저 스키마
const schema = new mongoose_1.Schema({
    email: { type: String, required: true, unique: true, index: true },
    nickname: { type: String, required: true },
    password: { type: String, required: true },
    admin: { type: Boolean, required: true }
});
exports.UserModel = (0, mongoose_1.model)('User', schema);
//# sourceMappingURL=user.js.map