package com.javadock.repositories;

import com.javadock.entities.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {

    Page<Post> findByUserIdNotAndIsDelete(Long id, Boolean isDelete, Pageable page);

    Page<Post> findByIsDeleteFalse(Pageable page);
}
