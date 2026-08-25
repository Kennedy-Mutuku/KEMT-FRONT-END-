import Card from '../../components/admin/Card';
import DataTable from '../../components/admin/DataTable';

const AdminUsers = () => {
  // Mock data for initial presentation
  const mockUsers = [
    { id: 1, name: 'Alice Smith', email: 'alice@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Active' },
    { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'Moderator', status: 'Inactive' },
    { id: 4, name: 'Diana Prince', email: 'diana@example.com', role: 'User', status: 'Active' },
  ];

  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Name', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Role', accessor: 'role' },
    {
      header: 'Status',
      cell: (row) => (
        <span className={`admin-status-badge ${row.status === 'Active' ? 'admin-status-active' : 'admin-status-inactive'}`}>
          {row.status}
        </span>
      ),
    },
  ];

  return (
    <>
      <h1 className="admin-page-title">User Management</h1>
      <Card>
        <DataTable columns={columns} data={mockUsers} />
      </Card>
    </>
  );
};

export default AdminUsers;
