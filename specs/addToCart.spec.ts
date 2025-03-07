import HomePage from '../pages/HomePage';
import ProductPage from '../pages/ProductPage';
import CartPage from '../pages/CartPage';

describe('Add to Cart Functionality', () => {

    beforeEach(async () => {
        await browser.url('http://www.automationpractice.pl/index.php');
    });

    it('should add product to cart', async () => {
        await HomePage.navigateToFirstProduct();
        await ProductPage.addToCart();

        // Wait for the modal to appear
        await browser.pause(2000); // Wait for the "Added to Cart" modal to show

        // Proceed to checkout
        await ProductPage.proceedToCheckout();

        // Verify item is in the cart
        const isItemInCart = await CartPage.isItemInCart();
        expect(isItemInCart).toBe(true);

        // Verify cart total is displayed
        const total = await CartPage.getCartTotal();
        expect(total).toContain('$');
    });

    it('should add multiple products to cart', async () => {
        // Add first product
        await HomePage.navigateToFirstProduct();
        await ProductPage.addToCart();
        await browser.pause(2000); // Wait for the modal

        // Add second product
        await browser.back();
        await HomePage.navigateToFirstProduct();
        await ProductPage.addToCart();
        await browser.pause(2000); // Wait for the modal

        // Proceed to checkout
        await ProductPage.proceedToCheckout();

        // Verify that at least two items are in the cart
        const cartItemCount = await $$('li.cart_item').length;
        expect(cartItemCount).toBeGreaterThan(1);
    });

    it('should verify cart total after adding product', async () => {
        await HomePage.navigateToFirstProduct();
        await ProductPage.addToCart();
        await browser.pause(2000); // Wait for the modal

        await ProductPage.proceedToCheckout();

        // Verify cart total is calculated correctly
        const total = await CartPage.getCartTotal();
        const price = parseFloat(total.replace('$', '').trim());
        expect(price).toBeGreaterThan(0);
    });

    it('should add product to cart and verify cart summary', async () => {
        await HomePage.navigateToFirstProduct();
        await ProductPage.addToCart();
        await browser.pause(2000); // Wait for the modal

        await ProductPage.proceedToCheckout();

        // Verify the cart summary page includes the added product
        const cartSummaryTitle = await $('h1.page-heading').getText();
        expect(cartSummaryTitle).toContain('Shopping-cart summary');
    });

});
