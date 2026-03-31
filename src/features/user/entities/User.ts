import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserAdvance } from "./UserAdvance";

@Entity("User")
export class User {
  @PrimaryGeneratedColumn({ name: "UserId", type: "int" })
  userId!: number;

  @Column({ name: "username", type: "varchar", length: 32 })
  userName!: string;

  @Column({ name: "Pass", type: "varchar", length: 255, nullable: true })
  pass!: string | null;

  @Column({ name: "UUID", type: "varchar", length: 36 })
  uuid!: string;

  @Column({ name: "FullName", type: "varchar", length: 128 })
  fullName!: string;

  @Column({ name: "Email", type: "varchar", length: 64, nullable: true })
  email!: string | null;

  @Column({ name: "PhoneNumber", type: "varchar", length: 16, nullable: true })
  phoneNumber!: string | null;

  @Column({ name: "CreatedBy", type: "int", default: 1 })
  createdBy!: number;

  @Column({
    name: "CreatedDate",
    type: "datetime",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdDate!: Date;

  @Column({ name: "UpdatedBy", type: "int", default: 1 })
  updatedBy!: number;

  @Column({
    name: "UpdatedDate",
    type: "datetime",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedDate!: Date;

  @OneToOne(() => UserAdvance, (userAdvance) => userAdvance.user)
  userAdvance?: UserAdvance;
  
}
