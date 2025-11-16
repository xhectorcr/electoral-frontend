export interface UserProfileResponse {
  id: number;
  username: string;
  email: string;
  enabled: boolean;
  roles: string[];
  firstName: string;
  lastName: string;
  fullName: string;
  phone: string;
  provider: string;
  hasPassword: boolean;
  profileImageUrl: string;
  usernameNextChange: string;
  emailNextChange: string;
}
