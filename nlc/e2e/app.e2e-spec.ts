import { NlcPage } from './app.po';

describe('nlc App', () => {
  let page: NlcPage;

  beforeEach(() => {
    page = new NlcPage();
  });

  it('should display message saying Northland Chorale', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Northland Chorale');
  });
});
