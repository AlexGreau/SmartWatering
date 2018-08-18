package com.stage.wateringapp;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.util.Log;
import android.webkit.ConsoleMessage;
import android.webkit.JsResult;
import android.webkit.WebChromeClient;
import android.webkit.WebView;

public class MyWebChromeClient extends WebChromeClient {

    @Override
    public boolean onJsAlert(WebView view, String url, String message, JsResult result) {
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

    @Override
    public boolean onConsoleMessage(ConsoleMessage consoleMessage) {
        /*Log.d("SMART_WATERING_JS", consoleMessage.message() + " -- From line " +
                "" + consoleMessage.lineNumber() + " of " +
                "" + consoleMessage.sourceId());*/
        Log.d("SMART_WATERING_JS", "LINE "+consoleMessage.lineNumber() + " IN " +
                "" + consoleMessage.sourceId() + "\nRESULT :\n" +
                "" + consoleMessage.message() + "\n");
        return true;
    }


}