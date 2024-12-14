package com.javadock.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "Comment")
public class Comment extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String content;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "postId")
    private Post post;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "userId")
    private User user;

    private Integer likeCount = 0;

    @Column(columnDefinition="tinyint(1) default 0")
    boolean isDelete = false;

    @Column(columnDefinition="tinyint(1) default 0")
    boolean isEdited = false;


    public boolean isDelete() {
        return isDelete;
    }


    @PrePersist
    public void prePersist() {
        if (this.getCreateTime() == null) {
            this.setCreateTime(LocalDateTime.now());
        }
    }

    @PreUpdate
    public void preUpdate() {
        this.setUpdateTime(LocalDateTime.now());
    }
}
