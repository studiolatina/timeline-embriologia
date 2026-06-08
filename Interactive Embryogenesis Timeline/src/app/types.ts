export interface Option { letter: string; text: string }

export interface EventImage { src: string; caption?: string }

export type Track = "single" | "anterior" | "medio" | "posterior";

export interface EventDef {
  id: string;
  code: string;
  title: string;
  organ: string;
  organIcon: string;
  track: Track;
  startWeek: number;
  endWeek: number;
  day: number;
  period: string;
  mainEvent: string;
  development: string[];
  images?: EventImage[];
  question: string;
  options: Option[];
  correctIndex: number;
  explanation: string;
}
