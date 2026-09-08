import { useState } from 'react';
import apiClient from '../api/client';

// Nhận 1 hàm "onLoginSuccess" từ App.jsx truyền xuống (gọi là "prop") —
// để khi đăng nhập xong, Login báo ngược lại cho App biết "tôi có token rồi".
function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault(); // chặn hành vi mặc định của form (load lại trang)
    setError('');

    try {
      const response = await apiClient.post('/auth/login', { email, password });
      const token = response.data.token;

      localStorage.setItem('token', token); // lưu token vào trình duyệt
      onLoginSuccess(token); // báo cho App.jsx biết đã đăng nhập xong
    } catch (err) {
      setError('Sai email hoặc mật khẩu');
    }
  }

  return (
    <div>
      <h2>Đăng nhập</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Mật khẩu</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Đăng nhập</button>
      </form>
    </div>
  );
}

export default Login;