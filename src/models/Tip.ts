export default interface Tip {
  _id?: string;
  uuid: string;
  from: string;
  from_id: string;
  text: string;
  photoURL?: string;
  date: Date;
  stars: string[];
}
