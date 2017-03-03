import { NlcPage } from './app.po';

describe('nlc App', () => {
  let page: NlcPage;

  beforeEach(() => {
    page = new NlcPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
