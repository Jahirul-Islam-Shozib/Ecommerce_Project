export class CardModel {
  constructor(
    public id: string,
    public name: string,
    public category: string,
    public quantity: number,
    public selectedQuantity: number,
    public remainQuantity: number,
    public price: number
  ) {}
}
