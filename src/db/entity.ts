import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  email: string;

  @Column({ default: "" })
  firstName: string;

  @Column({ default: "" })
  LastName: string;

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
