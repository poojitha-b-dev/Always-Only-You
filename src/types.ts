export type UserProfile = 'pooja' | 'kash';

export interface NoteItem {
  id: string;
  sender: UserProfile;
  recipient: UserProfile;
  content: string;
  timestamp: string;
  isRead: boolean;
}

export interface Memory {
  id: string;
  category: 'dates' | 'trips' | 'midnight-calls' | 'temple' | 'videos';
  date: string;
  title: string;
  description: string;
  photoUrl: string;
}