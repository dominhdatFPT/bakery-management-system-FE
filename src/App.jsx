import { useState } from 'react';
import Login from './components/Login';
import IngredientList from './components/IngredientList';
import './App.css';

function App() {
  // Khởi tạo state "token" bằng giá trị đã lưu sẵn trong localStorage (nếu có)
  // — nhờ vậy, F5 lại trang không bị văng về màn Login.
  const [token, setToken] = useState(localStorage.getItem('token'));

  function handleLogout() {
    localStorage.removeItem('token');
    setToken(null);
  }

  return (
    <div style={{ maxWidth: 700, margin: '40px auto' }}>
      {token ? (
        <IngredientList token={token} onLogout={handleLogout} />
      ) : (
        <Login onLoginSuccess={(newToken) => setToken(newToken)} />
      )}
    </div>
  );
}

export default App;