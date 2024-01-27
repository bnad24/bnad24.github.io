export interface SignRegion {
  region: string;
  value?: number;
  valuePerPop?: number;
  valueSorted?: number;
  valueSortedPerPop?: number;
  pop?: number;
  tg?: string;
}

export interface SignJson {
  stats: SignRegion[];
  total: number;
  totalSorted: number;
  percSorted: number;
  updatedAt: string;
}

export interface Meme {
  id: string;
  url: string;
}

export interface MemesJson {
  memes: Meme[];
  updatedAt: string;
}
