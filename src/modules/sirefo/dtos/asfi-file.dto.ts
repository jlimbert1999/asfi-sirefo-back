import { IsNotEmpty, IsString } from 'class-validator';

export class AsfiFileDto {
  @IsNotEmpty()
  @IsString()
  fileName: string;

  @IsNotEmpty()
  @IsString()
  originalName: string;
}
