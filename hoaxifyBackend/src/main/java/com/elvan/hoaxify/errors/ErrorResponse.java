package com.elvan.hoaxify.errors;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import java.util.Date;
import java.util.Map;

@Data
@JsonInclude(value = JsonInclude.Include.NON_NULL)  //null olan değerlerin jsona eklenmemesini belirtir
public class ErrorResponse {

    private int statusCode;
    private String message;
    private String path;
    private long timestamp = new Date().getTime();
    private Map<String, String> validationErrors = null;
}