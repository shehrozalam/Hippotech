package com.hippotech.api.controllers;

import com.hippotech.api.data.BlogRepository;
import com.hippotech.api.data.BlogSubscriberRepository;
import com.hippotech.api.dto.BlogPostCommentDto;
import com.hippotech.api.model.BlogPost;
import com.hippotech.api.model.BlogPostComment;
import com.hippotech.api.model.BlogSubscriber;
import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.stereotype.Component;


@Api(tags = "Blog")
@RestController
public class BlogController {
    private static final Logger log = LoggerFactory.getLogger(AuthenticationController.class);

    @Autowired
    private BlogRepository blogRepository;

    @Autowired
    private BlogSubscriberRepository blogSubscriberRepository;

    @GetMapping("api/blog")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Blog entries are returned."),
    })
    public ResponseEntity<List<BlogPost>> getAll(@RequestParam(value="name", defaultValue="World") String name) {
        List<BlogPost> blogs = blogRepository.findAll();
        return new ResponseEntity<>(blogs, HttpStatus.OK);
    }

    @PostMapping("api/blog/subscribe")
    public ResponseEntity subscribe(@RequestBody BlogSubscriber blogSubscriber) {
      log.error("Subscribe");
        Optional<BlogSubscriber> existingSubscriber = blogSubscriberRepository.findById(blogSubscriber.getEmail());
        if (existingSubscriber.isPresent()) {
            log.warn("Attempting to subscribe to blog twice: " + blogSubscriber.getEmail());
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
        blogSubscriberRepository.save(blogSubscriber);
        log.error("About to request");
        try {
          String url2 = "https://api.github.com/users/octocat/orgs";

          MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
          map.add("url", "http://www.hippotech.com");
          RestTemplate restTemplate = new RestTemplate(new HttpComponentsClientHttpRequestFactory());
          HttpHeaders headers = new HttpHeaders();
          headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
          HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<MultiValueMap<String, String>>(map, headers);

          log.error("Request sent!");
          // ResponseEntity<String> response = restTemplate.postForEntity(url2, request , String.class);
          ResponseEntity<String> response = restTemplate.getForEntity(url2, String.class);
          log.error(response.toString());
      } catch (Exception e) {
          log.error(e.toString());
          log.error("!!!");
      }

        return new ResponseEntity(HttpStatus.CREATED);
    }

    @PostMapping("api/blog/justification")
    public ResponseEntity subscribe(@RequestBody BlogPostJustification blogPostJustification) {
        log.info("Received justification: " + blogPostJustification.getJustification());
        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping("api/blog/unsubscribe")
    public ResponseEntity unsubscribe(@RequestBody BlogSubscriber blogSubscriber) {
        Optional<BlogSubscriber> existingSubscriber = blogSubscriberRepository.findById(blogSubscriber.getEmail());
        if (existingSubscriber.isEmpty()) {
            log.warn("Attempting to unsubscribe a user that is not subscribed: " + blogSubscriber.getEmail());
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }

        blogSubscriberRepository.delete(existingSubscriber.get());
        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping("api/blog/{blogId}/comments")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Comment is posed on the blog."),
            @ApiResponse(responseCode = "400", description = "Inappropriate comment")
    })
    //public ResponseEntity<?> postComment(@PathVariable long blogId, @RequestParam(value="text") String text) {
    public ResponseEntity<?> postComment(@PathVariable long blogId, @RequestBody String text) {
        String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        BlogPost blogPost = blogRepository.getById(blogId);
        BlogPostComment blogPostComment = new BlogPostComment();
        blogPostComment.setEmail(username);
        blogPostComment.setText(text);
        blogPost.getComments().add(blogPostComment);
        blogRepository.save(blogPost);
        blogPost = blogRepository.getById(blogId);
        blogPostComment = blogPost.getComments().get(blogPost.getComments().size() -1);

        if (text.toUpperCase().contains("IDIOT")) {
          BadWordResponse badWordResponse = new BadWordResponse();
          badWordResponse.setError("Bad Language");
          badWordResponse.setWord("idiot");
          return new ResponseEntity<>(badWordResponse, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(blogPostComment, HttpStatus.CREATED);
    }
}
