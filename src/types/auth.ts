export interface LoginParams {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export interface LoginError {
  message: string;
}

export interface SignupParams {
  email: string;
  password: string;
  name: string;
}

export interface SignupResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export interface LoginError {
  message: string;
}

export interface ResetPasswordParams {
  token: string;
  newPassword: string;
}

export interface ResetPasswordResponse {
  message: string;
}

export type RootStackParamList = {
  SignUp: undefined;
  Login: undefined;
  ResetPassword: undefined;
  ResetPassword2: undefined;
  Home: undefined;
};

export interface ResetPasswordLinkParams {
  email: string;
}

export interface ResetPasswordLinkResponse {
  message: string;
}

export type AuthState = {
  isAuthenticated: boolean;
  token: string | null;
  logout: () => Promise<void>;
  saveToken: (token: string) => Promise<void>;
  initializeAuth: () => Promise<void>;
  removeToken: () => void;
  fctToken: string | null;
  setFctToken: (token: string) => void;
};

export interface UserType {
  id: string;
  email: string;
  name: string;
  profile_pic: string;
  dob: string | null;
  mobileNumber: string | null;
  location: string | null;
  status: 'active' | 'inactive';
  resetToken: string | null;
  resetTokenExpiry: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AccountState {
  accountData: UserType | null;
  setAccountData: (data: UserType) => void;
  loadAccountData: () => Promise<void>;
  clearAccountData: () => void;
}
