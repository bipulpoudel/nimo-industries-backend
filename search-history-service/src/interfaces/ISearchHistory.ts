import IBase from "./IBase";

export default interface ISearchHistory extends IBase {
  email: string;
  searched_coin: string;
}
