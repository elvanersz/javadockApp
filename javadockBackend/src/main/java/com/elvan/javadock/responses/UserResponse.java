package com.elvan.javadock.responses;

import com.elvan.javadock.entities.User;
import com.elvan.javadock.enums.Role;
import lombok.Data;

import java.time.LocalDate;
import java.time.Period;

@Data
public class UserResponse {

    private String fullName;
    private String username;
    private String email;
    private int age;
    private Role role;
    private int membershipTime;
    private String image;

    public UserResponse(User user){
        Period diffAge = Period.between(user.getBirthDate(), LocalDate.now());
        Period diffMembershipTime = Period.between(user.getCreateTime(), LocalDate.now());

        setFullName(user.getFirstName() + " " + user.getLastName());
        setUsername(user.getUsername());
        setEmail(user.getEmail());
        setAge(diffAge.getYears());
        setRole(user.getRole());
        setMembershipTime(diffMembershipTime.getYears()*12 + diffMembershipTime.getMonths());
        setImage(user.getImage());
    }
}
