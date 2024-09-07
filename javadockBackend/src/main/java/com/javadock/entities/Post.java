package com.javadock.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;


@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "Post")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String header;

    @Column(columnDefinition = "longtext")
    private String content;

    @Column(name = "createTime")
    private LocalDate createTime = LocalDate.now();

    @Column(name = "updateTime")
    private LocalDate updateTime;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "userId")
    private User user;

    @OneToMany(mappedBy = "post")
    private List<Comment> commentList;

    private Integer likeCount;

    public Post(Long id) {
        this.id = id;
    }
}
