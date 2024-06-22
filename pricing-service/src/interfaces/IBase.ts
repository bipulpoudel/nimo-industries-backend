import { BaseEntity } from "typeorm";

export default interface IBase extends BaseEntity {
  id: number | string;
}
