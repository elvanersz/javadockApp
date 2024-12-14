package com.javadock.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;


@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "Post")
public class Post extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String header;

    @Column(columnDefinition = "longtext")
    private String content;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "userId")
    private User user;

    @OneToMany(mappedBy = "post")
    private List<Comment> commentList;

    private Integer likeCount = 0;

    public Post(Long id) {
        this.id = id;
    }

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
