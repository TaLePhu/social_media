import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { User } from "./User";

@Entity("UserAdvance")
export class UserAdvance {
  @PrimaryColumn({ name: "UserId", type: "int" })
  userId!: number;

  @OneToOne(() => User, (user) => user.userAdvance, { onDelete: "CASCADE" })
  @JoinColumn({ name: "UserId" })
  user!: User;

  @Column({ name: "Address", type: "varchar", length: 256, nullable: true })
  address!: string;

  @Column({ name: "DOB", type: "date", nullable: true })
  dob!: Date;

  @Column({ name: "ProfileUrl", type: "varchar", length: 128, nullable: true })
  profileUrl!: string;

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
}
