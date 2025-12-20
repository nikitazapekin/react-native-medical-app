import $api from "./api";

export interface AvatarResponse {
    userId: number;
    avatar: string;
    userType: string;
    fullName: string;
    email: string;
}

export interface AvatarUrlResponse {
    avatarUrl: string;
}

class AvatarService {
  static async getAvatarByUserId(userId: number): Promise<AvatarResponse> {
    try {
      const response = await $api.get<AvatarResponse>(`/users/${userId}/avatar`);

      return response.data;
    } catch (error) {
      console.error(`Error fetching avatar for user ${userId}:`, error);
      throw new Error("Failed to get user avatar");
    }
  }

  static async getAvatarUrl(userId: number): Promise<string> {
    try {
      const response = await $api.get<{avatarUrl: string}>(`/users/${userId}/avatar/url`);

      return response.data.avatarUrl;
    } catch (error) {
      console.error(`Error fetching avatar URL for user ${userId}:`, error);
      throw new Error("Failed to get avatar URL");
    }
  }

  static async getUserAvatarUrl(userId: number): Promise<string | null> {
    try {
      const avatar = await this.getAvatarByUserId(userId);

      return avatar.avatar || null;
    } catch (error) {
      console.error(`Error getting avatar URL for user ${userId}:`, error);

      return null;
    }
  }
}

export default AvatarService;
