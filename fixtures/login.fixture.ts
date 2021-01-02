import {Selector} from "testcafe";
import {login, logout} from "../helpers/utils"

fixture("Login Fixture")
    .page("http://localhost:4200/")
    .beforeEach(async t => {
        console.log("Before Test");
         await t.maximizeWindow();
    })
    .afterEach(async t =>{
        await console.log("After Test");
    });

test('should display info alert box',async (t: TestController) => {
    // Arrange
    const alertVisible = await Selector("div.alert.alert-info").exists;
    // Assert
    await t.expect(alertVisible).ok();
    console.log("Test Complete");
});

test('should contain correct text for login form',async (t: TestController) => {
    const userNamePlaceHolder = await Selector("#username").getAttribute("placeholder");
    const passwordPlaceHolder = await Selector("#password").getAttribute("placeholder");
    const loginButtonText     = await Selector("button.btn.btn-dark").innerText;

    await t.expect(userNamePlaceHolder).eql("Type username");
    await t.expect(passwordPlaceHolder).eql("Type password");
    await t.expect(loginButtonText).contains("Log in");
    console.log("Test Complete");
});

test('should allow user to login', async (t: TestController) => {
    await login(t);
    const notesPage = Selector("div.container-fluid.e2e-notes-page").exists;
    await t.expect(notesPage).ok();
});

test('should allow user to logout', async (t: TestController) => {
    await logout(t);
    const loginPage = await Selector("div.container.login-container.e2e-login-page").exists;
    await t.expect(loginPage).ok();
}).before(async t => {await login(t)});
