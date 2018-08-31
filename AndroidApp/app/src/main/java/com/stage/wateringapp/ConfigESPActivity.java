package com.stage.wateringapp;

import android.annotation.SuppressLint;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.CardView;
import android.util.Log;
import android.view.Menu;
import android.view.MotionEvent;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.AutoCompleteTextView;
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
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

public class ConfigESPActivity extends AppCompatActivity {

    private EditText ssid;
    private EditText pass;
    private AutoCompleteTextView city;
    private CardView config_btn;

    String sSSID;
    String sPass;
    String sObjectID;
    String sCity;

    String idCity;

    ArrayAdapter<String> adapter;

    Map<String,String> map = new HashMap<>();
    /*private static final String[] CITY = new String[] {
            "Nice, Fr", "Paris, Fr", "Nantes, Fr", "Lyon, fr"
    };*/

    Map<String, String> map = new HashMap<>();

    private static List<String> CITY = new ArrayList<>();

    @SuppressLint("ClickableViewAccessibility")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_config_esp);

        initView();

        try {
            JSONArray json = new JSONArray(loadJSONFromAsset(this));
            Log.e("LISTE_VILLE", loadJSONFromAsset(this));

            for (int i = 0; i < json.length(); i++) {
                final JSONObject e = json.getJSONObject(i);
                idCity = e.getString("id");
                String name = e.getString("name");
                CITY.add(name);
<<<<<<< HEAD

                map.put(name, idCity);
=======
                map.put(name,idCity);
>>>>>>> 2c39d886ccb55a094eb0d82a1a10160a6a53ff33
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }


        adapter = new ArrayAdapter<>(this, android.R.layout.simple_dropdown_item_1line, CITY);

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
        city.setOnTouchListener(new View.OnTouchListener() {
            @Override
            public boolean onTouch(View view, MotionEvent motionEvent) {
                view.setFocusable(true);
                view.setFocusableInTouchMode(true);
                return false;
            }
        });
        city.setAdapter(adapter);

        config_btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                // ToDo : Action connection
                // ToDo : Action register
                if (!isConnected()) {
                    Snackbar.make(view, "Vous n'etes pas connecte a internet", Snackbar.LENGTH_LONG).show();
                }

                if (!ssid.getText().toString().isEmpty() || !pass.getText().toString().isEmpty() || city.getText().toString().isEmpty()) {
                    sSSID = ssid.getText().toString();
                    sPass = pass.getText().toString();
                    if (idCity != null) {
                        sCity = idCity;
                    }


                    // TODO : GetSharePreference ObjectID, City
                    SharedPreferences preferences = getSharedPreferences("SMART_WATERING", MODE_PRIVATE);
                    sObjectID = preferences.getString("ObjectId", "No ObjectID");
                    Log.e("CONFIG ESP-01", sObjectID);

                    RequestQueue queue = Volley.newRequestQueue(ConfigESPActivity.this);
                    final StringRequest request = new StringRequest(Request.Method.POST, "http://192.168.4.1/config",
                            new Response.Listener<String>() {
                                @Override
                                public void onResponse(String response) {
                                    Log.e("RES", response);

                                    Intent intent = new Intent(ConfigESPActivity.this, MenuActivity.class);
                                    startActivity(intent);
                                    finish();
                                }
                            },
                            new Response.ErrorListener() {
                                @Override
                                public void onErrorResponse(VolleyError error) {
                                    Log.e("ERROR", error.toString());
                                }
                            })
                    {
                        @Override
                        protected Map<String, String> getParams() {
                            Map<String, String> params = new HashMap<>();
                            params.put("id", sObjectID);
                            params.put("ssid", sSSID);
                            params.put("pass", sPass);
                            params.put("city", map.get(city.getText().toString()));
                            return params;
                        }
                    };

                    Log.e("TTT", idCity+" "+sCity);

                    queue.add(request);
                    Snackbar.make(view, ""+request.getUrl(), Snackbar.LENGTH_LONG).show();
                    Log.e("RESULT", request.getUrl());
                    Log.e("ZEUBY",map.get(city.getText().toString()));

                }
            }
        });
    }

    public void initView() {
        ssid = findViewById(R.id.et_ssid);
        pass = findViewById(R.id.et_config_password);
        city = findViewById(R.id.actv_config_city);
        config_btn = findViewById(R.id.cv_config);
    }

    public String loadJSONFromAsset(Context context) {
        String json = null;
        try {
            InputStream inputStream = context.getAssets().open("city.all.json");
            int size = inputStream.available();
            byte[] buffer = new byte[size];
            inputStream.read(buffer);
            inputStream.close();
            json = new String(buffer, "UTF-8");
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
        return json;
    }

    private boolean isConnected() {
        ConnectivityManager connectivityManager = (ConnectivityManager) getSystemService(Context.CONNECTIVITY_SERVICE);
        NetworkInfo networkInfo = Objects.requireNonNull(connectivityManager).getActiveNetworkInfo();
        return networkInfo != null && networkInfo.isConnected();
    }
}
