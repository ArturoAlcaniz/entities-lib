import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    ID: string;

    @Column({type: 'varchar', length: 50, unique: true})
    USERNAME: string;

    @Column({type: 'varchar', nullable: false, length: 50, unique: true})
    EMAIL: string;

    @Column({type: 'varchar', default: 'User', nullable: false, length: 10})
    ROL: string;

    @Column({type: 'varchar', nullable: true, default: null, length: 100})
    PASSWORD: string;

    @CreateDateColumn()
    CREATED_AT: 'string';

    @UpdateDateColumn()
    UPDATED_AT: 'string';

}