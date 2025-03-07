class HomePage {
    private get userAccount() {
        return $('#header .account'); // Element that confirms login
    }

    private get firstProduct() {
        return $('ul.product_list li:first-child a.product_img_link');
    }

    async isUserLoggedIn() {
        return await this.userAccount.isDisplayed();
    }

    async navigateToFirstProduct() {
        await this.firstProduct.click();
    }
}

export default new HomePage();
