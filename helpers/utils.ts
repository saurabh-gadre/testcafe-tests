import { Selector } from 'testcafe';

export async function login(t:TestController) {
    const userNameInput = await Selector("#username");
    const passwordInput = await Selector("#password");
    const loginButton   = await Selector("button").withAttribute("type","submit");

    await t.typeText(userNameInput, "username");
    await t.typeText(passwordInput, "password");
    await t.click(loginButton);
}

export async function logout(t:TestController) {
    const logoutButton = await Selector("button").withAttribute("type","submit").withText("Log out");
    await t.click(logoutButton);
}
