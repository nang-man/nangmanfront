// 추후 조정
export type CurrentUserType = {
  adminState: boolean;
  email: string;
  name: string;
  password: string;
  phone: string;
  profileImg: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  followers: [];
  followings: [];
};

// Current login user type
// Session save and load
export type UserType = {
  accessToken: string;
  refreshToken: string;
  curEmail: string;
  curName: string;
  adminState: boolean;
  phone: string;
  profileImg: string;
  userId: string;
  followers: [];
  followings: [];
};

// login api
export type LoginType = {
  email: string;
  password: string;
};

// signup api
export type RegisterType = LoginType & { name: string; phone: string };

// create api
export type CreateType = {
  email: string;
  roomName: string;
  tagName: string;
  count: number;
};

// get api login type
// token
export type TokenType = {
  accessToken: string;
  refreshToken: string;
};

// user.data
export type GetUserDataType = {
  name: string;
  phone: string;
  profileImg: string;
  userId: string;
  followers: [];
  followings: [];
};

// socket
export type SocketMessage = {
  roomId: string;
  name: string;
  message: string;
};

export type SocketData = Omit<SocketMessage, "message">;

export type Messages = {
  isUser: boolean;
  name: string;
  id: string;
  message: string[];
  time: string;
  img: string;
};
