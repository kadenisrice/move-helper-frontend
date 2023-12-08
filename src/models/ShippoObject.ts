export default interface ShipmentObject {
  object_id: string;
  rates: Rate[];
}

interface Rate {
  object_id: string;
  amount: string;
  currency: string;
  attributes: string[];
  provider: string;
  provider_image_75: string;
  provider_image_200: string;
  arrives_by: string | null;
  duration_terms: string;
  estimated_days: number;
}
