import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("users")
class User {
  @PrimaryColumn()
  id: String;

  @Column()
  name: String;

  @Column()
  password: String;

  @Column()
  email: String;

  @Column()
  driver_license: String;

  @Column()
  is_admin: String;

  @CreateDateColumn()
  created_at: String;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { User };
