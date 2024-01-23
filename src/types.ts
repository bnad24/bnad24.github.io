export interface SignRegion {
  region: string;
  value?: number;
}

export interface SignJson {
  regionsAndValues: SignRegion[];
  total: number;
  updatedAt: string;
}
