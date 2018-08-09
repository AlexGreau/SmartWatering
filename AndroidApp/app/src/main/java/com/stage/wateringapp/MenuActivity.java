package com.stage.wateringapp;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;

public class MenuActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_menu);
    }

    public void onProgram(View view){
        // when program button is pressed in menu
        Intent intent = new Intent(this, MainActivity.class);
        startActivity(intent);
    }

    public void configWiFi(View view) {
        Intent intent = new Intent(this, ConfigESPActivity.class);
        startActivity(intent);
    }

    public void signOut(View view) {
        SharedPreferences preferences = getSharedPreferences("SMART_WATERING", MODE_PRIVATE);
        SharedPreferences.Editor editor = preferences.edit();
        editor.putBoolean("isConnect", false);
        editor.apply();
        Intent intent = new Intent(this, LoginActivity.class);
        startActivity(intent);
    }
}
