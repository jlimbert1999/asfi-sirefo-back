import { plainToInstance } from 'class-transformer';
import { IsString, validateSync } from 'class-validator';

export class EnvVars {
  @IsString()
  ASFI_USER: string;

  @IsString()
  ASFI_PASSWORD: string;

  @IsString()
  ASFI_ENDPOINT: string;

  @IsString()
  HOST: string;

  @IsString()
  JWT_KEY: string;

  @IsString()
  ENCRYPTION_KEY: string;
}

export function validate(config: Record<string, unknown>): EnvVars {
  const validatedConfig = plainToInstance(EnvVars, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
