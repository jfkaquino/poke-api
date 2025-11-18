export interface TypeDetail {
  name: string;
  url: string;
}

export interface TypeSlot {
  slot: number;
  type: TypeDetail;
}

export interface PokemonDetails {
  id: number;
  name: string;
  types: TypeSlot[];
  sprites: {
    front_default: string;
  };
}