export interface LoginResponse {
  access_token: string;
  user: {
    id: string;
    name: string;
    phone: string;
    role: string;
  };
}

// Định nghĩa kiểu trả về cho User (không bao gồm password)
export interface UserResponse {
  id: string;
  phone: string;
  name: string;
  role: string;
  createdAt: Date;
}
