import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Bookmark } from "./bookmark.entity.js";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  email: string;

  @Column({ default: "" })
  firstName: string;

  @Column({ default: "" })
  lastName: string;

  @ManyToMany(() => Bookmark, (bookmark) => bookmark.users, {
    cascade: ["update"],
  })
  @JoinTable()
  bookmarks: Bookmark[];

  @Column("boolean", { default: false })
  isAdmin: boolean;

  @Column()
  salt: string;

  @Column()
  password: string;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;

  @Column("boolean", { default: false })
  isDeleted: boolean;

  @DeleteDateColumn()
  deleted_at: string;
}
