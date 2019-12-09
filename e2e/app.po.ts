import { browser, by, element, $ } from 'protractor';

export class Page {

  navigateTo(destination) {
    return browser.get(destination);
  }

  getTitle() {
    return browser.getTitle();
  }

  getMensagem() {
    return element(by.id('labelMensagem')).getText();
  }

  async hasElements() {
    let a = await $('#labelMensagem').isPresent();
    let b = await $('#editNome').isPresent();
    let c = await $('#btnCumprimentar').isPresent();
    return a && b && c;
  }

  digitaNome(nome: string) {
    return element(by.css('#editNome .text-input')).sendKeys(nome);
  }

  cumprimenta() {
    return element(by.id('btnCumprimentar')).click();
  }

  getPageOneTitleText() {
    return element(by.tagName('page-page1')).element(by.tagName('ion-title')).element(by.css('.toolbar-title')).getText();
  }
}
