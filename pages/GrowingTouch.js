import {NativeModules, NativeEventEmitter} from 'react-native';

const EVENT_REMINDER = 'GTouchEventReminder';

export default class GrowingTouch {

  static sEventEmitter;
  static sEventPopupListener;

  static setEventPopupEnable(enable) {
    if (enable === true) {
      NativeModules.RNGrowingTouch.setEventPopupEnable(true);
    } else {
      NativeModules.RNGrowingTouch.setEventPopupEnable(false);
    }
  }

  static async isEventPopupEnabled() {
    const {popupEnabled} = await NativeModules.RNGrowingTouch.isEventPopupEnabled();
    return popupEnabled;
  }

  static enableEventPopupAndGenerateAppOpenEvent() {
    NativeModules.RNGrowingTouch.enableEventPopupAndGenerateAppOpenEvent();
  }

  static async isEventPopupShowing() {
    const {popupShowing} = await NativeModules.RNGrowingTouch.isEventPopupShowing();
    return popupShowing;
  }

  static setEventPopupListener(listener) {
    this.sEventPopupListener = listener;

    if (this.sEventEmitter) {
      return;
    }

    const eventEmitter = new NativeEventEmitter(NativeModules.RNGrowingTouch);
    eventEmitter.addListener(EVENT_REMINDER, (event) => {
      let method = event.method;
      let eventId = event.eventId;
      let eventType = event.eventType;
      switch (method) {
        case 'onLoadSuccess':
          if (this.sEventPopupListener && this.sEventPopupListener.onLoadSuccess) {
            this.sEventPopupListener.onLoadSuccess(eventId, eventType);
          }
          break;
        case 'onLoadFailed':
          if (this.sEventPopupListener && this.sEventPopupListener.onLoadFailed) {
            let errorCode = event.errorCode;
            let description = event.description;
            this.sEventPopupListener.onLoadFailed(eventId, eventType, errorCode, description);
          }
          break;
        case 'onClicked':
          if (this.sEventPopupListener && this.sEventPopupListener.onClicked) {
            let penUrl = event.openUrl;
            this.sEventPopupListener.onClicked(eventId, eventType, penUrl);
          }
          break;
        case 'onCancel':
          if (this.sEventPopupListener && this.sEventPopupListener.onCancel) {
            this.sEventPopupListener.onCancel(eventId, eventType);
          }
          break;
        case 'onTimeout':
          if (this.sEventPopupListener && this.sEventPopupListener.onTimeout) {
            this.sEventPopupListener.onTimeout(eventId, eventType);
          }
          break;
      }
    });
    this.sEventEmitter = eventEmitter;
    NativeModules.RNGrowingTouch.setEventPopupListener();

  }
}
