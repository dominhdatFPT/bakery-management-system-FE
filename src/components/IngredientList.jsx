import { useState, useEffect } from 'react';
import apiClient from '../api/client';

function IngredientList({ token, onLogout }) {
  const [ingredients, setIngredients] = useState([]);
  const [error, setError] = useState('');

  // useEffect chạy 1 lần khi component vừa hiện ra (nhờ mảng rỗng [] ở cuối)
  // để tự động gọi API lấy danh sách, không cần chờ người dùng bấm nút gì.
  useEffect(() => {
    async function fetchIngredients() {
      try {
        const response = await apiClient.get('/ingredients', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIngredients(response.data);
      } catch (err) {
        setError('Không tải được danh sách nguyên liệu');
      }
    }

    fetchIngredients();
  }, [token]);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2>Danh sách nguyên liệu</h2>
        <button onClick={onLogout}>Đăng xuất</button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Tên</th>
            <th>Đơn vị</th>
            <th>Tồn kho</th>
            <th>Ngưỡng cảnh báo</th>
          </tr>
        </thead>
        <tbody>
          {ingredients.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.unit}</td>
              <td>{item.currentStock}</td>
              <td>{item.lowStockThreshold}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default IngredientList;