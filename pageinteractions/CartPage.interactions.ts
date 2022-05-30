import { HomePage } from "../page/AutomationPracticeHome.page";
import { test, Page, expect } from '@playwright/test';
import { CommonInteractions } from "./Common.interactions";
import { ProductInformation } from "../datavalidationclass/ProductInformation";
import { CartPage } from "../page/Cart.page";

export class CartPageInteractions extends CommonInteractions{

    page: Page;

    constructor (page: Page) {
        super(page)
        this.page = page;
    }

    async checkThatItemIsInCart(expectedProductInfo: ProductInformation) {
        await this.page.locator(CartPage.cartRows).nth(0).waitFor();
        const numberOfItemsInCart: number = await this.page.locator(CartPage.cartRows).count();
        let cartItemProductInfo: ProductInformation;
        for (let item = 0; item < numberOfItemsInCart; item++) {
            cartItemProductInfo = await this.getCartItemProductInfoByIndex(item);
            if (this.cartItemMatchesExpectedProduct(cartItemProductInfo, expectedProductInfo)) {
                return;
            }
        }
        // If expected item was not found in cart, fail the test
        expect(true, "checkThatItemIsInCart failed; Expected item was not found in cart.").toBe(false);
    }

    private async getCartItemProductInfoByIndex(index: number): Promise<ProductInformation> {
        let cartItemProductInfo: ProductInformation = new ProductInformation;
        cartItemProductInfo.productSKU = await this.page.locator(CartPage.productSKUs).nth(index).textContent();
        cartItemProductInfo.productName = await this.page.locator(CartPage.productNames).nth(index).textContent();
        cartItemProductInfo.productPrice = await this.page.locator(CartPage.productPrices).nth(index).textContent();
        cartItemProductInfo.productQuantity = parseInt(await this.page.locator(CartPage.productQuantities).nth(index).getAttribute("value"));
        return cartItemProductInfo;
    }

    private async cartItemMatchesExpectedProduct(cartItemProductInfo: ProductInformation, expectedProductInfo: ProductInformation) : Promise<boolean> {
        let skuValuesMatch: boolean = cartItemProductInfo.productSKU === expectedProductInfo.productSKU;
        let nameValuesMatch: boolean = cartItemProductInfo.productName === expectedProductInfo.productName;
        let priceValuesMatch: boolean = cartItemProductInfo.productPrice === expectedProductInfo.productPrice;
        let quantityValuesMatch: boolean = cartItemProductInfo.productQuantity === expectedProductInfo.productQuantity;
        return skuValuesMatch && nameValuesMatch && priceValuesMatch && quantityValuesMatch;
    }
}