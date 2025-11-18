import { Module } from '@nestjs/common';
import { PokeapiService } from './pokeapi.service';

@Module({
  providers: [PokeapiService],
  exports: [PokeapiService],
})
export class PokeapiModule {}
