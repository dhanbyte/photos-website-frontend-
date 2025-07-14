export interface Event {
  _id: string;
  name: string;
  date: string;
  coverImage?: string;
}

export interface State {
  _id: string;
  name: string;
  eventId: string;
}

export interface Photo {
  _id: string;
  imageUrl: string;
  uploadedAt: string;
  eventId: string;
  state: string;
} 