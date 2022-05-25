import { HomePage } from "../page/AutomationPracticeHome.page";
import { Page } from '@playwright/test';
import { CommonInteractions } from "./Common.interactions";

export class HomePageInteractions extends CommonInteractions{

    page: Page;

    constructor (page: Page) {
        super(page)
        this.page = page;
    }

    async navigateToDressesPage() {
        // Click the Dresses item from the nav bar
        await this.page.locator(HomePage.dressesNavBarItem).click();
    }
}