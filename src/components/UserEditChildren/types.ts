// types.ts
export interface UserEditChildrenProps {
  id: string;
}

export interface Child {
  id: number;
  avatar: string;
  name: string;
  age: number;
  gender: string;
  parentId: number;
}

export interface CreateChildRequest {
  avatar: string;
  name: string;
  age: number;
  gender: string;
  parentId: number;
}

export interface UpdateChildRequest {
  avatar?: string;
  name?: string;
  age?: number;
  gender?: string;
}
