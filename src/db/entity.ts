import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ObjectID,
  PrimaryColumn,
  ObjectIdColumn,
} from "typeorm";

@Entity()
export class User {
  // @ObjectIdColumn()
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  email: string;

  @Column("boolean", { default: false })
  isAdmin: boolean;

  @Column({ default: "" })
  firstName: string;

  @Column({ default: "" })
  LastName: string;

  @Column()
  salt: string;

  @Column()
  password: string;

  @Column({ default: `${new Date()}` })
  created_at: string;

  @Column("boolean", { default: false })
  isDeleted: boolean;

  @Column({ default: "" })
  deleted_at: string;
}
function ObjectIDColumn() {
  throw new Error("Function not implemented.");
}
