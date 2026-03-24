import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { User } from "./User"

@Entity("UserAdvance")
export class UserAdvance {
  @PrimaryColumn()
  UserId!: number

  @Column({
    type: "varchar",
    length: 256,
    nullable: true,
  })
  Address!: string | null

  @Column({
    type: "date",
    nullable: true,
  })
  DOB!: Date | null

  @Column({
    type: "varchar",
    length: 128,
    nullable: true,
  })
  ProfileUrl!: string | null

  @Column({
    type: "int",
    default: 1,
  })
  CreatedBy!: number

  @CreateDateColumn()
  CreatedDate!: Date

  @Column({
    type: "int",
    default: 1,
  })
  UpdatedBy!: number

  @UpdateDateColumn()
  UpdatedDate!: Date

  // Relation
  @OneToOne(() => User)
  @JoinColumn({ name: "UserId" })
  user!: User
}