package com.example.springbootforum1;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class PostsRepository {

    Logger logger = LoggerFactory.getLogger(PostsRepository.class);

    @Autowired
    private JdbcTemplate db;

    public boolean usernameAvailable(User user) {
        String sql = "SELECT COUNT(*) FROM Users WHERE username=?";
        try {
            int countUsername = db.queryForObject(sql, Integer.class, user.getUsername());
            if (countUsername == 0) {
                return true;
            }
            return false;
        }
        catch (Exception e) {
            logger.error("Error with usernameAvailable(): " + e);
            return false;
        }
    }

    public boolean createAccount(User user) {
        String sql = "INSERT INTO Users (username, password) VALUES ('" + user.getUsername() + "', '" + user.getPassword() + "')";
        try {
            db.update(sql);
            return true;
        }
        catch (Exception e) {
            logger.error("Error with createAccount(): " + e);
            return false;
        }
    }

    public boolean checkUsernameAndPassword(User user) {
        String sql = "SELECT COUNT(*) FROM Users WHERE username=? AND password=?";
        try {
            int countUser = db.queryForObject(sql, Integer.class, user.getUsername(), user.getPassword());
            if (countUser > 0) {
                return true;
            }
            return false;
        }
        catch (Exception e) {
            logger.error("Error with checkUsernameAndPassword(): " + e);
            return false;
        }
    }

    public List<Post> getPosts() {
        String sql = "SELECT * FROM PostsDB";
        try {
            List<Post> allPosts = db.query(sql, new BeanPropertyRowMapper(Post.class));
            return allPosts;
        }
        catch (Exception e) {
            logger.error("Error from getPosts(): " + e);
            return null;
        }
    }

    public boolean createPost(Post createdPost) {
        String sql = "INSERT INTO PostsDB (title, content) VALUES (?,?)";
        try {
            db.update(sql, createdPost.getTitle(), createdPost.getContent());
            return true;
        }
        catch (Exception e) {
            return false;
        }
    }

    public boolean deleteAllPosts() {
        String sql = "DELETE FROM PostsDB";
        try {
            db.update(sql);
            return true;
        }
        catch (Exception e) {
            return false;
        }
    }

    public boolean deleteThisPost(int id) {
        String sql = "DELETE FROM PostsDB WHERE id = " + id;
        try {
            db.update(sql);
            return true;
        }
        catch (Exception e) {
            return false;
        }
    }

    public Post getSpecificPost(int id) {
        String sql = "SELECT * FROM PostsDB WHERE id=?";
        try {
            Post returningPost = db.queryForObject(sql, BeanPropertyRowMapper.newInstance(Post.class), id);
            return returningPost;
        }
        catch (Exception e) {
            logger.error("Error from getSpecificPost(): " + e);
            return null;
        }
    }

    public boolean editPost(Post specificPost) {
        String sql = "UPDATE PostsDB" +
                " SET title = '" + specificPost.getTitle() + "'," +
                " content = '" + specificPost.getContent() + "'" +
                " WHERE id = " + specificPost.getId();
        try {
            db.update(sql);
            return true;
        }
        catch (Exception e) {
            return false;
        }
    }
}
