import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTrainerDto {

  @ApiProperty({ example: 'Ash Ketchum', description: 'Trainer name'  })
  @IsString()
  @IsNotEmpty()
  public name: string;

  @ApiProperty({ example: 'Pallet Town', description: 'Trainer city of origin', required: false })
  @IsOptional()
  @IsString()
  public cityOfOrigin?: string;
}
