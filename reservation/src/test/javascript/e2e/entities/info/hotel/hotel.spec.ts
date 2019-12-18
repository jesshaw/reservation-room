import { browser, element, by } from 'protractor';

import NavBarPage from './../../../page-objects/navbar-page';
import SignInPage from './../../../page-objects/signin-page';
import HotelComponentsPage, { HotelDeleteDialog } from './hotel.page-object';
import HotelUpdatePage from './hotel-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../../util/utils';

const expect = chai.expect;

describe('Hotel e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let hotelComponentsPage: HotelComponentsPage;
  let hotelUpdatePage: HotelUpdatePage;
  let hotelDeleteDialog: HotelDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();

    await signInPage.username.sendKeys('admin');
    await signInPage.password.sendKeys('admin');
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();
    await waitUntilDisplayed(navBarPage.entityMenu);
  });

  it('should load Hotels', async () => {
    await navBarPage.getEntityPage('hotel');
    hotelComponentsPage = new HotelComponentsPage();
    expect(await hotelComponentsPage.getTitle().getText()).to.match(/Hotels/);
  });

  it('should load create Hotel page', async () => {
    await hotelComponentsPage.clickOnCreateButton();
    hotelUpdatePage = new HotelUpdatePage();
    expect(await hotelUpdatePage.getPageTitle().getAttribute('id')).to.match(/reservationApp.infoHotel.home.createOrEditLabel/);
    await hotelUpdatePage.cancel();
  });

  it('should create and save Hotels', async () => {
    async function createHotel() {
      await hotelComponentsPage.clickOnCreateButton();
      await hotelUpdatePage.setNameInput('name');
      expect(await hotelUpdatePage.getNameInput()).to.match(/name/);
      await hotelUpdatePage.setAddressInput('address');
      expect(await hotelUpdatePage.getAddressInput()).to.match(/address/);
      await hotelUpdatePage.setPostCodeInput('postCode');
      expect(await hotelUpdatePage.getPostCodeInput()).to.match(/postCode/);
      await hotelUpdatePage.setCityInput('city');
      expect(await hotelUpdatePage.getCityInput()).to.match(/city/);
      await hotelUpdatePage.setUrlInput('url');
      expect(await hotelUpdatePage.getUrlInput()).to.match(/url/);
      await waitUntilDisplayed(hotelUpdatePage.getSaveButton());
      await hotelUpdatePage.save();
      await waitUntilHidden(hotelUpdatePage.getSaveButton());
      expect(await hotelUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createHotel();
    await hotelComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await hotelComponentsPage.countDeleteButtons();
    await createHotel();

    await hotelComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await hotelComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Hotel', async () => {
    await hotelComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await hotelComponentsPage.countDeleteButtons();
    await hotelComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    hotelDeleteDialog = new HotelDeleteDialog();
    expect(await hotelDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/reservationApp.infoHotel.delete.question/);
    await hotelDeleteDialog.clickOnConfirmButton();

    await hotelComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await hotelComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
