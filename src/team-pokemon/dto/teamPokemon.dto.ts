import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TeamPokemonDto {

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  public pokemonIdOrName: string;
}
