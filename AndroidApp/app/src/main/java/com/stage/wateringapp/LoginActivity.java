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

public class LoginActivity extends AppCompatActivity {

    private EditText addr_mail;
    private EditText pass;
    private CardView signin_btn;

    private String myURI;
    String sMail;
    String sPass;

    @SuppressLint("ClickableViewAccessibility")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

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

        signin_btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                // ToDo : Action connection
                // ToDo : Action register
                if (!isConnected()) {
                    Snackbar.make(view, "Vous n'etes pas connecte a internet", Snackbar.LENGTH_LONG).show();
                }

                if (!addr_mail.getText().toString().isEmpty() || !pass.getText().toString().isEmpty()) {
                    sMail = addr_mail.getText().toString();
                    sPass = pass.getText().toString();
                    myURI = "m=" + sMail + "&p=" + sPass;

                    RequestQueue queue = Volley.newRequestQueue(LoginActivity.this);
                    final StringRequest request = new StringRequest(Request.Method.GET, "http://169.254.197.24:8080/api/signin?"+myURI,
                            new Response.Listener<String>() {
                                @Override
                                public void onResponse(String response) {
                                    Log.e("RES", response);
                                    /**
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

                                        goToMainActivity();
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
        addr_mail = findViewById(R.id.et_username);
        pass = findViewById(R.id.et_password);
        signin_btn = findViewById(R.id.cv_signin);
    }

    private boolean isConnected() {
        ConnectivityManager connectivityManager = (ConnectivityManager) getSystemService(Context.CONNECTIVITY_SERVICE);
        NetworkInfo networkInfo = Objects.requireNonNull(connectivityManager).getActiveNetworkInfo();
        return networkInfo != null && networkInfo.isConnected();
    }

    public void onCreateNewCompte(View view) {
        Intent intent = new Intent(LoginActivity.this, RegisterActivity.class);
        startActivity(intent);
    }

    public void goToMainActivity() {
        Intent intent = new Intent(LoginActivity.this, MenuActivity.class);
        startActivity(intent);
    }
}
