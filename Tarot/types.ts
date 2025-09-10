
export interface TarotCard {
  name: string;
  imageUrl: string;
}

export interface ReadingCard extends TarotCard {
  reversed: boolean;
}
