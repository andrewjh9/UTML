package nl.utwente.utml.api;


import nl.utwente.utml.service.IDiagramService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;

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

}
