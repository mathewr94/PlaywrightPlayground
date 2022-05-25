import { Page } from '@playwright/test';

export class CommonInteractions {

    page: Page;

    constructor (page: Page) {
        this.page = page;
    }

    async navigateToUrl(url : string) {
        await this.page.goto(url);
    }
}