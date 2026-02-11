🚀 TECH
Backend (API)
Framework: NestJS

Database: PostgreSQL

ORM: TypeORM ( Custom Repository Pattern)

Authentication: JWT (JSON Web Token) & Passport.js

Security: Bcrypt

├── soccer-booking-api/ # Backend NestJS
│ ├── src/
│ │ ├── auth/ # Xử lý Login/Register
│ │ ├── users/ # Quản lý người dùng
│ │ ├── pitches/ # Quản lý sân bóng
│ │ ├── bookings/ # Logic đặt sân
│ │ ├── matches/ # Matchmaking (ghép đội)
│ │ ├── shared/ # Custom Repositories & Utilities
│ │ └── main.ts
│ └── .env.example
│

1. Yêu cầu hệ thống
   Node.js (v18+)
   PostgreSQL (v15+)
2. Thiết lập Backend
   cd soccer-booking-api
   npm install
   Tạo file .env từ mẫu:
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=your_username
   DB_PASSWORD=your_password
   DB_NAME=soccer_booking_db
   JWT_SECRET=your_super_secret_key
