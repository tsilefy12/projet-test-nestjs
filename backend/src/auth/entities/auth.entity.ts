import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('auth')
export class Auth {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @ApiProperty()
    email: string;

    @Column()
    @ApiProperty()
    password: string;
}
