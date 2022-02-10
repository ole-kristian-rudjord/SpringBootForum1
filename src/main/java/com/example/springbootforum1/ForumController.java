package com.example.springbootforum1;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
public class ForumController {

    private final ArrayList<Post> Posts = new ArrayList<>();

    @GetMapping("/getPosts")
    public ArrayList<Post> getPosts() {
        return Posts;
    }

    @PostMapping("/createPost")
    public void createPost(Post createdPost) {
        Posts.add(createdPost);
    }

    @PostMapping("/deleteAllPosts")
    public void deleteAllPosts() {
        Posts.clear();
    }
}
