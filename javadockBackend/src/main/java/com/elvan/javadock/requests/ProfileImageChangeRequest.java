package com.elvan.javadock.requests;

import jakarta.validation.constraints.NotBlank;

public record ProfileImageChangeRequest(

        @NotBlank(message = "{javadock.constraints.profile.image.NotBlank.message}")
        String image
) {

}
