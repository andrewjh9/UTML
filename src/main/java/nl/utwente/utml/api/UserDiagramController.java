package nl.utwente.utml.api;


import nl.utwente.utml.model.Diagram;
import nl.utwente.utml.service.IDiagramService;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * For controlling Users Diagrams rest endpoints
 */
@RequestMapping("api/diagram/user")
@CrossOrigin()
@RestController
public class UserDiagramController {

    @GetMapping()
    public List<Diagram> getUserDiagrams(@RequestBody long userId){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        authentication.getPrincipal();
        System.out.println(authentication.getPrincipal());
    }
}
