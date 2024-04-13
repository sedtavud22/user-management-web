import { Permission } from './permission.model';
import { Role } from './role.model';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  username: string;
  createdAt: Date | string;
  updatedAt: Date;
  role: Role;
  permissions: Permission[];
}

export interface CreateUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  username: string;
  password: string;
  roleId: string;
  permissions: Permission[];
}

export interface Response<T> {
  status: {
    code: string;
    description: string;
  };
  data: T;
}

export interface GetAllResponse<T> {
  data: T;
  page: number;
  pageSize: number;
  totalCount: number;
}
