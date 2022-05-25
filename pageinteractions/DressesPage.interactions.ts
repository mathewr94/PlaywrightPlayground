import { DressesPage } from "../page/Dresses.page";
import { expect, Page } from '@playwright/test';
import { CommonInteractions } from "./Common.interactions";

export class DressesPageInteractions extends CommonInteractions{

    page: Page;

    constructor (page: Page) {
        super(page)
        this.page = page;
    }

    async selectHighestPriceDress() {
        const indexOfHighestPriceDress = await this.getIndexOfHighestPriceDress();
        await this.page.locator(DressesPage.dressNames).nth(indexOfHighestPriceDress).click();
    }

    private async getIndexOfHighestPriceDress () : Promise<number> {
        let highestPriceDressIndex: number = 0;
        let highestDressPrice: number = 0.0;
        let highestPriceDressName: string = "";
        await this.page.locator(DressesPage.dressesPrices).nth(0).waitFor();
        const dressesPriceElements = this.page.locator(DressesPage.dressesPrices);
        await this.page.locator(DressesPage.dressNames).nth(0).waitFor();
        const dressesNameElements = this.page.locator(DressesPage.dressesPrices);
        // Equality check for number of dress names and dress prices on the webpage
        expect (dressesNameElements.count() == dressesPriceElements.count());
        const numberOfDresses = await dressesPriceElements.count();
        // Presence check validation (ensuring there are dress prices on the page at all)
        expect(numberOfDresses).toBeGreaterThan(0);
        // Loop through all dress prices and record the dress with the highest price
        for (let i = 0; i < numberOfDresses; i++) {
            const currentDressPriceString: string = await dressesPriceElements.nth(i).textContent();
            const currentDressPrice: number = await this.convertDressPriceStringToFloat(currentDressPriceString);
            if (currentDressPrice > highestDressPrice) {
                highestDressPrice = currentDressPrice;
                highestPriceDressIndex = i;
                highestPriceDressName = await dressesNameElements.nth(i).textContent();
            }
        }
        expect(highestDressPrice).toBeGreaterThan(0.0);
        return highestPriceDressIndex;
    }

    private async convertDressPriceStringToFloat (dressPriceString: string) : Promise<number> {
        dressPriceString = dressPriceString.replace("$", "");
        dressPriceString = dressPriceString.trim();
        return parseFloat(dressPriceString);
    }
}