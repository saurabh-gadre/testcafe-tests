import { Selector } from 'testcafe';
import {login, logout} from '../helpers/utils';

fixture("Notes Fixture")
    .page("http://localhost:4200/")
    .beforeEach(async (t) => {  
        await t.maximizeWindow(); 
        await login(t); 
    })
    .afterEach(async (t) => {  
        await logout(t); 
});

test('should allow user to filter Notes', async (t: TestController) => {
    const searchInput = await Selector("input").withAttribute("placeholder","Search notes...");
    await t.typeText(searchInput, "Dentist");

    const noteCount = await Selector("app-note").count;
    await t.expect(noteCount).eql(1);
});

test('should allow user to delete a Note',async (t: TestController) => {
    const deleteThirdNote = await Selector(".note-delete-btn").nth(2);

    await t.setNativeDialogHandler(() => true);
    await t.click(deleteThirdNote);

    const noteCount = await Selector("app-note").count;
    await t.expect(noteCount).eql(3);
});


