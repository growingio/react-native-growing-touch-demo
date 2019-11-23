package com.rntest;



import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.growingio.android.sdk.collection.GrowingIO;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.File;

public class TestPageActivity extends AppCompatActivity {

    private int count = 0;
    private String WELCOME_WORDS = "当前已点击图片：";
    private ImageView img = null;
    private Button btn = null;
    private LinearLayout testPageLayout = null;
    private SpHelper mSpHelper;
    private String IMG_OPEN_CNT = "imgOpenCnt";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        mSpHelper = new SpHelper(this);

        Intent intent = getIntent();
        Bundle bundle = intent.getExtras();
        String toastStr = "";
        if (bundle == null) {
            toastStr = "没有携带参数";
        } else {
            for (String key : bundle.keySet()) {
                toastStr = toastStr + key + " = " + bundle.getString(key) + "; ";
            }
        }
        showToast(toastStr,800);



        final JSONObject visitor = new JSONObject();
        setContentView(R.layout.activity_test_page);
        GrowingIO.getInstance().track("TestPageOpen");

        testPageLayout =  findViewById(R.id.test_page);


        btn = findViewById(R.id.btn_clear_data);
        btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                clearAllData();
                System.exit(0);
            }
        });
        img =  findViewById(R.id.img);

        img.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                count += 1;
                mSpHelper.saveImgOpenCnt(count);
                setTextandImg(mSpHelper,img);
                try {
                    visitor.put(IMG_OPEN_CNT,mSpHelper.getImgOpenCnt());
                    //更新登录用户属性--触达图片点击次数
                    GrowingIO.getInstance().setPeopleVariable(IMG_OPEN_CNT,mSpHelper.getImgOpenCnt());
                    //更新访问用户属性--触达图片点击次数
                    GrowingIO.getInstance().setVisitor(visitor);
                    //更新GTouch-touch1事件的「触达图片点击次数」维度的纬度值
                    GrowingIO.getInstance().track("touch1",visitor);
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        });
    }

    private void setTextandImg(SpHelper mSpHelper, ImageView img) {
        int cnt = mSpHelper.getImgOpenCnt();
        StringBuilder POINT_NUM = new StringBuilder(WELCOME_WORDS).append(cnt).append("次");
        showToast(POINT_NUM.toString(),500);

        img.setImageResource(1 == cnt % 2 ? R.mipmap.u1 : R.mipmap.u2);
        Log.i(IMG_OPEN_CNT, POINT_NUM.toString());
    }


    public void showToast(final String word, final long time){
        this.runOnUiThread(new Runnable() {
            public void run() {
                final Toast toast = Toast.makeText(TestPageActivity.this, word, Toast.LENGTH_LONG);
                toast.show();
                Handler handler = new Handler();
                handler.postDelayed(new Runnable() {
                    public void run() {
                        toast.cancel();
                    }
                }, time);
            }
        });
    }

    public void clearAllData() {
        deleteFile(new File("data/data/" + getPackageName()));
        deleteFile(new File(getCacheDir().getAbsolutePath()));
        Toast.makeText(this, "清除数据成功", Toast.LENGTH_SHORT).show();
    }

    private void deleteFile(File file) {
        if (!file.exists()) {
            return;
        } else {
            if (file.isFile()) {
                file.delete();
                return;
            }
            if (file.isDirectory()) {
                File[] childFile = file.listFiles();
                if (childFile == null || childFile.length == 0) {
                    file.delete();
                    return;
                }
                for (File f : childFile) {
                    deleteFile(f);
                }
                file.delete();
            }
        }
    }
}