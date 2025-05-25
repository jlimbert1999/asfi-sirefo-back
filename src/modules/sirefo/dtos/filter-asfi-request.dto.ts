import { IsOptional, IsIn, IsDate, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';

import { PaginationDto } from 'src/modules/common';
import { AsfiRequestStatus } from 'generated/prisma';

export class FilterAsfiRequestDto extends PaginationDto {
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  createdAt?: Date;

  @IsIn(['R', 'S'])
  @IsOptional()
  processType?: 'R' | 'S';

  @IsEnum(AsfiRequestStatus)
  @IsOptional()
  status?: AsfiRequestStatus;
}
