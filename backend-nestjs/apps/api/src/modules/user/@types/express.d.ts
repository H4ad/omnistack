import { UserEntity } from '../entities/user.entity';

declare global {
  namespace Express {
    export class User extends UserEntity {}
  }
}
