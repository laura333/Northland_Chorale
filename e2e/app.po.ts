import { browser, element, by } from 'protractor';

export class NlcPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('nlc-app h1')).getText();
  }
}
