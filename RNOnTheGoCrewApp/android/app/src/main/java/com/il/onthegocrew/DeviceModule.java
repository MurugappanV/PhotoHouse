package com.il.onthegocrew;

import android.annotation.TargetApi;
import android.content.Context;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.support.annotation.RequiresApi;
import android.telecom.TelecomManager;
import android.util.Log;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class DeviceModule extends ReactContextBaseJavaModule {
    private ReactContext mReactContext;
   //constructor
   public DeviceModule(ReactApplicationContext reactContext) {
       super(reactContext);
       mReactContext = reactContext;
   }
   //Mandatory function getName that specifies the module name


   @Override
   public String getName() {
       return "Device";
   }
   //Custom function that we are going to export to JS
   @ReactMethod
   public void getDeviceName(Callback cb) {
       try{
           Log.i("fgjgh", "jhdsfg");
           Uri uri = Uri.fromParts("tel", "7904825982", null);
           Bundle extras = new Bundle();
           extras.putBoolean(TelecomManager.EXTRA_START_CALL_WITH_SPEAKERPHONE, true);
           final TelecomManager telecomManager =
                   (TelecomManager) mReactContext.getSystemService(Context.TELECOM_SERVICE);
           telecomManager.placeCall(uri, extras);
           cb.invoke(null, android.os.Build.MODEL);
       }catch (Exception e){
           cb.invoke(e.toString(), null);
       }
   }
}