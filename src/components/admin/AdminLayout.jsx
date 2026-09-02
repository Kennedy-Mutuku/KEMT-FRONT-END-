import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import '../../styles/admin.css';

const AdminLayout = () => {
  const token = localStorage.getItem('kemt_admin_token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="admin-body">
      <div className="admin-layout">
        <Sidebar />
        <div className="admin-main-wrapper">
          <Header />
          <main className="admin-content">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
