export interface UserType {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
  salt: string;
  password: string;
  created_at: string;
  updated_at: string;
  isDeleted: boolean;
  deleted_at: null | string;
}
