"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (request, response, next) => {
    try {
        if (!request.headers['x-access-token']) {
            return response.status(403).json({
                success: false,
                message: 'not logged in'
            });
        }
        const token = request.headers['x-access-token'].toString();
        const secret_key = process.env.SECRET_KEY || 'secret_key';
        // 토큰 없는 경우
        if (!token) {
            return response.status(403).json({
                success: false,
                message: 'not logged in'
            });
        }
        // 토큰 검증
        const decoded = jsonwebtoken_1.default.verify(token, secret_key);
        if (decoded) {
            response.locals = {
                ...response.locals,
                email: decoded.email,
                admin: decoded.admin
            };
            next();
        }
        else {
            response.status(401).json({ error: 'unauthorized' });
        }
    }
    catch (err) {
        response.status(401).json({ error: 'token expired' });
    }
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=authorization.js.map