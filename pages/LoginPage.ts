
class LoginPage {
    private get inputEmail() {
        return $('#email');
    }

    private get inputPassword() {
        return $('#passwd');
    }

    private get btnSubmit() {
        return $('#SubmitLogin');
    }

    private get errorMessage() {
        return $('.alert-danger'); // Error message container
    }

    async open(): Promise<void> {
        await browser.url('http://www.automationpractice.pl/index.php?controller=authentication');
    }

    async login(email: string, password: string): Promise<void> {
        await this.inputEmail.setValue(email);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
    }

    async getErrorMessage(): Promise<string> {
        return await this.errorMessage.getText();
    }
}

export default new LoginPage();
