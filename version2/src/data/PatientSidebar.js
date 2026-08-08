import {
  LayoutDashboard, Droplet, HandHeart, ClipboardList, UserSearch,
  Ambulance, Hospital, BriefcaseMedical, Calendar, IdCard, Settings, HelpCircle
} from 'lucide-react';

export const patientNavItems = [
  { to: '/user', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/user/medical_profile', label: 'Medical Profile', icon: IdCard },
  { to: '/user/request_blood', label: 'Request Blood', icon: Droplet },
  { to: '/user/blood_donate', label: 'Donate Blood', icon: HandHeart },
  { to: '/user/request_list', label: 'Blood Requests', icon: ClipboardList },
  { to: '/user/donor_search', label: 'Find Donor', icon: UserSearch },
  { to: '/user/ambulance', label: 'Ambulance', icon: Ambulance },
  { to: '/user/hospitals', label: 'Hospitals', icon: Hospital },
  { to: '/user/doctors', label: 'Doctors', icon: BriefcaseMedical },
  { to: '/user/appointments', label: 'Appointments', icon: Calendar },
  { to: '/user/settings', label: 'Settings', icon: Settings },
  { to: '/user/help', label: 'Help', icon: HelpCircle },
];