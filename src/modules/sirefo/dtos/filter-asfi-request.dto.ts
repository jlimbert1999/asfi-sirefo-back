import { Transform, Type } from 'class-transformer';
import { IsOptional, IsIn, IsBoolean, IsDate } from 'class-validator';
import { PaginationDto } from 'src/modules/common';

export class FilterAsfiRequestDto extends PaginationDto {
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  createdAt?: Date;

  @IsIn(['R', 'S'])
  @IsOptional()
  processType?: 'R' | 'S';

  @IsIn(['pending', 'completed'])
  @IsOptional()
  status: 'pending' | 'completed';

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true') return true;  
    if (value === 'false') return false;
    return value;
  })
  isAproved?: boolean;
}
