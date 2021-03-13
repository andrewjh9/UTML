package nl.utwente.utml.service;

import nl.utwente.utml.model.User;

import java.util.List;

public interface IUserService {
        public void add(User user);

//        public void update(User user);

        public List<User> getAll() ;

        public void delete(long id);

        public User get(long id);
}


