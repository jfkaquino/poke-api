import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTrainerDto {

  @ApiProperty({ example: 'Ash Ketchum' })
  @IsString()
  @IsNotEmpty()
  public name: string;

  @ApiProperty({ example: 'Pallet Town', required: false })
  @IsOptional()
  @IsString()
  public cityOfOrigin?: string;
}
