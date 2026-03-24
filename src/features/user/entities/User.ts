import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne} from "typeorm"
import { UserAdvance } from "./UserAdvance"

@Entity("User")
export class User {
  @PrimaryGeneratedColumn()
  UserId!: number

  @Column({
    type: "varchar",
    length: 32,
  })
  UserName!: string

  @Column({
    type: "varchar",
    length: 255,
    nullable: true,
  })
  Pass!: string | null

  @Column({
    type: "varchar",
    length: 36,
  })
  UUID!: string

  @Column({
    type: "varchar",
    length: 128,
  })
  FullName!: string

  @Column({
    type: "varchar",
    length: 64,
    nullable: true,
  })
  Email!: string | null

  @Column({
    type: "varchar",
    length: 16,
    nullable: true,
  })
  PhoneNumber!: string | null

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

  @OneToOne(() => UserAdvance, userAdvance => userAdvance.user)
    userAdvance?: UserAdvance
}
