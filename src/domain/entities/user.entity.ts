import { CustomError } from "../errors/custom.error"


export class UserEntity {

    constructor(
        public id : string,
        public  name: string,
        public  email: string,
        public  password: string
    ) { }

    static fromObject(object: { [key: string]: any }) {
        const id = object._id?.toString() ?? object.id;
      
        if (!id) throw CustomError.badRequest('Missing ID');
        if (!object.name) throw CustomError.badRequest('Missing Name');
        if (!object.email) throw CustomError.badRequest('Missing Email');
        if (!object.password) throw CustomError.badRequest('Missing password');
      
        return new UserEntity(id, object.name, object.email, object.password);
      }
      
}