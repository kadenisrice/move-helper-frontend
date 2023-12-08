export default interface ShipmentData {
  address_from: Address;
  address_to: Address;
  parcels: Parcel[];
  async: boolean;
}
interface Address {
  name: string;
  street1: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
  email: string;
}
interface Parcel {
  length: string;
  width: string;
  height: string;
  distance_unit: string;
  weight: string;
  mass_unit: string;
}
