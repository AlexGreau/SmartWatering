package com.stage.wateringapp;

import android.annotation.SuppressLint;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.Bundle;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.MotionEvent;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.AutoCompleteTextView;
import android.widget.Button;
import android.widget.EditText;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Objects;

public class RegisterActivity extends AppCompatActivity {

    private EditText addr_mail;
    private EditText pass;
    private AutoCompleteTextView city;
    private Button signup_btn;

    private String myURI;
    String sMail;
    String sPass;

    @SuppressLint("ClickableViewAccessibility")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);

        initView();

        addr_mail.setOnTouchListener(new View.OnTouchListener() {
            @Override
            public boolean onTouch(View view, MotionEvent motionEvent) {
                view.setFocusable(true);
                view.setFocusableInTouchMode(true);
                return false;
            }
        });
        pass.setOnTouchListener(new View.OnTouchListener() {
            @Override
            public boolean onTouch(View view, MotionEvent motionEvent) {
                view.setFocusable(true);
                view.setFocusableInTouchMode(true);
                return false;
            }
        });


        signup_btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                // ToDo : Action register
                if (!isConnected()) {
                    Snackbar.make(view, "Please connect to internet to proceed", Snackbar.LENGTH_LONG).show();
                }
                else if (!addr_mail.getText().toString().isEmpty() || !pass.getText().toString().isEmpty() || city.getText().toString().isEmpty()) {
                    sMail = addr_mail.getText().toString();
                    sPass = pass.getText().toString();
                    myURI = "m=" + sMail + "&p=" + sPass ;

                    RequestQueue queue = Volley.newRequestQueue(RegisterActivity.this);
                    final StringRequest request = new StringRequest(Request.Method.GET, MyURL.SIGNUP.toString()+""+myURI,
                            new Response.Listener<String>() {
                                @Override
                                public void onResponse(String response) {
                                    Log.e("ObjectID = ", response);
                                    /*
                                     * Le Compte a ete cree avec succes
                                     * on peut maintenant se connecter
                                     */
                                    // ToDO: enregistrer l'ObjectId
                                    SharedPreferences.Editor editor = getSharedPreferences("SMART_WATERING", MODE_PRIVATE).edit();
                                    editor.putString("ObjectId", response);
                                    editor.putBoolean("isConnect", true);
                                    editor.apply();

                                    goToNextActivity();
                                }
                            }, new Response.ErrorListener() {
                        @Override
                        public void onErrorResponse(VolleyError error) {
                            Log.e("ERROR", error.toString());
                        }
                    });
                    queue.add(request);
                  //  Snackbar.make(view, "" +request.getUrl(), Snackbar.LENGTH_LONG).show();
                    Log.e("RESULT", request.getUrl());
                }
            }
        });
    }

    public void initView() {
        myURI = "";
        addr_mail = findViewById(R.id.et_register_mail);
        pass = findViewById(R.id.et_register_password);
        signup_btn = findViewById(R.id.cv_register);
    }

    private boolean isConnected() {
        ConnectivityManager connectivityManager = (ConnectivityManager) getSystemService(Context.CONNECTIVITY_SERVICE);
        NetworkInfo networkInfo = Objects.requireNonNull(connectivityManager).getActiveNetworkInfo();
        return networkInfo != null && networkInfo.isConnected();
    }

    private boolean isConnectedToServer(String url, int timeout) {
        try{
            URL myUrl = new URL(url);
            URLConnection connection = myUrl.openConnection();
            connection.setConnectTimeout(timeout);
            connection.connect();
            return true;
        } catch (Exception e) {
            // Handle your exceptions
            Log.e("ERROR", "could not connect to server on register action");
            return false;
        }
    }

    public void goToMainActivity() {
        Intent intent = new Intent(RegisterActivity.this, MenuActivity.class);
        startActivity(intent);
    }
    
    public void goToNextActivity(){
        Intent intent = new Intent(RegisterActivity.this,ConfigESPActivity.class);
        startActivity(intent);
    }
}
