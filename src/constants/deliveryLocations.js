/**
 * deliveryLocations.js
 * ----------------------------------------------------------
 * Campus delivery destinations for Belgium Campus.
 */

export const DELIVERY_LOCATIONS = [
  {
    id: 'pretoria-main',
    label: 'Pretoria Campus — Main Gate',
    building: 'Main Building',
    zone: 'A',
    eta: 15,
  },
  {
    id: 'pretoria-library',
    label: 'Pretoria Campus — Library',
    building: 'Library Wing',
    zone: 'B',
    eta: 18,
  },
  {
    id: 'student-res-a',
    label: 'Student Residences — Block A',
    building: 'Residences',
    zone: 'C',
    eta: 20,
  },
  {
    id: 'student-res-b',
    label: 'Student Residences — Block B',
    building: 'Residences',
    zone: 'C',
    eta: 20,
  },
  {
    id: 'staff-offices',
    label: 'Staff Offices — Admin Block',
    building: 'Admin',
    zone: 'D',
    eta: 20,
  },
  {
    id: 'lecture-halls',
    label: 'Lecture Halls — East Wing',
    building: 'Academic',
    zone: 'E',
    eta: 17,
  },
  {
    id: 'cafeteria-square',
    label: 'Cafeteria Square',
    building: 'Central',
    zone: 'A',
    eta: 12,
  },
  {
    id: 'sports-complex',
    label: 'Sports Complex',
    building: 'Recreation',
    zone: 'F',
    eta: 20,
  },
];

export default DELIVERY_LOCATIONS;