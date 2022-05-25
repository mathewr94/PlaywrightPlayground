import { CommonInteractions } from "../pageinteractions/Common.interactions";
import { Url } from "../constants/Url.constants";
import { HomePageInteractions } from "../pageinteractions/AutomationPracticeHomePage.interactions";
import { DressesPageInteractions } from "../pageinteractions/DressesPage.interactions";
import { ProductInformation } from "../datavalidationclass/ProductInformation";
import { ProductInformationPageInteractions } from "../pageinteractions/ProductInformationPage.interactions";
import { CartPageInteractions } from "../pageinteractions/CartPage.interactions";

const { test } = require('@playwright/test');

test('test', async ({ page }) => {
  let onBrowser = new CommonInteractions(page);
  let onHomePage = new HomePageInteractions(page);
  let onDressesPage = new DressesPageInteractions(page);
  let onProductInfoPage = new ProductInformationPageInteractions(page);
  let onCartPage = new CartPageInteractions(page);

  await onBrowser.navigateToUrl(Url.automationPracticeWebsite);
  await onHomePage.navigateToDressesPage();
  await onDressesPage.selectHighestPriceDress();
  let highestPriceDressInfo: ProductInformation = await onProductInfoPage.recordProductDetails();
  await onProductInfoPage.addProductToCart();
  await onProductInfoPage.clickProceedToCheckoutButtonFromPopup();
  await onCartPage.checkThatItemIsInCart(highestPriceDressInfo);
});