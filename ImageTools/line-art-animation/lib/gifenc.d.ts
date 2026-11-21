declare module 'gifenc' {
  export interface WriteFrameOptions {
    palette?: number[][];
    delay?: number;
    repeat?: number;
    transparent?: boolean;
    transparentIndex?: number;
    dispose?: number;
    first?: boolean;
  }

  export interface GIFEncoderInstance {
    writeFrame(index: Uint8Array | Uint8ClampedArray, width: number, height: number, opts?: WriteFrameOptions): void;
    finish(): void;
    bytes(): Uint8Array;
    bytesView(): Uint8Array;
    reset(): void;
  }

  export function GIFEncoder(opt?: { initialCapacity?: number; auto?: boolean }): GIFEncoderInstance;
  export function quantize(rgba: Uint8Array | Uint8ClampedArray, maxColors: number, opts?: { format?: string }): number[][];
  export function applyPalette(rgba: Uint8Array | Uint8ClampedArray, palette: number[][], format?: string): Uint8Array;
}
