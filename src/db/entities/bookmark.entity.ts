import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  ManyToMany,
} from "typeorm";
import { User } from "./user.entity.js";

@Entity()
export class Bookmark {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  title: string;

  @Column("simple-json", { nullable: false })
  thumbnail: {
    trending?: {
      small: string;
      large: string;
    };
    regular: {
      small: string;
      medium: string;
      large: string;
    };
  };

  @Column()
  year: number;

  @Column()
  category: string;

  @Column()
  rating: string;

  @Column()
  isTrending: boolean;

  @ManyToMany(() => User, (user) => user.bookmarks)
  users?: string[];

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;

  @Column("boolean", { default: false })
  isDeleted: boolean;

  @DeleteDateColumn()
  deleted_at: string;
}
