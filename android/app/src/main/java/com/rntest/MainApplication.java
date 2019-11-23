package com.rntest;

import android.app.Application;
import android.content.Context;
import android.util.Log;

import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.growingio.android.sdk.gtouch.GrowingTouch;
import com.growingio.android.sdk.gtouch.config.GTouchConfig;
import com.growingio.android.sdk.gtouch.listener.EventPopupListener;
import com.swmansion.rnscreens.RNScreensPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.swmansion.reanimated.ReanimatedPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import java.lang.reflect.InvocationTargetException;
import java.util.List;

import com.facebook.react.ReactPackage;
import com.growingio.android.plugin.rn.GrowingIOPackage;
import com.growingio.android.sdk.collection.Configuration;
import com.growingio.android.sdk.collection.GrowingIO;

public class MainApplication extends Application implements ReactApplication {

  private static final String TAG = "GTouch";
  private final ReactNativeHost mReactNativeHost=new ReactNativeHost(this){@Override public boolean getUseDeveloperSupport(){return BuildConfig.DEBUG;}

  @Override protected List<ReactPackage>getPackages(){@SuppressWarnings("UnnecessaryLocalVariable")List<ReactPackage>packages=new PackageList(this).getPackages();
  // Packages that cannot be autolinked yet can be added manually here, for
  // example:
  packages.add(new GrowingIOPackage());
  packages.add(new MyReactPackage());
  return packages;}

  @Override protected String getJSMainModuleName(){return"index";}};

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    initializeFlipper(this); // Remove this line if you don't want Flipper enabled

    GrowingIO.startWithConfiguration(this, new Configuration()
    .trackAllFragments()
    .setTestMode(true)
    .setDebugMode(true)
    .setChannel("hangzhou")
  );

  GrowingTouch.startWithConfig(this, new GTouchConfig()
    .setEventPopupShowTimeout(5000)
    .setEventPopupEnable(true)
    .setDebugEnable(true)
    .setUploadExceptionEnable(true)
    .setEventPopupListener(new EventPopupListener() {
      @Override
      public void onLoadSuccess(String eventId, String eventType) {
          Log.d(TAG, "onLoadSuccess: eventId = " + eventId + ", eventType = " + eventType);
      }
      @Override
      public void onLoadFailed(String eventId, String eventType, int errorCode, String description) {
          Log.d(TAG, "onLoadFailed: eventId = " + eventId + ", eventType = " + eventType);
      }
      @Override
      public boolean onClicked(String eventId, String eventType, String openUrl) {
          Log.d(TAG, "onClicked: eventId = " + eventId + ", eventType = " + eventType);
          return false;
      }
      @Override
      public void onCancel(String eventId, String eventType) {
          Log.d(TAG, "onCancel: eventId = " + eventId + ", eventType = " + eventType);
      }
      @Override
      public void onTimeout(String eventId, String eventType) {
          Log.d(TAG, "onTimeout: eventId = " + eventId + ", eventType = " + eventType);
      }
  })
  );
}


  /**
   * Loads Flipper in React Native templates.
   *
   * @param context
   */
  private static void initializeFlipper(Context context) {
    if (BuildConfig.DEBUG) {
      try {
        /*
         * We use reflection here to pick up the class that initializes Flipper, since
         * Flipper library is not available in release mode
         */
        Class<?> aClass = Class.forName("com.facebook.flipper.ReactNativeFlipper");
        aClass.getMethod("initializeFlipper", Context.class).invoke(null, context);
      } catch (ClassNotFoundException e) {
        e.printStackTrace();
      } catch (NoSuchMethodException e) {
        e.printStackTrace();
      } catch (IllegalAccessException e) {
        e.printStackTrace();
      } catch (InvocationTargetException e) {
        e.printStackTrace();
      }
    }
  }
}
