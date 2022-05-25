

export class ProductInformation {

    private _productSKU: string;
    private _productName: string;
    private _productPrice: string;
    private _productQuantity: number;

    constructor () {
        
    }

    // Getters

    public get productSKU(): string {
        return this._productSKU;
    }

    public get productName(): string {
        return this._productName;
    }

    public get productPrice(): string {
        return this._productPrice;
    }

    public get productQuantity(): number {
        return this._productQuantity;
    }

    // Setters

    public set productSKU(productSKU: string) {
        this._productSKU = productSKU;
    }

    public set productName(productName: string) {
        this._productName = productName;
    }

    public set productPrice(productPrice: string) {
        this._productPrice = productPrice;
    }

    public set productQuantity(productQuantity: number) {
        this._productQuantity = productQuantity;
    }


}