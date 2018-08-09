package com.stage.wateringapp;

import android.annotation.SuppressLint;
import android.content.Context;
import android.content.SharedPreferences;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.CardView;
import android.util.Log;
import android.view.MotionEvent;
import android.view.View;
import android.widget.EditText;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import java.util.Objects;

public class ConfigESPActivity extends AppCompatActivity {

    private EditText ssid;
    private EditText pass;
    private CardView config_btn;

    private String myURI;
    String sSSID;
    String sPass;
    String sObjectID;

    @SuppressLint("ClickableViewAccessibility")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_config_esp);

        initView();

        ssid.setOnTouchListener(new View.OnTouchListener() {
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

        config_btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                // ToDo : Action connection
                // ToDo : Action register
                if (!isConnected()) {
                    Snackbar.make(view, "Vous n'etes pas connecte a internet", Snackbar.LENGTH_LONG).show();
                }

                if (!ssid.getText().toString().isEmpty() || !pass.getText().toString().isEmpty()) {
                    sSSID = ssid.getText().toString();
                    sPass = pass.getText().toString();

                    // TODO : GetSharePreference ObjectID, City
                    SharedPreferences preferences = getSharedPreferences("SMART_WATERING", MODE_PRIVATE);
                    sObjectID = preferences.getString("ObjectId", "No ObjectID");
                    Log.e("CONFIG ESP-01", sObjectID);

                    myURI = "id=" + sObjectID + "&ssid=" + sSSID + "&pass=" + sPass;

                    RequestQueue queue = Volley.newRequestQueue(ConfigESPActivity.this);
                    final StringRequest request = new StringRequest(Request.Method.GET, "http://192.168.43.171:8080/config?"+myURI,
                            new Response.Listener<String>() {
                                @Override
                                public void onResponse(String response) {
                                    Log.e("RES", response);
                                    /*
                                     * Le Compte a ete cree avec succes
                                     * on peut maintenant se connecter
                                     */
                                    // ToDo: enregistrer l'ObjectId
                                    if (Objects.equals(response.substring(0, 5), "FIND_")) {
                                        SharedPreferences.Editor editor = getSharedPreferences("SMART_WATERING", MODE_PRIVATE).edit();
                                        // ToDo : get ObjectId form : si une personne avait deja un compte et qu'il se connecte pour la premiere fois avec ce telephone
                                        //editor.putString("ObjectId", response);
                                        editor.putBoolean("isConnect", true);
                                        editor.apply();

                                        //goToMainActivity();
                                    }
                                }
                            }, new Response.ErrorListener() {
                        @Override
                        public void onErrorResponse(VolleyError error) {
                            Log.e("ERROR", error.toString());
                        }
                    });
                    queue.add(request);
                    Snackbar.make(view, ""+request.getUrl(), Snackbar.LENGTH_LONG).show();
                    Log.e("RESULT", request.getUrl());
                }
            }
        });
    }

    public void initView() {
        myURI = "";
        ssid = findViewById(R.id.et_ssid);
        pass = findViewById(R.id.et_config_password);
        config_btn = findViewById(R.id.cv_config);
    }

    private boolean isConnected() {
        ConnectivityManager connectivityManager = (ConnectivityManager) getSystemService(Context.CONNECTIVITY_SERVICE);
        NetworkInfo networkInfo = Objects.requireNonNull(connectivityManager).getActiveNetworkInfo();
        return networkInfo != null && networkInfo.isConnected();
    }
}
