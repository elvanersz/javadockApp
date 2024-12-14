package com.javadock.responses;

import com.javadock.entities.User;
import com.javadock.enums.Role;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.Period;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
public class UserDetailResponse {

    private Long id;
    private String firstName;
    private String lastName;
    private String fullName;
    private String username;
    private String job;
    private String university;
    private String email;
    private Role role;
    private int membershipTime;
    private String image;
    private List<UserPostListResponse> postList;

    public UserDetailResponse(User user){
        Period diffMembershipTime = Period.between(user.getCreateTime().toLocalDate(), LocalDate.now());

        setId(user.getId());
        setFirstName(user.getFirstName());
        setLastName(user.getLastName());
        setFullName(user.getFirstName() + " " + user.getLastName());
        setUsername(user.getUsername());
        setJob(user.getJob());
        setUniversity(user.getUniversity());
        setEmail(user.getEmail());
        setRole(user.getRole());
        setMembershipTime(diffMembershipTime.getYears()*12 + diffMembershipTime.getMonths());
        setImage(user.getImage());

        List<UserPostListResponse> postListResponses = user.getPostList().stream()
                .filter(post -> !post.isDelete())
                .map(UserPostListResponse::new)
                .collect(Collectors.toList());
        setPostList(postListResponses);
    }
}
