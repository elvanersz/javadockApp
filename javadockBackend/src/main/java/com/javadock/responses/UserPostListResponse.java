package com.javadock.responses;

import com.javadock.entities.Post;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class UserPostListResponse {

    private Long id;
    private String header;
    private String content;
    private LocalDate createTime;
    private LocalDate updateTime;
    private Integer likeCount;

    public UserPostListResponse(Post post){
        setId(post.getId());
        setHeader(post.getHeader());
        setContent(post.getContent());
        setCreateTime(post.getCreateTime());
        setUpdateTime(post.getUpdateTime());
        setLikeCount(post.getLikeCount());
    }
}
