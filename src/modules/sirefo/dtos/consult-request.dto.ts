import { Type } from 'class-transformer';
import { IsDate, IsIn, IsNumber, IsOptional } from 'class-validator';

export class ConsultRequestDto {
  @IsNumber()
  @Type(() => Number)
  id: number;

  @IsIn([1, 2, 4])
  @Type(() => Number)
  type: 1 | 2 | 4;
}

export class FilterAsfiRequestList {
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  date?: Date;
}
