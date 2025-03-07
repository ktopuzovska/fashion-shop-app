import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';

describe('Login Functionality', () => {

    beforeEach(async () => {
        await LoginPage.open();
    });

    it('should login with valid credentials', async () => {
        await LoginPage.login('testuser@example.com', 'correctpassword');
        await expect(await HomePage.isUserLoggedIn()).toBe(true);
    });

    it('should display error for invalid credentials', async () => {
        await LoginPage.login('invalid@example.com', 'wrongpassword');
        await expect(await LoginPage.getErrorMessage()).toContain('Authentication failed.');
    });

    it('should display error for empty credentials', async () => {
        await LoginPage.login('', '');
        await expect(await LoginPage.getErrorMessage()).toContain('An email address required.');
    });
});
