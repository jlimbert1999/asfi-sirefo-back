import { IsNotEmpty, IsString } from 'class-validator';

export class AsfiCredentialsDto {
  @IsString()
  @IsNotEmpty()
  asfiUsername: string;

  @IsString()
  @IsNotEmpty()
  asfiPassword: string;
}
