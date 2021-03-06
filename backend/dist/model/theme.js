"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThemeModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const mongoose_auto_increment_1 = __importDefault(require("mongoose-auto-increment"));
// 테마 스키마
const schema = new mongoose_1.Schema({
    themeId: { type: Number, unique: true, index: true },
    award: { type: String, required: true },
    title: { type: String, required: true },
    store: { type: String, required: true },
    img: { type: String, required: true },
});
// 테마 인덱스 auto increment
mongoose_auto_increment_1.default.initialize(mongoose_1.default.connection);
schema.plugin(mongoose_auto_increment_1.default.plugin, {
    model: 'Theme',
    field: 'themeId',
    startAt: 1,
    increment: 1,
});
exports.ThemeModel = (0, mongoose_1.model)('Theme', schema);
//# sourceMappingURL=theme.js.map