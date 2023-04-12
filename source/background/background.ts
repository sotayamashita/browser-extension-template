import * as browser from "webextension-polyfill";
import isDevelopmentVersion from "../helpers/is-development-version";

browser.runtime.onInstalled.addListener(({ reason }) => {
  // Only if the reason is explicitly "install"
  if (!!isDevelopmentVersion() && reason === "install") {
    console.log("First Install");
  }
});
