import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";

import { ISearchHistory } from "../interfaces";

@Entity({
  name: "search_history",
  orderBy: {
    created_at: "ASC",
  },
})
export default class SearchHistory
  extends BaseEntity
  implements ISearchHistory
{
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "text" })
  email!: string;

  @Column({ type: "text" })
  searched_coin!: string;

  @Column({ type: "timestamptz" })
  searched_at!: Date;

  @CreateDateColumn({
    type: "timestamptz",
    select: false,
  })
  created_at!: Date;

  @UpdateDateColumn({ type: "timestamptz", select: false })
  updated_at!: Date;

  @DeleteDateColumn({ type: "timestamptz", select: false })
  deleted_at!: Date;
}
