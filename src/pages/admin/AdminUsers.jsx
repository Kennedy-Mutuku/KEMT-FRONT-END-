import React from 'react';
import Card from '../../components/admin/Card';
import { Users, Shield, Mail, Phone, CheckCircle2 } from 'lucide-react';

import vincentImg from '../../assets/Vincent Mwenda.jpeg';
import moriceImg from '../../assets/Mutharimi.jpg';
import mwanziaImg from '../../assets/Mwanzia.jpg';
import kennedyImg from '../../assets/Kennedy Mutuku.JPG';
import mukamiImg from '../../assets/mukami.jpg';
import rayImg from '../../assets/ray.jpg';

const leadershipMembers = [
  { id: 1, name: 'Vincent Mwendwa', role: 'Director', email: 'info@kingdomenlightenment.org', phone: '+254 714 476 295', initials: 'VM', color: '#e67e22', image: vincentImg, status: 'Active Leadership' },
  { id: 2, name: 'Morice Mutharimi', role: 'Chairperson', email: 'info@kingdomenlightenment.org', phone: '+254 714 476 295', initials: 'MM', color: '#2980b9', image: moriceImg, status: 'Active Leadership' },
  { id: 3, name: 'Mwanzia David', role: 'Outreach Incharge', email: 'info@kingdomenlightenment.org', phone: '+254 714 476 295', initials: 'MD', color: '#27ae60', image: mwanziaImg, status: 'Active Leadership' },
  { id: 4, name: 'Kennedy Mutuku', role: 'Media Director', email: 'info@kingdomenlightenment.org', phone: '+254 714 476 295', initials: 'KM', color: '#8e44ad', image: kennedyImg, status: 'Active Leadership' },
  { id: 5, name: 'Evaline Mukami', role: 'Secretary', email: 'info@kingdomenlightenment.org', phone: '+254 714 476 295', initials: 'EM', color: '#16a085', image: mukamiImg, status: 'Active Leadership' },
  { id: 6, name: 'Raymond Ewoi', role: 'Prayer Coordinator', email: 'info@kingdomenlightenment.org', phone: '+254 714 476 295', initials: 'RE', color: '#c0392b', image: rayImg, status: 'Active Leadership' },
  { id: 7, name: 'Victor Muriungi', role: 'Worship Coordinator', email: 'info@kingdomenlightenment.org', phone: '+254 714 476 295', initials: 'VM', color: '#d4ac0d', status: 'Active Leadership' },
];

const AdminUsers = () => {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 className="admin-page-title" style={{ margin: 0 }}>
          KEMT Leadership & Council Members
        </h1>
        <p style={{ color: '#64748b', margin: '4px 0 0', fontSize: '0.9rem' }}>
          Official leadership team members of Kingdom Enlightenment Missions Team
        </p>
      </div>

      <div style={{ 
        background: '#ffffff', 
        borderRadius: '12px', 
        border: '1px solid #e2e8f0', 
        overflow: 'hidden',
        boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
      }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1.5px solid #e2e8f0' }}>
                <th style={{ padding: '14px 20px', color: '#64748b', fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase' }}>Council Member</th>
                <th style={{ padding: '14px 20px', color: '#64748b', fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase' }}>Ministry Role</th>
                <th style={{ padding: '14px 20px', color: '#64748b', fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase' }}>Official Email</th>
                <th style={{ padding: '14px 20px', color: '#64748b', fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase' }}>Contact Phone</th>
                <th style={{ padding: '14px 20px', color: '#64748b', fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {leadershipMembers.map((member) => (
                <tr key={member.id} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background 0.2s' }}>
                  <td style={{ padding: '14px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        background: member.color ? `linear-gradient(145deg, ${member.color}dd, ${member.color}88)` : '#E87D1E',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 700,
                        fontSize: '0.88rem',
                        flexShrink: 0
                      }}>
                        {member.image ? (
                          <img src={member.image} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          member.initials
                        )}
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, color: '#1e293b', fontSize: '0.94rem' }}>{member.name}</div>
                        <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>ID: KEMT-LD-00{member.id}</div>
                      </div>
                    </div>
                  </td>

                  <td style={{ padding: '14px 20px' }}>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      padding: '3px 10px',
                      borderRadius: '20px',
                      backgroundColor: 'rgba(232, 125, 30, 0.1)',
                      color: '#E87D1E',
                      fontWeight: 600,
                      fontSize: '0.82rem'
                    }}>
                      <Shield size={13} />
                      {member.role}
                    </span>
                  </td>

                  <td style={{ padding: '14px 20px', color: '#475569', fontSize: '0.88rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Mail size={14} color="#94a3b8" />
                      <a href={`mailto:${member.email}`} style={{ color: '#E87D1E', textDecoration: 'none', fontWeight: 500 }}>
                        {member.email}
                      </a>
                    </div>
                  </td>

                  <td style={{ padding: '14px 20px', color: '#64748b', fontSize: '0.88rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Phone size={14} color="#94a3b8" />
                      <span>{member.phone}</span>
                    </div>
                  </td>

                  <td style={{ padding: '14px 20px' }}>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '3px 10px',
                      borderRadius: '20px',
                      backgroundColor: '#f0fdf4',
                      color: '#166534',
                      border: '1px solid #bbf7d0',
                      fontSize: '0.75rem',
                      fontWeight: 700
                    }}>
                      <CheckCircle2 size={12} />
                      {member.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
