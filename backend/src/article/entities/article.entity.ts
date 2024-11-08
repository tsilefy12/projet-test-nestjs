import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('article')
export class Article {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    @IsString()
    articleName: string;

    @ApiProperty() 
    @Column() 
    @IsNumber()
    quantity: number;

    @ApiProperty()
    @Column()
    @IsNumber()
    user_id: number;
}
