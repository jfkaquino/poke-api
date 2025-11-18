import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PokemonDetails } from '../team-pokemon/interface/teamPokemon.interface';

@Injectable()
export class PokeapiService {
  private readonly apiUrl: string = "https://pokeapi.co/api/v2/pokemon"

  async getPokemonDetails(id: number | string): Promise<PokemonDetails> {
    const idOrName = String(id).toLowerCase();
    const url = `${this.apiUrl}/${idOrName}`;

      const response = await fetch(url)

      if (!response.ok) {
        if (response.status === 404) {
          throw new NotFoundException();
        }
        throw new InternalServerErrorException();
      }

      return await response.json();
  }

}
