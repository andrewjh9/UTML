package nl.utwente.utml.service;

import nl.utwente.utml.repository.IUserRepository;
import nl.utwente.utml.model.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements IUserService {
    private final IUserRepository userRepository;

    public UserServiceImpl(IUserRepository userRepository) {
        this.userRepository = userRepository;
    }


    public void add(User user) {
        this.userRepository.save(user);
    }


    public List<User> getAll() {
        return userRepository.findAll();
    }

    public void delete(long id) {
        this.userRepository.delete(this.get(id));
    }

    public User get(long id) {
        return this.userRepository.findById(id).orElse(null);
    }
}
