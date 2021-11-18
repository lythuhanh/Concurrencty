import { Selector, t } from "testcafe";

const URL = 'https://app-platonl-base-chn.azurewebsites.net/'
const accountNameBox = Selector('#accountName')
const passwordBox = Selector('#password')
const loginBtn = Selector('#btn-submit')
const userAccountMenuBar = Selector('a').withExactText('Benutzerkonten')
const editIcon = Selector('i[class="fas fa-pencil-alt"]')
const activeCheckBox = Selector('#active')
const saveBtn = Selector('#btn-saveAndClose')
const conflictForm = Selector('div[class="modal-body dxbs-modal-body"]')

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
        .typeText(accountNameBox, 'sys-admin')
        .typeText(passwordBox,'12345678')
        .click(loginBtn)
        .click(userAccountMenuBar)
        .click(editIcon)
        

    //Open second browser
    await t.switchToWindow(window2); 
    await t.maximizeWindow()
    await t.wait(3000)
            .typeText(accountNameBox,'sys-hanh')
            .typeText(passwordBox,'Abc@a123')
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
        .expect(conflictForm.innerText).contains('Widersprüchliche Informationen')
        .wait(5000)
})