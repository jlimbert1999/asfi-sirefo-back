import { IsString } from 'class-validator';

export class PingDto {
  @IsString()
  message: string;
}
