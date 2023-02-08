import { Exclude } from "class-transformer";
import { Contains, IsEmpty, IsNotEmpty, IsOptional, Min } from "class-validator/types/decorator/decorators";
import { Column, Entity, IsNull, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Alkalmazott {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    kezdoDatum: Date;

    @Exclude()//ezzel lehet védeni a jelszóókat pl. , hogy ne legyen benne a kimenetben.
    @Column('int')
    haviBer: number;
    
    @Column()
    hivatalosEmail: string;

    @IsNotEmpty()
    @Contains(' ')
    @Column()
    teljesNev: string;

    @Exclude()
    @IsEmpty()
    @Column()
    jelszo: string;

    @IsOptional()
    @Min(0)
    @Column({default: 0})
    beosztottakSzama: number;
}