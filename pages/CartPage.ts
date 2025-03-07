class CartPage {
    private get cartItem() {
        return $('.cart_item');
    }

    private get cartTotal() {
        return $('.total_price');
    }

    async isItemInCart() {
        return await this.cartItem.isDisplayed();
    }

    async getCartTotal() {
        return await this.cartTotal.getText();
    }
}

export default new CartPage();
