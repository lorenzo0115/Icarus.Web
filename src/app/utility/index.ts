import { isMobile } from './size';
import { colorRgb } from './color';
import { notification } from './notification';

const defaultNotificationDelay = 3 * 1000;

const UtilitySingleton = (function () {
  function UtilityManager() {
    this._notification = notification;
  }

  UtilityManager.prototype = {
    successMsg: function (msg, time = defaultNotificationDelay) {
      this._notification.success(msg, time);
    },
    infoMsg: function (msg, time = defaultNotificationDelay) {
      this._notification.info(msg, time);
    },
    warningMsg: function (msg, time = defaultNotificationDelay) {
      this._notification.warning(msg, time);
    },
    dangerMsg: function (msg, time = defaultNotificationDelay) {
      this._notification.danger(msg, time);
    },
    getColor: function (color) {
      return colorRgb(color);
    },
    getRandomNum: function (range) {
      return Math.floor(Math.random() * range);
    },
    getWindowSize: function () {
      const width = Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.documentElement.clientWidth
      );
      const height = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.documentElement.clientHeight
      );

      return { width, height };
    },
  };

  let uManager;

  function createUtilityManager() {
    uManager = new UtilityManager();
    return uManager;
  }

  return {
    getUtilityManager: () => {
      if (!uManager) uManager = createUtilityManager();
      return uManager;
    },
  };
})();

const utility = UtilitySingleton.getUtilityManager();

export { utility, isMobile };
