import { Transform, Type } from 'class-transformer';
import { PartialType } from '@nestjs/mapped-types';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsIn,
  IsArray,
  ValidateNested,
  ArrayMinSize,
  ValidateIf,
  IsDecimal,
  IsOptional,
  IsNotEmptyObject,
  IsObject,
  Validate,
} from 'class-validator';
import {
  IsAutoConclusionValid,
  IsDocumentNumber,
  IsExtensionValid,
  IsUniqueItem,
  IsValidPersonConstraint,
} from '../decorators';
import { VALID_EXTENSIONS } from '../constants';
import { AsfiFileDto } from './asfi-file.dto';

export class ItemRequestDto {
  @Validate(IsValidPersonConstraint)
  maternalLastName: string;

  @Validate(IsValidPersonConstraint)
  paternalLastName: string;

  @Validate(IsValidPersonConstraint)
  firstName: string;

  @IsString()
  @IsOptional()
  autoConclusion?: string;

  @Transform(({ value }) => (value ? String(value) : value))
  @IsString()
  @IsOptional()
  complement?: string;

  @Validate(IsExtensionValid, VALID_EXTENSIONS)
  extension: string;

  @IsString()
  @Validate(IsDocumentNumber, VALID_EXTENSIONS)
  @Transform(({ value }) => (value ? String(value) : value))
  documentNumber: string;

  @IsIn([1, 2, 3, 4, 5])
  @Type(() => Number)
  documentType: number;

  @IsString()
  supportDocument: string;

  @IsNumber()
  @Type(() => Number)
  item: number;

  @Transform(({ value }) => {
    return value !== undefined && value !== null ? parseFloat(value).toFixed(2) : value;
  })
  @IsDecimal({
    decimal_digits: '2',
  })
  amount: string;

  @ValidateIf((obj) => [1, 3].includes(obj.documentType))
  @IsNotEmpty({ message: 'La razon social es obligatoria para personas juridicas' })
  businessName: string;

  @IsIn([1, 2, 3, 4])
  @Type(() => Number)
  supportType: string;
}

export class CreateAsfiRequestDto {
  @IsString()
  @IsNotEmpty()
  authorityPosition: string;

  @IsString()
  @IsNotEmpty()
  requestingAuthority: string;

  @IsString()
  @IsNotEmpty()
  requestCode: string;

  @IsString()
  @IsNotEmpty()
  department: string;

  @IsIn(['R', 'S'])
  processType: 'R' | 'S';

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItemRequestDto)
  @ArrayMinSize(1)
  @IsUniqueItem('item', { message: 'Cada item debe ser único' })
  @IsAutoConclusionValid()
  details: ItemRequestDto[];

  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => AsfiFileDto)
  file: AsfiFileDto;

  @IsString()
  @IsNotEmpty()
  dataSheetFile: string;
}

export class UpdateAsfiRequestDto extends PartialType(CreateAsfiRequestDto) {}
