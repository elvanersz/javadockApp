package com.javadock.services;

import com.javadock.entities.Post;
import com.javadock.entities.User;
import com.javadock.exceptions.BusinessException;
import com.javadock.repositories.PostRepository;
import com.javadock.requests.UpdatePostRequest;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@AllArgsConstructor
public class PostService {

    private static final Logger log = LoggerFactory.getLogger(UserService.class);

    private PostRepository postRepository;

    public Page<Post> getAllPosts(Pageable page, User currentUser) {
        if (currentUser == null){
            return postRepository.findByIsDeleteFalse(page);
        }
        return postRepository.findByUserIdNotAndIsDelete(currentUser.getId(), false, page);
    }

    public Post getPostById(Long id) {
        return postRepository.findById(id)
                .orElseThrow(() -> new BusinessException("javadock.post.not.found", Collections.singletonList(id)));
    }

    public void createPost(Post newPost) {
        try {
            postRepository.saveAndFlush(newPost);
        } catch (Exception e){
            log.error(String.valueOf(e));
        }
    }

    public void updatePostById(Long id, UpdatePostRequest updatePostRequest) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new BusinessException("javadock.post.not.found", Collections.singletonList(id)));

        post.setHeader(updatePostRequest.header());
        post.setContent(updatePostRequest.content());
        post.setEdited(true);
        postRepository.save(post);
    }

    public void deletePostById(Long id){
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new BusinessException("javadock.post.not.found", Collections.singletonList(id)));
        post.setDelete(true);
        postRepository.save(post);
    }
}
