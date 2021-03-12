package nl.utwente.utml.api;

import nl.utwente.utml.model.Diagram;
import nl.utwente.utml.model.User;
import nl.utwente.utml.service.DiagramService;
import nl.utwente.utml.service.UserService;
import org.keycloak.KeycloakSecurityContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RequestMapping("api/user")
@CrossOrigin()
@RestController
public class UserController {
    private final UserService userService;
    private final HttpServletRequest request;

    @Autowired
    public UserController(UserService userService, HttpServletRequest request) {
        this.userService = userService;
        this.request = request;
    }

    @PostMapping
    public void addDiagram(@RequestBody User user) {
        userService.add(user);
    }

    @GetMapping
    public User getUser(@RequestBody long id){
        return userService.get(id);
    }

    @GetMapping("/all")
    public List<User> getAllUsers(){

        return userService.getAll();
    }
    @PutMapping
    public void updateDiagram(@RequestBody User user){
        userService.update(user);
    }

    @DeleteMapping
    public void deleteDiagram(@RequestBody long id){
        userService.delete(id);
    }


//    private KeycloakSecurityContext getKeycloakSecurityContext()
//    {
//        return (KeycloakSecurityContext) request.getAttribute(KeycloakSecurityContext.class.getName());
//    }
}
