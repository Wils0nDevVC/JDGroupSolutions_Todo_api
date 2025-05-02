import { UserModel } from './../../data/mongo/models/user.model';
import { NextFunction, Request, Response } from "express";
import { JsonWebTokenAdapter } from "../../config";
import { JWTSeed } from "../../config/jwt_seed";
import { UserEntity } from "../../domain";

export class AuthMiddleware {

    static async validateJWT(req: Request, res: Response, next: NextFunction) {
        const authorization = req.header('Authorization');
        if (!authorization) return res.status(401).json({ error: 'No token provided' });

        if (!authorization.startsWith('Bearer ')) return res.status(401).json({ error: 'Invalid Bearer token' });

        const token = authorization.split(' ').at(1) || '';
        try {
            const jwtAdapter = new JsonWebTokenAdapter(new JWTSeed());
            const payload = await jwtAdapter.validateToken<{ id: string }>(token); // id como string (Mongo)

            if (!payload) return res.status(401).json({ error: 'Invalid token' });

            const id = payload.id;
            const user = await UserModel.findById(id).lean(); 

            if (!user) return res.status(401).json({ error: 'Invalid token - user' });

            req.body.userId = id;

            
            next();

        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}
