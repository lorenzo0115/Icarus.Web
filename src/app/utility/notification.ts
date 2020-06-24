declare var $: any;

const template =
  '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0} alert-with-icon" role="alert">' +
  '<button mat-raised-button type="button" aria-hidden="true" class="close" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
  '<i class="material-icons" data-notify="icon">notifications</i> ' +
  '<span data-notify="title">{1}</span> ' +
  '<span data-notify="message">{2}</span>' +
  '<div class="progress" data-notify="progressbar">' +
  '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
  '</div>' +
  '<a href="{3}" target="{4}" data-notify="url"></a>' +
  '</div>';

const NotificationSingleton = (function () {
  function NotificationManager() {
    this._notification = (type: string) => (msg: string, time: number) => {
      $.notify(
        {
          icon: 'notifications',
          message: msg,
        },
        {
          type,
          timer: time,
          placement: {
            from: 'top',
            align: 'right',
          },
          template,
        }
      );
    };
  }

  NotificationManager.prototype = {
    info: function (msg: string, time: number) {
      this._notification('info')(msg, time);
    },
    success: function (msg: string, time: number) {
      this._notification('success')(msg, time);
    },
    warning: function (msg: string, time: number) {
      this._notification('warning')(msg, time);
    },
    danger: function (msg: string, time: number) {
      this._notification('danger')(msg, time);
    },
  };

  let nManager;

  function createNotificationManager() {
    nManager = new NotificationManager();
    return nManager;
  }

  return {
    getNotificationManager: () => {
      if (!nManager) nManager = createNotificationManager();
      return nManager;
    },
  };
})();

const notification = NotificationSingleton.getNotificationManager();

export { notification };
