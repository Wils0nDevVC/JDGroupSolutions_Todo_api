import { UserModel } from './../../data/mongo/models/user.model';
import { UserEntity } from '../../domain';
import { IUserRepository } from '../../domain/repository/IUserRepository';


export class ImpUserRepository implements IUserRepository {

  constructor() {}

  async findByEmail(email: string): Promise<UserEntity | null> {
    const userDoc = await UserModel.findOne({ email }).lean();
    return userDoc ? UserEntity.fromObject(userDoc) : null;
  }

  async save(user: UserEntity): Promise<UserEntity> {
    const userDoc = await UserModel.create({
      name: user.name,
      email: user.email,
      password: user.password,
    });
    return UserEntity.fromObject(userDoc.toObject());
  }

}
