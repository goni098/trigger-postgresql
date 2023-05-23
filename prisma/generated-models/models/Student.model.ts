import { IsInt, IsDefined, IsString } from "class-validator";
import "./";

export class Student {
    @IsDefined()
    @IsInt()
    id!: number;

    @IsDefined()
    @IsInt()
    age!: number;

    @IsDefined()
    @IsString()
    name!: string;

    @IsDefined()
    @IsString()
    class!: string;
}
