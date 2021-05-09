import { Document } from 'mongoose';

export interface UserInterface extends Document {
  id?: string;
  name: string;
  lastname: string;
  email: string;
  password?: string;
}
