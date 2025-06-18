export type ICell = {
  visible: boolean,
  flag: boolean,
  type: 'empty' | 'bomb',
  environment?: number
}

export const createField = (width: number, height: number): ICell[][] => {
    const field : ICell[][] = [];
    for (let i = 0; i < height; i++) {
      field[i] = [];
      for (let j = 0; j < width; j++) {
        field[i][j] = {
          visible: false,
          flag: false,
          type: 'empty'
        }
      }
    }
  return field
}
