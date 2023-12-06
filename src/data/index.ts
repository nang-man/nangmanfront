export type CurrentUserData = {
  adminState: boolean;
  email: string;
  name: string;
  password: string;
  phone: string;
  profileImg: string | null;
  createdAt: string;
  updatedAt: string;
  userId: string;
  followers: [];
  followings: [];
};
