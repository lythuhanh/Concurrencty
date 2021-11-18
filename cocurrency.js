import { Selector, t } from "testcafe";

fixture`Concurrency`

test('Open 2 browser', async t => {
    const initialWindow = await t.getCurrentWindow();
    const window1 = await t.openWindow(URL);
    const window2 = await t.openWindow(URL);
   
    //Open first browser
    await t.switchToWindow(window1);
    await t.maximizeWindow()
  //  await t.navigateTo(URL)
    await t
        .typeText(accountNameBox, '  ')
        .typeText(passwordBox,'  ')
        .click(loginBtn)
        .click(userAccountMenuBar)
        .click(editIcon)
        

    //Open second browser
    await t.switchToWindow(window2); 
    await t.maximizeWindow()
    await t.wait(3000)
            .typeText(accountNameBox,'  ')
            .typeText(passwordBox,'   ')
            .click(loginBtn)
            .click(userAccountMenuBar)
            .click(editIcon)
            
    //switch to window 1    
    await t.switchToWindow(window1);
    await t
         .click(activeCheckBox)
         .click(saveBtn)

    await t.switchToWindow(window2);
    await t
        .click(activeCheckBox)
        .click(saveBtn)
        .expect(conflictForm.innerText).contains('  ')
        .wait(5000)
})
