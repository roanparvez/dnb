export interface Note {
  id: string;
  content: string;
  color: string;
  position: {
    x: number;
    y: number;
  };
  zIndex?: number;
  createdAt?: Date;
}
