package com.javadock.services;

import com.javadock.entities.Comment;
import com.javadock.entities.Post;
import com.javadock.exceptions.BusinessException;
import com.javadock.repositories.CommentRepository;
import com.javadock.requests.UpdateCommentRequest;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@AllArgsConstructor
public class CommentService {

    private static final Logger log = LoggerFactory.getLogger(UserService.class);

    private CommentRepository commentRepository;

    public void createComment(Comment newComment) {
        try {
            commentRepository.saveAndFlush(newComment);
        } catch (Exception e){
            log.error(String.valueOf(e));
        }
    }

    public void updateCommentById(Long id, UpdateCommentRequest updateCommentRequest) {
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new BusinessException("javadock.comment.not.found", Collections.singletonList(id)));

        comment.setContent(updateCommentRequest.content());
        comment.setEdited(true);
        commentRepository.save(comment);
    }

    public void deleteCommentById(Long id){
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new BusinessException("javadock.comment.not.found", Collections.singletonList(id)));
        comment.setDelete(true);
        commentRepository.save(comment);
    }
}
