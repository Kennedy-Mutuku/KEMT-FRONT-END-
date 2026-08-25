import { Users, UserPlus, DollarSign, Heart, ArrowUp, ArrowDown } from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';

const attendanceData = [
  { name: 'Week 1', inPerson: 350, online: 200 },
  { name: 'Week 2', inPerson: 320, online: 190 },
  { name: 'Week 3', inPerson: 380, online: 220 },
  { name: 'Week 4', inPerson: 410, online: 250 },
  { name: 'Week 5', inPerson: 450, online: 210 },
  { name: 'Week 6', inPerson: 390, online: 230 },
  { name: 'Week 7', inPerson: 430, online: 280 },
];

const donationData = [
  { name: 'M', tithe: 500, offering: 200 },
  { name: 'T', tithe: 300, offering: 150 },
  { name: 'W', tithe: 1200, offering: 400 },
  { name: 'T', tithe: 800, offering: 250 },
  { name: 'F', tithe: 400, offering: 200 },
  { name: 'S', tithe: 200, offering: 100 },
  { name: 'S', tithe: 8500, offering: 3200 },
];

const StatCard = ({ icon: Icon, value, title, percentage, isPositive }) => (
  <div className="admin-stat-card">
    <div className="admin-stat-icon-wrapper">
      <Icon size={24} strokeWidth={2} />
    </div>
    <div className="admin-stat-content">
      <div>
        <h3 className="admin-stat-value">{value}</h3>
        <p className="admin-stat-title">{title}</p>
      </div>
      <div className={`admin-stat-percentage ${isPositive ? 'positive' : 'negative'}`}>
        {percentage}% {isPositive ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
      </div>
    </div>
  </div>
);

const AdminDashboard = () => {
  return (
    <>
      <div className="admin-stats-grid">
        <StatCard 
          icon={Users} 
          value="1,245" 
          title="Total Members" 
          percentage="2.4" 
          isPositive={true} 
        />
        <StatCard 
          icon={UserPlus} 
          value="48" 
          title="New Visitors (This Month)" 
          percentage="12.5" 
          isPositive={true} 
        />
        <StatCard 
          icon={DollarSign} 
          value="$12,450" 
          title="Weekly Tithes & Offerings" 
          percentage="5.2" 
          isPositive={true} 
        />
        <StatCard 
          icon={Heart} 
          value="15" 
          title="New Prayer Requests" 
          percentage="2.1" 
          isPositive={false} 
        />
      </div>

      <div className="admin-charts-grid">
        <div className="admin-chart-card">
          <div className="admin-chart-header">
            <div>
              <div className="chart-legend-item" style={{marginBottom: '10px'}}>
                <span className="chart-legend-dot" style={{backgroundColor: '#3C50E0'}}></span>
                <div>
                  <div style={{color: 'var(--admin-primary)', fontSize: '1rem'}}>In-Person Attendance</div>
                  <div style={{color: 'var(--admin-text-muted)', fontSize: '0.75rem', fontWeight: 400}}>Last 7 Weeks</div>
                </div>
              </div>
              <div className="chart-legend-item">
                <span className="chart-legend-dot" style={{backgroundColor: '#80CAEE'}}></span>
                <div>
                  <div style={{color: '#80CAEE', fontSize: '1rem'}}>Online Attendance</div>
                  <div style={{color: 'var(--admin-text-muted)', fontSize: '0.75rem', fontWeight: 400}}>Last 7 Weeks</div>
                </div>
              </div>
            </div>
            <div className="admin-chart-controls">
              <button style={{background: 'white', border: '1px solid #E2E8F0', padding: '4px 10px', borderRadius: '4px', fontSize: '0.8rem'}}>Month</button>
              <button style={{background: '#EFF4FB', border: '1px solid transparent', padding: '4px 10px', borderRadius: '4px', fontSize: '0.8rem', color: 'var(--admin-primary)', fontWeight: 600}}>Quarter</button>
              <button style={{background: 'white', border: '1px solid #E2E8F0', padding: '4px 10px', borderRadius: '4px', fontSize: '0.8rem'}}>Year</button>
            </div>
          </div>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <LineChart data={attendanceData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: 'var(--admin-text-muted)', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: 'var(--admin-text-muted)', fontSize: 12}} />
                <Tooltip />
                <Line type="monotone" dataKey="online" stroke="#80CAEE" strokeWidth={3} dot={{r: 4, strokeWidth: 2, fill: 'white'}} activeDot={{ r: 6 }} name="Online" />
                <Line type="monotone" dataKey="inPerson" stroke="#3C50E0" strokeWidth={3} dot={{r: 4, strokeWidth: 2, fill: 'white'}} name="In-Person" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="admin-chart-card">
          <div className="admin-chart-header">
            <div>
              <h3 className="admin-chart-title">Donations This Week</h3>
            </div>
            <div style={{fontSize: '0.85rem', color: 'var(--admin-text-muted)'}}>
              This Week ⌄
            </div>
          </div>
          <div style={{display: 'flex', gap: '15px', marginBottom: '20px'}}>
             <div className="chart-legend-item">
                <span className="chart-legend-dot" style={{backgroundColor: '#3C50E0'}}></span>
                <span style={{fontWeight: 400, color: 'var(--admin-text-muted)'}}>Tithes</span>
              </div>
              <div className="chart-legend-item">
                <span className="chart-legend-dot" style={{backgroundColor: '#80CAEE'}}></span>
                <span style={{fontWeight: 400, color: 'var(--admin-text-muted)'}}>Offerings</span>
              </div>
          </div>
          <div style={{ width: '100%', height: 260 }}>
            <ResponsiveContainer>
              <BarChart data={donationData} margin={{ top: 0, right: 0, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: 'var(--admin-text-muted)', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: 'var(--admin-text-muted)', fontSize: 12}} />
                <Tooltip cursor={{fill: 'transparent'}} />
                <Bar dataKey="tithe" stackId="a" fill="#3C50E0" barSize={12} name="Tithes" />
                <Bar dataKey="offering" stackId="a" fill="#80CAEE" radius={[4, 4, 0, 0]} name="Offerings" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
