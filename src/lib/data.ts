
import { Certificate, User, Skill, SkillMatrixItem, ExpiryAlert } from './types';

export const skills: Skill[] = [
  { id: '1', name: 'Azure', category: 'Cloud', color: '#0078D4' },
  { id: '2', name: 'AWS', category: 'Cloud', color: '#FF9900' },
  { id: '3', name: 'GCP', category: 'Cloud', color: '#4285F4' },
  { id: '4', name: 'Kubernetes', category: 'DevOps', color: '#326CE5' },
  { id: '5', name: 'Docker', category: 'DevOps', color: '#2496ED' },
  { id: '6', name: 'CI/CD', category: 'DevOps', color: '#4B32C3' },
  { id: '7', name: 'Network Security', category: 'Security', color: '#D13438' },
  { id: '8', name: 'Penetration Testing', category: 'Security', color: '#881798' },
  { id: '9', name: 'SIEM', category: 'Security', color: '#E74856' },
  { id: '10', name: 'Cisco Networking', category: 'Networking', color: '#1BA0D7' },
  { id: '11', name: 'SD-WAN', category: 'Networking', color: '#6264A7' },
  { id: '12', name: 'Network Automation', category: 'Networking', color: '#4F6BED' },
  { id: '13', name: 'Windows Server', category: 'Systems', color: '#0078D7' },
  { id: '14', name: 'Linux Administration', category: 'Systems', color: '#F3CD00' },
  { id: '15', name: 'PowerShell', category: 'Scripting', color: '#5391FE' },
  { id: '16', name: 'Python', category: 'Scripting', color: '#3776AB' },
];

export const certificates: Certificate[] = [
  {
    id: '1',
    name: 'Azure Administrator Associate',
    provider: 'Microsoft',
    issueDate: '2023-05-15',
    expiryDate: '2024-05-15',
    skills: ['Azure'],
    level: 'intermediate',
    userId: '1',
    image: 'https://learn.microsoft.com/en-us/media/learn/certification/badges/microsoft-certified-associate-badge.svg'
  },
  {
    id: '2',
    name: 'AWS Solutions Architect Associate',
    provider: 'Amazon Web Services',
    issueDate: '2023-03-10',
    expiryDate: '2026-03-10',
    skills: ['AWS'],
    level: 'intermediate',
    userId: '1',
    image: 'https://d1.awsstatic.com/training-and-certification/certification-badges/AWS-Certified-Solutions-Architect-Associate_badge.3419559c682629072f1eb968d59dea0741772c0f.png'
  },
  {
    id: '3',
    name: 'Certified Kubernetes Administrator',
    provider: 'Cloud Native Computing Foundation',
    issueDate: '2023-01-20',
    expiryDate: '2026-01-20',
    skills: ['Kubernetes', 'Docker'],
    level: 'advanced',
    userId: '2',
    image: 'https://training.linuxfoundation.org/wp-content/uploads/2019/03/logo_cka_whitetext-300x293.png'
  },
  {
    id: '4',
    name: 'Certified Information Systems Security Professional',
    provider: 'ISC2',
    issueDate: '2022-11-05',
    expiryDate: '2025-11-05',
    skills: ['Network Security', 'Penetration Testing', 'SIEM'],
    level: 'expert',
    userId: '3',
    image: 'https://www.isc2.org/-/media/ISC2/Certifications/Certification-Badges/CISSP-Badge.ashx'
  },
  {
    id: '5',
    name: 'Cisco Certified Network Professional',
    provider: 'Cisco',
    issueDate: '2022-09-15',
    expiryDate: '2025-09-15',
    skills: ['Cisco Networking', 'SD-WAN', 'Network Automation'],
    level: 'advanced',
    userId: '4',
    image: 'https://images.credly.com/images/a31c0301-ff96-4cee-9435-0a4b40ce6e66/cisco_ccnp_enterprise.png'
  },
  {
    id: '6',
    name: 'Microsoft 365 Certified: Enterprise Administrator Expert',
    provider: 'Microsoft',
    issueDate: '2023-06-20',
    expiryDate: '2024-06-20',
    skills: ['Azure', 'Windows Server'],
    level: 'expert',
    userId: '5',
    image: 'https://learn.microsoft.com/en-us/media/learn/certification/badges/microsoft-certified-expert-badge.svg'
  },
  {
    id: '7',
    name: 'CompTIA Security+',
    provider: 'CompTIA',
    issueDate: '2022-07-10',
    expiryDate: '2025-07-10',
    skills: ['Network Security'],
    level: 'intermediate',
    userId: '3',
    image: 'https://comptiacdn.azureedge.net/webcontent/images/default-source/siteicons/logosecurity.svg'
  },
  {
    id: '8',
    name: 'Google Professional Cloud Architect',
    provider: 'Google Cloud',
    issueDate: '2023-02-28',
    expiryDate: '2025-02-28',
    skills: ['GCP'],
    level: 'advanced',
    userId: '2',
    image: 'https://cloud.google.com/images/certification/cloud-architect.png'
  },
  {
    id: '9',
    name: 'Red Hat Certified Engineer',
    provider: 'Red Hat',
    issueDate: '2022-12-15',
    expiryDate: '2025-12-15',
    skills: ['Linux Administration'],
    level: 'advanced',
    userId: '1',
    image: 'https://www.redhat.com/cms/managed-files/RHCE-128.png'
  }
];

export const users: User[] = [
  {
    id: '1',
    name: 'Alex Morgan',
    email: 'alex.morgan@example.com',
    role: 'Cloud Engineer',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    department: 'Cloud Infrastructure',
    certificates: certificates.filter(cert => cert.userId === '1')
  },
  {
    id: '2',
    name: 'Jamie Taylor',
    email: 'jamie.taylor@example.com',
    role: 'DevOps Engineer',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    department: 'Platform Engineering',
    certificates: certificates.filter(cert => cert.userId === '2')
  },
  {
    id: '3',
    name: 'Sam Chen',
    email: 'sam.chen@example.com',
    role: 'Security Analyst',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    department: 'Security Operations',
    certificates: certificates.filter(cert => cert.userId === '3')
  },
  {
    id: '4',
    name: 'Morgan Lee',
    email: 'morgan.lee@example.com',
    role: 'Network Engineer',
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
    department: 'Network Operations',
    certificates: certificates.filter(cert => cert.userId === '4')
  },
  {
    id: '5',
    name: 'Jordan Williams',
    email: 'jordan.williams@example.com',
    role: 'Systems Administrator',
    avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
    department: 'IT Operations',
    certificates: certificates.filter(cert => cert.userId === '5')
  }
];

export const skillMatrix: SkillMatrixItem[] = [
  { skill: 'Azure', category: 'Cloud', count: 2, level: 85, users: ['1', '5'] },
  { skill: 'AWS', category: 'Cloud', count: 1, level: 70, users: ['1'] },
  { skill: 'GCP', category: 'Cloud', count: 1, level: 75, users: ['2'] },
  { skill: 'Kubernetes', category: 'DevOps', count: 1, level: 90, users: ['2'] },
  { skill: 'Docker', category: 'DevOps', count: 1, level: 85, users: ['2'] },
  { skill: 'Network Security', category: 'Security', count: 2, level: 95, users: ['3', '4'] },
  { skill: 'Penetration Testing', category: 'Security', count: 1, level: 80, users: ['3'] },
  { skill: 'SIEM', category: 'Security', count: 1, level: 75, users: ['3'] },
  { skill: 'Cisco Networking', category: 'Networking', count: 1, level: 90, users: ['4'] },
  { skill: 'SD-WAN', category: 'Networking', count: 1, level: 80, users: ['4'] },
  { skill: 'Network Automation', category: 'Networking', count: 1, level: 70, users: ['4'] },
  { skill: 'Windows Server', category: 'Systems', count: 1, level: 85, users: ['5'] },
  { skill: 'Linux Administration', category: 'Systems', count: 1, level: 80, users: ['1'] }
];

// Calculate expiry alerts based on certificates
export const expiryAlerts: ExpiryAlert[] = certificates
  .filter(cert => cert.expiryDate)
  .map(cert => {
    const user = users.find(user => user.id === cert.userId);
    const expiryDate = new Date(cert.expiryDate as string);
    const today = new Date();
    const daysRemaining = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    return {
      id: `alert-${cert.id}`,
      certificateId: cert.id,
      certificateName: cert.name,
      userName: user?.name || 'Unknown User',
      userId: cert.userId,
      expiryDate: cert.expiryDate as string,
      daysRemaining
    };
  })
  .filter(alert => alert.daysRemaining <= 180) // Show alerts for certs expiring within 6 months
  .sort((a, b) => a.daysRemaining - b.daysRemaining);
