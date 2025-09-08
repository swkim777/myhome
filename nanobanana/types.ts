
export enum GenerationMode {
  TextToImage = 'TextToImage',
  ImageAndText = 'ImageAndText',
  MultiImage = 'MultiImage',
}

export interface Inspiration {
  title: string;
  description: string;
  prompt: string;
  mode: GenerationMode;
  imagePlaceholders: number;
}

export interface PromptTemplate {
  title: string;
  template: string;
}
