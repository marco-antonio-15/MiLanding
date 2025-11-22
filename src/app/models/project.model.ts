export interface Project {
  id: string;
  title: string;
  short: string;
  long?: string;
  stack: string[];
  img?: string;
  linkRepo?: string;
  linkLive?: string;
  tags?: string[];
  category?: string;
  linkDemo?: string;
}
