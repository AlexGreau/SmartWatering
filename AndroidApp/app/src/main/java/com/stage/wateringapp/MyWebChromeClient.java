package com.stage.wateringapp;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.webkit.JsResult;
import android.webkit.WebChromeClient;
import android.webkit.WebView;

public class MyWebChromeClient extends WebChromeClient {

    @Override
    public boolean onJsAlert(WebView view, String url, String message, JsResult result)
    {
        final JsResult finalRes = result;
        new AlertDialog.Builder(view.getContext())
                .setMessage(message)
                .setPositiveButton(android.R.string.ok,
                        new AlertDialog.OnClickListener()
                        {
                            @Override
                            public void onClick(DialogInterface dialog, int which) {
                                finalRes.confirm();
                            }
                        })
                .setCancelable(false)
                .create()
                .show();
        return true;
    }
}