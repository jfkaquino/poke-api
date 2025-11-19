import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePokemonDto {

  @ApiProperty({ examples: ['pikachu', "25"], description: 'Pokémon name or ID' })
  @IsNotEmpty()
  @IsString()
  public pokemonIdOrName: string;
}
