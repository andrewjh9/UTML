package nl.utwente.utml.api;

import nl.utwente.utml.model.Diagram;
import nl.utwente.utml.model.User;
import nl.utwente.utml.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RequestMapping("api/user")
@CrossOrigin()
@RestController
public class UserController {
    private final UserServiceImpl userServiceImpl;
    private final HttpServletRequest request;

    @Autowired
    public UserController(UserServiceImpl userServiceImpl, HttpServletRequest request) {
        this.userServiceImpl = userServiceImpl;
        this.request = request;
    }

    @PostMapping
    public void addDiagram(@RequestBody User user) {
        userServiceImpl.add(user);
    }

    @GetMapping
    public User getUser(@RequestBody long id){
        return userServiceImpl.get(id);
    }



    @GetMapping("/all")
    public List<User> getAllUsers(){

        return userServiceImpl.getAll();
    }
//    @PutMapping
//    public void updateDiagram(@RequestBody User user){
//        userServiceImpl.update(user);
//    }

    @DeleteMapping
    public void deleteDiagram(@RequestBody long id){
        userServiceImpl.delete(id);
    }


//    private KeycloakSecurityContext getKeycloakSecurityContext()
//    {
//        return (KeycloakSecurityContext) request.getAttribute(KeycloakSecurityContext.class.getName());
//    }
}
