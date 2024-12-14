package com.javadock.responses;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.javadock.entities.Post;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class PostListResponse {

    private Long id;
    private String header;
    private String content;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createTime;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime updateTime;
    private Long userId;
    private String username;
    private Integer likeCount;

    public PostListResponse(Post post){
        setId(post.getId());
        setHeader(post.getHeader());
        setContent(post.getContent());
        setCreateTime(LocalDateTime.from(post.getCreateTime()));

        if (post.getUpdateTime() != null) {
            setUpdateTime(LocalDateTime.from(post.getUpdateTime()));
        } else {
            setUpdateTime(null);
        }

        setUserId(post.getUser().getId());
        setUsername(post.getUser().getUsername());
        setLikeCount(post.getLikeCount());
    }
}
