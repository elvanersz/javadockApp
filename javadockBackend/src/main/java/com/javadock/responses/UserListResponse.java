package com.javadock.responses;

import com.javadock.entities.User;
import com.javadock.enums.Role;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserListResponse {

    private Long id;
    private String firstName;
    private String lastName;
    private String fullName;
    private String username;
    private String job;
    private String university;
    private String email;
    private Role role;
    private String image;

    public UserListResponse(User user){

        setId(user.getId());
        setFirstName(user.getFirstName());
        setLastName(user.getLastName());
        setFullName(user.getFirstName() + " " + user.getLastName());
        setUsername(user.getUsername());
        setJob(user.getJob());
        setUniversity(user.getUniversity());
        setEmail(user.getEmail());
        setRole(user.getRole());
        setImage(user.getImage());
    }
}
