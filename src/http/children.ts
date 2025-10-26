import $api from './api';

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

class ChildrenService {
  static async getChildrenByParentId(parentId: number): Promise<Child[]> {
    try {
      const response = await $api.get<Child[]>(`/children/parent/${parentId}`);

      return response.data;
    } catch (error) {
      console.error('Error fetching children:', error);
      throw new Error('Failed to get children list');
    }
  }

  static async getChildById(id: number): Promise<Child> {
    try {
      const response = await $api.get<Child>(`/children/${id}`);

      return response.data;
    } catch (error) {
      console.error('Error fetching child:', error);
      throw new Error('Failed to get child information');
    }
  }

  static async createChild(childData: CreateChildRequest): Promise<Child> {
    try {
      const response = await $api.post<Child>('/children', childData);

      return response.data;
    } catch (error) {
      console.error('Error creating child:', error);
      throw new Error('Failed to create child');
    }
  }

  static async updateChild(id: number, childData: UpdateChildRequest): Promise<Child> {
    try {
      const response = await $api.put<Child>(`/children/${id}`, childData);

      return response.data;
    } catch (error) {
      console.error('Error updating child:', error);
      throw new Error('Failed to update child information');
    }
  }

  static async deleteChild(id: number): Promise<void> {
    try {
      await $api.delete(`/children/${id}`);
    } catch (error) {
      console.error('Error deleting child:', error);
      throw new Error('Failed to delete child');
    }
  }
}

export default ChildrenService;
