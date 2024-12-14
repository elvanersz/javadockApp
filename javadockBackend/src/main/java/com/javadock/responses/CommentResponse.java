package com.javadock.responses;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.javadock.entities.Comment;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class CommentResponse {

    private Long id;
    private String content;
    private Long userId;
    private String username;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createTime;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime updateTime;
    private Boolean isEdited;

    public CommentResponse(Comment comment){
        setId(comment.getId());
        setContent(comment.getContent());
        setUserId(comment.getUser().getId());
        setCreateTime(LocalDateTime.from(comment.getCreateTime()));

        if (comment.getUpdateTime() != null){
            setUpdateTime(LocalDateTime.from(comment.getUpdateTime()));
        } else {
            setUpdateTime(null);
        }

        setUsername(comment.getUser().getUsername());
        setIsEdited(comment.isEdited());
    }
}
