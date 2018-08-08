package com.stage.wateringapp;

import android.annotation.SuppressLint;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.CardView;
import android.view.MotionEvent;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.AutoCompleteTextView;
import android.widget.EditText;
import android.widget.Toast;

public class RegisterActivity extends AppCompatActivity {

    private EditText addr_mail;
    private EditText pass;
    private AutoCompleteTextView city;
    private CardView signup_btn;

    ArrayAdapter<String> adapter;

    private static final String[] CITY = new String[] {
            "Nice, Fr", "Paris, Fr", "Nantes, Fr", "Lyon, fr"
    };

    @SuppressLint("ClickableViewAccessibility")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);

        initView();

        adapter = new ArrayAdapter<>(this, android.R.layout.simple_dropdown_item_1line, CITY);

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
        city.setOnTouchListener(new View.OnTouchListener() {
            @Override
            public boolean onTouch(View view, MotionEvent motionEvent) {
                view.setFocusable(true);
                view.setFocusableInTouchMode(true);
                return false;
            }
        });
        city.setAdapter(adapter);

        signup_btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                // ToDo : Action connection
            }
        });
    }

    public void initView() {
        addr_mail = findViewById(R.id.et_register_mail);
        pass = findViewById(R.id.et_register_password);
        city = findViewById(R.id.actv_register_city);
        signup_btn = findViewById(R.id.cv_register);
    }
}
