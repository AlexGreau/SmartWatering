package com.stage.wateringapp;

public enum MyURL {

    SIGNUP ("/api/signup?"),
    SIGNIN ("/api/signin?");

    private String title;
    private final String host = "http://134.59.129.150:8080";

    MyURL(String title) {
        this.title = title;
    }

    @Override
    public String toString() {
        return this.host + "" + title;
    }
}
