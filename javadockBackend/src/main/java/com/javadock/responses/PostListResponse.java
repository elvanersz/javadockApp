package com.javadock.responses;

import com.javadock.entities.Post;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class PostListResponse {

    private Long id;
    private String header;
    private String content;
    private LocalDate createTime;
    private LocalDate updateTime;
    private Long userId;
    private String username;
    private Integer likeCount;

    public PostListResponse(Post post){
        setId(post.getId());
        setHeader(post.getHeader());
        setContent(post.getContent());
        setCreateTime(post.getCreateTime());
        setUpdateTime(post.getUpdateTime());
        setUserId(post.getUser().getId());
        setUsername(post.getUser().getUsername());
        setLikeCount(post.getLikeCount());
    }
}
