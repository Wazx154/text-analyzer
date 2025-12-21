export interface Complaint {
  id: string;
  institute: string;
  department: string;
  type: string;
  description: string;
  date: string;
  status: 'pending' | 'resolved' | 'rejected';
}

export const COMPLAINTS_KEY = 'vocational_training_complaints';

export function getComplaints(): Complaint[] {
  const stored = localStorage.getItem(COMPLAINTS_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function saveComplaint(complaint: Complaint) {
  const complaints = getComplaints();
  complaints.unshift(complaint);
  localStorage.setItem(COMPLAINTS_KEY, JSON.stringify(complaints));
}

export function getComplaintById(id: string): Complaint | undefined {
  const complaints = getComplaints();
  return complaints.find(c => c.id === id);
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 9).toUpperCase();
}
