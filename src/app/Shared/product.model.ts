export class ProductModel {
  constructor(
    public id: string,
    public name: string,
    public category: string,
    public imagePath: string,
    public quantity: number,
    public selectedQuantity: number,
    public availableQuantity: number,
    public price: number
  ) {}
}
