package com.elvan.hoaxify.errors;

import lombok.Data;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Data
public class ErrorResponse {

    private int statusCode;
    private String message;
    private String path;
    private long timestamp = new Date().getTime();
    private Map<String, String> validationErrors = new HashMap<>();
}