package com.rntest;

import androidx.annotation.NonNull;

import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;

import java.util.Map;

public class BannerView extends SimpleViewManager<MJGrowingIOBanner> {
    private static final String NAME = "BannerView";
    @NonNull
    @Override
    public String getName() {
        return NAME;
    }

    @NonNull
    @Override
    protected MJGrowingIOBanner createViewInstance(@NonNull ThemedReactContext reactContext) {
        return new MJGrowingIOBanner(reactContext);
    }
    @Override
    public Map getExportedCustomBubblingEventTypeConstants() {
        return MapBuilder.builder().put("onClickGIOBanner",MapBuilder.of("phasedRegistrationNames",MapBuilder.of("bubbled", "onClickGIOBanner"))).build();
    }
}
