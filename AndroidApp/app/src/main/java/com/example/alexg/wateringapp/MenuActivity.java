package com.example.alexg.wateringapp;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;

public class MenuActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.menu);
    }

    public void onProgram(View view){
        // when program button is pressed in menu
        Intent intent = new Intent(this, MainActivity.class);
        startActivity(intent);
    }
}
