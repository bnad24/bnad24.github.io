export interface SignRegion {
  region: string;
  value?: number;
  tg?: string;
}

export interface SignJson {
  regionsAndValues: SignRegion[];
  total: number;
  updatedAt: string;
}
