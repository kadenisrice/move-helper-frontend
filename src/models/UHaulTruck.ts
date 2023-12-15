export default interface UHaul {
  type: string;
  movingType: string;
  dimensions: {
    inside: string;
    doorOpening?: string;
    deckHeight?: string;
    length?: string;
    loadingRamp?: string;
  };
  rate: {
    baseRate: number;
    perMile: number;
  };
  image: string;
  volume: number;
}
