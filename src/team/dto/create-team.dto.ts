import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTeamDto {

  @ApiProperty({ example: 'Kanto' })
  @IsNotEmpty()
  @IsString()
  public name: string;
}
