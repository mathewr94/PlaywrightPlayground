export class CartPage {
    static readonly cartRows = "table#cart_summary tbody tr";
    static readonly productSKUs = "td.cart_description small.cart_ref";
    static readonly productNames = "td.cart_description p.product-name";
    static readonly productPrices = "td.cart_unit span.price";
    static readonly productQuantities = "td.cart_quantity.text-center input[type=hidden]";
}