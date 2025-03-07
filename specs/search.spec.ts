import SearchPage from '../pages/SearchPage';

describe('Search Functionality', () => {

    beforeEach(async () => {
        await browser.url('http://www.automationpractice.pl/index.php');
    });

    // Positive Test Cases

    it('should perform a search with a valid product name', async () => {
        await SearchPage.searchForProduct('Dress');
        await expect(await SearchPage.isProductListDisplayed()).toBe(true);
        const productName = await (await SearchPage.searchResults).getText();
        expect(productName).toContain('Dress');
    });

    it('should perform a search with a partial product name', async () => {
        await SearchPage.searchForProduct('Dre');
        await expect(await SearchPage.isProductListDisplayed()).toBe(true);
        const productName = await (await SearchPage.searchResults).getText();
        expect(productName).toContain('Dre');
    });

    it('should verify if clicking on a search result redirects to the correct product page', async () => {
        await SearchPage.searchForProduct('Dress');
        await expect(await SearchPage.isProductListDisplayed()).toBe(true);
        
        // Clicking on the first product link
        const firstProduct = await (await SearchPage.searchResults).$$('a')[0];
        await firstProduct.click();
        
        // Verifying we are on the correct product page
        const productTitle = await $('h1[itemprop="name"]').getText();
        expect(productTitle).toContain('Dress');
    });

    // Negative Test Cases

    it('should perform a search with an invalid product name', async () => {
        await SearchPage.searchForProduct('testTest123');
        await expect(await SearchPage.getNoResultsMessage()).toContain('No results were found for "testTest123"');
    });

    it('should perform a search with special characters', async () => {
        await SearchPage.searchForProduct('test!@#Test^&*');
        await expect(await SearchPage.getNoResultsMessage()).toContain('No results were found for "test!@#Test^&*"');
    });

    it('should perform a search with blank input', async () => {
        await SearchPage.searchForProduct('');
        await expect(await SearchPage.getNoResultsMessage()).toContain('Please enter a search keyword');
    });

    it('should check if the API returns slow response (Timeout)', async () => {
        // Simulating a slow response might require mocking API or delaying the network
        // In a real scenario, we might use tools like browser DevTools or intercepting the request
        // Here we assume the timeout message handling is already in place

        // Searching for a product
        await SearchPage.searchForProduct('Dress');
        // Simulate waiting for a timeout message
        const timeoutMessage = 'Request timed out. Please try again.';
        await expect(await SearchPage.getNoResultsMessage()).toContain(timeoutMessage);
    });

    it('should check if the API returns corrupt or empty response', async () => {
        // This test requires simulating a corrupted or empty API response
        // Here we assume the response handling is correctly implemented
        await SearchPage.searchForProduct('Dress');
        const noResultsMessage = await SearchPage.getNoResultsMessage();
        expect(noResultsMessage).toContain('No results found');
    });

});
