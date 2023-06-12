import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'default_username' })
  username: string;

  @Column({ nullable: true, default: null })
  messages: string;
  
  
}
