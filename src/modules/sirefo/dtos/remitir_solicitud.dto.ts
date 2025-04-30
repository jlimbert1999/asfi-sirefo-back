import { Transform, Type } from 'class-transformer';
import {
  IsPositive,
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
} from 'class-validator';
import {
  IsDocumentNumber,
  IsExtensionValid,
  IsNullForLegalEntity,
} from '../decorators';

const VALID_EXTENSIONS = [
  'CH',
  'LP',
  'CB',
  'OR',
  'PO',
  'TJ',
  'SC',
  'BE',
  'PA',
  'PE',
];

export class ItemSolicitudDto {
  @IsString()
  @IsOptional()
  @IsNullForLegalEntity()
  maternalLastName: string;

  @IsString()
  @IsOptional()
  @IsNullForLegalEntity()
  paternalLastName: string;

  @IsString()
  @IsOptional()
  autoConclusion?: string;

  @Transform(({ value }) => (value ? String(value) : value))
  @IsString()
  @IsOptional()
  complement?: string;

  @IsString()
  @IsOptional()
  @IsExtensionValid(VALID_EXTENSIONS)
  extension: string;

  @Transform(({ value }) => (value ? String(value) : value))
  @IsString()
  @IsDocumentNumber(VALID_EXTENSIONS)
  documentNumber: string;

  @IsIn([1, 2, 3, 4, 5])
  @Type(() => Number)
  documentType: number;

  @IsString()
  supportDocument: string;

  @IsNumber()
  @IsPositive()
  item: number;

  @Transform(({ value }) => {
    return value !== undefined && value !== null
      ? parseFloat(value).toFixed(2)
      : value;
  })
  @IsDecimal({
    decimal_digits: '2',
  })
  amount: string;

  @IsString()
  @IsOptional()
  @IsNullForLegalEntity()
  firstName: string;

  @ValidateIf((obj) => [1, 3].includes(obj.documentType))
  @IsString()
  @IsNotEmpty()
  businessName: string;

  @IsIn([1, 2, 3, 4])
  supportType: string;
}

export class RemitirSolicitudDto {
  // TODO Database id
  @IsString()
  id: string;

  // TODO File uploaded
  // attachment: string;

  // quantityDetail: number // * detail length

  // sentDate: string  // * current date;

  // organization: string  // * Enviroments;

  // TODO User auth
  // user: string;

  @IsString()
  @IsNotEmpty()
  attachmentName: string;

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
  @Type(() => ItemSolicitudDto)
  @ArrayMinSize(1)
  details: ItemSolicitudDto[];
}
