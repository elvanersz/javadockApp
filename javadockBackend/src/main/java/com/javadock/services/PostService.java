package com.javadock.services;

import com.javadock.entities.Post;
import com.javadock.entities.User;
import com.javadock.exceptions.BusinessException;
import com.javadock.repositories.PostRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@AllArgsConstructor
public class PostService {

    private PostRepository postRepository;

    public Page<Post> getAllPosts(Pageable page, User currentUser) {
        if (currentUser == null){
            return postRepository.findAll(page);
        }
        return postRepository.findByIdNot(currentUser.getId(), page);
    }

    public Post getPostById(Long id) {
        return postRepository.findById(id)
                .orElseThrow(() -> new BusinessException("javadock.post.not.found", Collections.singletonList(id)));
    }
}
