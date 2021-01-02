import {Selector} from "testcafe";
import {login, logout} from "../helpers/utils"

fixture("Feedback Form Fixture")
    .page("http://localhost:4200/")
    .beforeEach(async (t) => {  
        await t.maximizeWindow();
        await login(t);
        await t.navigateTo("feedback");
     })
    .afterEach(async (t) => {  
        await logout(t);
});

test('should allow user to submit Feedback ',async (t: TestController) => {
    const emailInput = await Selector("#email");
    const appRatingSelect = await Selector("#rating");
    const optionToSelect = await Selector("option").withText("Average");
    const feedback = await Selector("#feedback");
    const sendFeedbackButton = await Selector(".e2e-send-feedback-btn");
    const successAlert = await Selector(".alert.alert-success");

    await t.typeText(emailInput, "john.doe@testmail.com");
    await t.click(appRatingSelect);
    await t.click(optionToSelect);
    await t.typeText(feedback, "Average Rating");
    await t.click(sendFeedbackButton);

    await t.expect(successAlert.innerText).contains("Thank you! Your feedback is on it's way to us :)");
});

test('should display error when email is invalid',async (t: TestController) => {
    const emailInput = await Selector("#email");
    const appRatingSelect = await Selector("#rating");
    const optionToSelect = await Selector("option").withText("Good");
    const feedback = await Selector("#feedback");
    const sendFeedbackButton = await Selector(".e2e-send-feedback-btn");
    const errorMessage = await Selector(".alert.alert-danger");

    await t.typeText(emailInput, "john.doe");
    await t.click(appRatingSelect);
    await t.click(optionToSelect);
    await t.typeText(feedback, "Good Rating");
    await t.click(sendFeedbackButton);
    await t.expect(errorMessage.innerText).contains("The form contains validation errors :(");
});



