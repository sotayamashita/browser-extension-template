import * as browser from "webextension-polyfill";

browser.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === "install") {
    showWelcomePage();
    setUninstallURL();
  }
});

/**
 * Open the welcome page in a new tab when the extension is installed.
 */
function showWelcomePage() {
  browser.tabs.create({ url: "https://example.com/welcome" });
}

/**
 * Set the URL to open when the user uninstalls the extension.
 * @see https://developer.chrome.com/docs/extensions/reference/runtime/#example-uninstall-url
 */
function setUninstallURL() {
  browser.runtime.setUninstallURL("https://example.com/uninstall");
}
