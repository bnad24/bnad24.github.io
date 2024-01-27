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
