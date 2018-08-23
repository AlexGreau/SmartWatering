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
        String host = "http://134.59.129.203:8080";
        return host + "" + title;
    }
}
