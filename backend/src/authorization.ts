import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const verifyToken = (request: Request, response: Response, next: NextFunction) => {
  try {
    if(!request.headers['x-access-token']) {
      return response.status(403).json({
        success: false,
        message: 'not logged in'
      })
    }

    const token: string = request.headers['x-access-token'].toString();
    const secret_key = process.env.SECRET_KEY || 'secret_key';
    
    // 토큰 없는 경우
    if(!token) {
      return response.status(403).json({
        success: false,
        message: 'not logged in'
      })
    }

    // 토큰 검증
    const decoded: any = jwt.verify(token, secret_key);
    
    if (decoded) {
      response.locals = {
        ...response.locals,
        email: decoded.email,
        admin: decoded.admin
      }
      next();
    } else {
      response.status(401).json({ error: 'unauthorized' });
    }
  } catch (err) {
    response.status(401).json({ error: 'token expired' });
  }
};

export { verifyToken };
