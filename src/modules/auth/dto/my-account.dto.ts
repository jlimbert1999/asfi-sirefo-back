import { IsNotEmpty, MinLength } from 'class-validator';
export class UpdateMyUserDto {
  @MinLength(4)
  @IsNotEmpty()
  password: string;
}
