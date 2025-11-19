import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PokemonResponseDto } from '../teamPokemon/dto/pokemon-response.dto';

@Injectable()
export class PokeapiService {
  private readonly apiUrl: string = "https://pokeapi.co/api/v2/pokemon"

  async getPokemonDetails(id: number | string): Promise<PokemonResponseDto> {
  const idOrName = String(id).toLowerCase();
  const url = `${this.apiUrl}/${idOrName}`;

    const response = await fetch(url)

    if (!response.ok) {
      if (response.status === 404) {
        throw new NotFoundException('PokeAPI could not found this Pokémon.');
      }
      throw new InternalServerErrorException('Error connecting to PokeAPI.');
    }

    const pokemon = await response.json();

    return {
      id: pokemon.id,
      name: pokemon.name,
      types: pokemon.types,
      sprite: pokemon.sprite
    }
  }

}
