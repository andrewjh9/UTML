package nl.utwente.utml.api;


import nl.utwente.utml.CustomWebMvcRegistrations.SubdomainController;
import nl.utwente.utml.model.Diagram;
import nl.utwente.utml.service.IDiagramService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.core.annotation.AnnotationUtils;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.mvc.condition.RequestCondition;

import javax.servlet.http.HttpServletRequest;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import java.util.*;

@CrossOrigin()
@RestController
/**
 * Base Controller
 * handles the only non-authenticated request which checks if the client is authenticated
 */
public class BaseController {


    private final IDiagramService diagramService;

    @Autowired
    public BaseController(IDiagramService diagramService) {
        this.diagramService = diagramService;
    }

    /**
     * Checks if the client currently has a authenticated session with the server.
     * @return HashMap of the authenticated user's email, also returns the names of diagram belonging to the user.
     * @throw Not-Authorized status if user is not logged in.
     */
    @GetMapping("/me")
    public HashMap<String, List<String>> getUser(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication.getPrincipal() instanceof OidcUser) {
            OidcUser principal = ((OidcUser) authentication.getPrincipal());
            HashMap<String, List<String>> response = new HashMap<>();
            response.put("email", Collections.singletonList(principal.getUserInfo().getEmail()));
            response.put("diagramNames", diagramService.getDiagramNames(principal.getUserInfo().getEmail()));
            return response;
        }
        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "You are not logged in.");
    }

    /**
     * Does not require authentication
     * Returns a diagram to the user (provided it is set to visible)
     * @param id of the diagram
     * @return diagram
     */
    @GetMapping("/visible")
    public Diagram getVisibleDiagram(@RequestParam String id){
        return diagramService.getByIdVisible(id);
    }


}
