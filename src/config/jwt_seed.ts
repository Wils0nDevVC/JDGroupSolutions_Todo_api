import { envs } from "./envs";


export class  JWTSeed {
    
    constructor(){}
    public  getJWTSeed() : string{
        return envs.JWT_SEED
    }
}