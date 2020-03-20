package com.rntest;

import android.content.Context;
import android.util.AttributeSet;
import android.view.LayoutInflater;
import android.widget.FrameLayout;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.growingio.android.sdk.common.log.Logger;
import com.growingio.android.sdk.gtouch.widget.banner.GTouchBanner;
import com.growingio.android.sdk.gtouch.widget.banner.listener.BannerStateChangedListener;


public class MJGrowingIOBanner extends FrameLayout {
    public MJGrowingIOBanner(@NonNull Context context) {
        super(context);
        initLayout(context);
    }

    public MJGrowingIOBanner(@NonNull Context context, @Nullable AttributeSet attrs) {
        super(context, attrs);
        initLayout(context);
    }

    public MJGrowingIOBanner(@NonNull Context context, @Nullable AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        initLayout(context);
    }

    public MJGrowingIOBanner(@NonNull Context context, @Nullable AttributeSet attrs, int defStyleAttr, int defStyleRes) {
        super(context, attrs, defStyleAttr, defStyleRes);
        initLayout(context);
    }
    protected void initLayout(Context context) {
        LayoutInflater.from(context).inflate(R.layout.view_giowingio_banner, this);
        GTouchBanner view_gtouch_banner = findViewById(R.id.view_gtouch_banner);
        view_gtouch_banner.loadData(new BannerStateChangedListener(){
            /***Banner数据加载成功
             * @param banner Banner控件对象
             */
            @Override
            public void onLoadDataSuccess(GTouchBanner banner) {
                Logger.e("on","LoadDataSuccess: ");
            }
            /**
             * Banner数据加载失败
             *
             * @param banner Banner控件对象
             * @param errorCode 错误码
             * @param description 错误描述，有可能为null
             */
            @Override
            public void onLoadDataFailed(GTouchBanner banner, int errorCode, String description) {
                Logger.e( "onLoadDataFailed: errorCode = " + errorCode , ", description = " + description);
            }

            /**
             * Banner item被点击
             *
             * @param banner Banner控件对象
             * @param position item所处位置
             * @param targetUrl 需要跳转的路由url
             * @return 返回为true，资源位SDK不在处理跳转的路由url；返回为false，资源位SDK会处理跳转内部界面和H5两种资源位系统提供的路由
             */
            @Override
            public boolean onItemClick(GTouchBanner banner, int position, String targetUrl) {
                Logger.e( "onItemClick: position = " + position , ", targetUrl = " + targetUrl);
                onReceiveNativeEvent(banner,position,targetUrl);
                return false;
            }
            /**
             * 加载失败图片被点击
             *
             * @param banner Banner控件对象
             */
            @Override
            public void onErrorImageClick(GTouchBanner banner) {
                Logger.e( "on","ErrorImageClick");
            }
        });
    }

    /***
     * 相应事件
     * @param banner
     * @param position
     * @param targetUrl
     */
    public void onReceiveNativeEvent(GTouchBanner banner, int position, String targetUrl) {
        //@{@"selections": arr, @"isBottom": @(!_isVehicleTop)};
        Logger.e( "on","ReceiveNativeEvent");
        WritableMap event = Arguments.createMap();
//        WritableArray array = Arguments.fromList(selections);
        event.putString("openUrl",targetUrl);
//        event.putBoolean("isBottom", isBottom);
        ReactContext reactContext = (ReactContext)getContext();
        reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(
                getId(),
                "onClickGIOBanner",
                event);
    }
}
