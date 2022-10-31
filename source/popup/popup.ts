import browser from 'webextension-polyfill';

document.querySelector('#open-option-page')?.addEventListener('click', () => {
  browser.runtime.openOptionsPage();
})