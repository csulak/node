import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  id: String,
  name: String,
  lastname: String,
  email: String,
  password: String,
});
