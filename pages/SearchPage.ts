
class SearchPage {
    private get searchInput() {
        return $('#search_query_top'); // Search bar input
    }

    private get searchButton() {
        return $('button[name="submit_search"]'); // Search button
    }

    private get searchResults() {
        return $('.product_list'); // Container for search results
    }

    private get noResultsMessage() {
        return $('.alert-warning'); // No results found message
    }

    async searchForProduct(product: string): Promise<void> {
        await this.searchInput.setValue(product);
        await this.searchButton.click();
    }

    async isProductListDisplayed(): Promise<boolean> {
        return await this.searchResults.isDisplayed();
    }

    async getNoResultsMessage(): Promise<string> {
        return await this.noResultsMessage.getText();
    }
}

export default new SearchPage();
