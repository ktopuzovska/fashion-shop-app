class ProductPage {
    private get addToCartButton() {
        return $('button[name="Submit"]');
    }

    private get proceedToCheckoutButton() {
        return $('a[title="Proceed to checkout"]');
    }

    async addToCart() {
        await this.addToCartButton.click();
    }

    async proceedToCheckout() {
        await this.proceedToCheckoutButton.click();
    }
}

export default new ProductPage();
