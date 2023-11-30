import { UserModel } from './user';

export class PostModel {
  id: number;
  ownerId: number;
  owner: UserModel;
  text: string;
  attachments: string[];
  createdAt: Date;
  updatedAt: Date;
}
