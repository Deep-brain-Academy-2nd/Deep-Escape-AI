import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { MongoConnector } from './mongo-connector';
import videoRouter from './routes/videoRouter';
import userRouter from './routes/userRouter';
import themeRouter from './routes/themeRouter';
import studioRouter from './routes/studioRouter';

// 메인서버 클래스
export class MainServer {
	private app: any;

	constructor() {
		dotenv.config();
		this.app = express();
	}

	async start(): Promise<void> {
    // 몽고디비 연결
		const mongoConnector = new MongoConnector();
		await mongoConnector.connect();
		
		this.app.use(express.json());
		this.app.use(cors());

    // 라우터 연결
		this.app.use("/video", videoRouter);
		this.app.use("/user", userRouter);
		this.app.use("/theme", themeRouter);
		this.app.use("/studio", studioRouter);
    this.app.get('/', (req: Request, res: Response) => {
      res.send('Hello World');
    });
    
    // 서버 시작
    this.app.listen(8080, () => {
			console.log('Server Opened.');
		});
	}
}