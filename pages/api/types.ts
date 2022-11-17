export interface IUser {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  // created_at: Date;
  // updatedAt: Date;
  // __v: number;
}

export interface IUserValues {
  email: string;
  first_name: string;
  last_name: string;
  created_at: Date;
}

export interface IGenericResponse {
  status: string;
  message: string;
}
