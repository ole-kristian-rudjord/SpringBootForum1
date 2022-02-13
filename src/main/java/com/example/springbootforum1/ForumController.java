package com.example.springbootforum1;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.List;

@RestController
public class ForumController {

    Logger logger = LoggerFactory.getLogger(PostsRepository.class);

    @Autowired
    private HttpSession session;

    @Autowired
    PostsRepository pRep;

    @GetMapping("/usernameAvailable")
    public boolean usernameAvailable(User user) {
        return pRep.usernameAvailable(user);
    }

    private boolean validateUserCreation(User user) {
        String regexUsername = "^[0-9a-zA-Z ._\\-]{5,20}$";
        String regexPassword = "^[0-9a-zA-Z._\\-]{5,30}$";
        boolean usernameOK = user.getUsername().matches(regexUsername);
        boolean passwordOK = user.getPassword().matches(regexPassword);
        if (usernameOK && passwordOK) {
            return true;
        }
        logger.error("User-creation validation error");
        return false;
    }

    @PostMapping("/createAccount")
    public void createAccount(User user, HttpServletResponse response) throws IOException {
        if (!validateUserCreation(user)) {
            response.sendError(HttpStatus.NOT_ACCEPTABLE.value());
        }
        else {
            if (!pRep.createAccount(user)) {
                response.sendError(HttpStatus.UNPROCESSABLE_ENTITY.value());
            }
        }

    }

    @GetMapping("/login")
    public boolean login(User user) {
        if(pRep.checkUsernameAndPassword(user)) {
            session.setAttribute("loggedIn", user);
            return true;
        }
        return false;
    }

    @GetMapping("/isLoggedIn")
    public boolean isLoggedIn() {
        if (session.getAttribute("loggedIn") != null) {
            return true;
        }
        return false;
    }

    @PostMapping("/logout")
    public void logout() {
        session.removeAttribute("loggedIn");
    }

    @GetMapping("/getPosts")
    public List<Post> getPosts(HttpServletResponse response) throws IOException {
        if (pRep.getPosts() == null) {
            response.sendError(HttpStatus.UNPROCESSABLE_ENTITY.value());
        }
        return pRep.getPosts();
    }

    private boolean validateForumPost(Post specificPost) {
        String regexTitle = "^[0-9a-zA-ZæøåÆØÅ. \\-]{3,20}$";
        String regexContent = "^[0-9a-zA-ZæøåÆØÅ. \\-]{5,510}$";
        boolean titleOK = specificPost.getTitle().matches(regexTitle);
        boolean contentOK = specificPost.getContent().matches(regexContent);
        if (titleOK && contentOK) {
            return true;
        }
        logger.error("Post-creation validation error");
        return false;
    }

    @PostMapping("/createPost")
    public void createPost(Post createdPost, HttpServletResponse response) throws IOException {
        if (!validateForumPost(createdPost)) {
            response.sendError(HttpStatus.NOT_ACCEPTABLE.value());
        }
        else {
            if (!pRep.createPost(createdPost)) {
                response.sendError(HttpStatus.UNPROCESSABLE_ENTITY.value());
            }
        }
    }

    @PostMapping("/deleteAllPosts")
    public void deleteAllPosts(HttpServletResponse response) throws IOException {
        if (!pRep.deleteAllPosts()) {
            response.sendError(HttpStatus.UNPROCESSABLE_ENTITY.value());
        }
    }

    @PostMapping("/deleteThisPost")
    public void deleteThisPost(int id, HttpServletResponse response) throws IOException {
        if (!pRep.deleteThisPost(id)) {
            response.sendError(HttpStatus.UNPROCESSABLE_ENTITY.value());
        }
    }

    @GetMapping("/getSpecificPost")
    public Post getSpecificPost(int id, HttpServletResponse response) throws IOException {
        if (pRep.getSpecificPost(id) == null) {
            response.sendError(HttpStatus.UNPROCESSABLE_ENTITY.value());
        }
        return pRep.getSpecificPost(id);
    }

    @PostMapping("/editPost")
    public void editPost(Post specificPost, HttpServletResponse response) throws IOException {
        if (!validateForumPost(specificPost)) {
            response.sendError(HttpStatus.NOT_ACCEPTABLE.value());
        } else {
            if (!pRep.editPost(specificPost)) {
                response.sendError(HttpStatus.UNPROCESSABLE_ENTITY.value());
            }
        }
    }
}
