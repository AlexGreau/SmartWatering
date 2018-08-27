package com.stage.wateringapp;

public enum MyURL {

    SIGNUP ("/api/signup?"),
    SIGNIN ("/api/signin?");

    private String title;

    MyURL(String title) {
        this.title = title;
    }

    @Override
    public String toString() {
        String host = "http://192.168.43.171:8080";
        return host + "" + title;
    }
}
