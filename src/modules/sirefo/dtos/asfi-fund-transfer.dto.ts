import {
  ArrayMinSize,
  IsArray,
  IsDecimal,
  IsIn,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  Validate,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { IsDocumentNumber, IsExtensionValid, IsUniqueItem, IsValidPersonConstraint } from '../decorators';
import { AsfiFileDto } from './asfi-file.dto';
import { VALID_EXTENSIONS } from '../constants';
import { PartialType } from '@nestjs/mapped-types';

export class ItemFundTransferDto {
  @Validate(IsValidPersonConstraint)
  maternalLastName: string;

  @Validate(IsValidPersonConstraint)
  paternalLastName: string;

  @Validate(IsValidPersonConstraint)
  firstName: string;

  @Transform(({ value }) => (value ? String(value) : value))
  @IsString()
  @IsOptional()
  complement?: string;

  @Validate(IsExtensionValid, VALID_EXTENSIONS)
  extension: string;

  @IsString()
  @IsNotEmpty()
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

  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  accountNumber: string;

  @IsIn([1, 2, 3, 4])
  @Type(() => Number)
  accountCurrency: number;

  @IsString()
  @IsNotEmpty()
  transferCode: string;
}

export class CreateAsfiFundTransferDto {
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

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItemFundTransferDto)
  @ArrayMinSize(1)
  @IsUniqueItem('item', { message: 'Cada item debe ser único' })
  details: ItemFundTransferDto[];

  @IsUUID()
  asfiRequestId: string;

  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => AsfiFileDto)
  file: AsfiFileDto;

  @IsString()
  @IsNotEmpty()
  dataSheetFile: string;
}

export class UpdateAsfiFundTransferDto extends PartialType(CreateAsfiFundTransferDto) {}
