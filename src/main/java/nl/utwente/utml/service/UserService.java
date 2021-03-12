package nl.utwente.utml.service;

import nl.utwente.utml.dao.UserDao;
import nl.utwente.utml.model.Diagram;
import nl.utwente.utml.model.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserDao userDao;

    public UserService(UserDao userDao) {
        this.userDao = userDao;
    }


    public void add(User user) {
        this.userDao.save(user);
    }

    public void update(User user){
        this.userDao.update(user);
    }

    public List<User> getAll() {
        return userDao.findAll();
    }

    public void delete(long id) {
        this.userDao.delete(this.get(id));
    }

    public User get(long id) {
        return this.userDao.findOne(id);
    }
}
