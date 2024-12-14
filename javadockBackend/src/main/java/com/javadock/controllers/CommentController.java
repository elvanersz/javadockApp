package com.javadock.controllers;

import com.javadock.requests.CreateCommentRequest;
import com.javadock.requests.UpdateCommentRequest;
import com.javadock.services.CommentService;
import com.javadock.validation.GenericMessage;
import com.javadock.validation.Messages;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/comments")
public class CommentController {

    private CommentService commentService;

    @PostMapping
    public GenericMessage createComment(@Valid @RequestBody CreateCommentRequest newComment){
        commentService.createComment(newComment.toComment());
        String message = Messages.getMessageForLocale("javadock.create.comment.success.message",
                LocaleContextHolder.getLocale());
        return new GenericMessage(message);
    }

    @PatchMapping("/{id}")
    public GenericMessage updateCommentById(@PathVariable Long id,
                                            @Valid @RequestBody UpdateCommentRequest updateCommentRequest){
        commentService.updateCommentById(id, updateCommentRequest);
        String message = Messages.getMessageForLocale("javadock.update.comment.success.message",
                LocaleContextHolder.getLocale());
        return new GenericMessage(message);
    }

    @DeleteMapping("/{id}")
    public GenericMessage deleteCommentById(@PathVariable Long id){
        commentService.deleteCommentById(id);
        String message = Messages.getMessageForLocale("javadock.delete.comment.success.message",
                LocaleContextHolder.getLocale());
        return new GenericMessage(message);
    }
}
