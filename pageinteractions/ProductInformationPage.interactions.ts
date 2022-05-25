import { ProductInformationPage } from "../page/ProductInformation.page";
import { ProductInformation } from "../datavalidationclass/ProductInformation";
import { Page } from '@playwright/test';
import { CommonInteractions } from "./Common.interactions";

export class ProductInformationPageInteractions extends CommonInteractions{

    page: Page;

    constructor (page: Page) {
        super(page)
        this.page = page;
    }

    async recordProductDetails() : Promise<ProductInformation> {
        let productInformation = new ProductInformation();
        productInformation.productSKU = await this.getProductSKU();
        productInformation.productName = await this.getProductName();
        productInformation.productPrice = await this.getProductPrice();
        productInformation.productQuantity = await this.getProductQuantity();
        return productInformation;
    }

    private async getProductSKU(): Promise<string> {
        return await this.page.locator(ProductInformationPage.productSKULabel).textContent();
    }

    private async getProductName(): Promise<string> {
        return await this.page.locator(ProductInformationPage.productNameH1).textContent();
    }

    private async getProductPrice(): Promise<string> {
        return await this.page.locator(ProductInformationPage.productPriceLabel).textContent();
    }

    private async getProductQuantity(): Promise<number> {
        const productQuantityAsString: string = await this.page.locator(ProductInformationPage.productQuantityValue).getAttribute("value");
        return parseInt(productQuantityAsString);
    }

    async addProductToCart() {
        await this.page.locator(ProductInformationPage.addToCartButton).click();
    }

    async clickProceedToCheckoutButtonFromPopup() {
        await this.page.locator(ProductInformationPage.proceedToCheckoutButton).click();
    }
}