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
public class BaseController {

    private final IDiagramService diagramService;

    @Autowired
    public BaseController(IDiagramService diagramService) {
        this.diagramService = diagramService;
    }

    @GetMapping("/me")
    public HashMap<String, List<String>> getUser(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication.getPrincipal() instanceof OidcUser) {
            OidcUser principal = ((OidcUser) authentication.getPrincipal());
            HashMap<String, List<String>> response = new HashMap<>();
            response.put("email", Collections.singletonList(principal.getUserInfo().getEmail()));
            response.put("diagramNames", diagramService.getDiagramNames( principal.getUserInfo().getEmail()));
            return response;
        }
        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "You are not logged in.");
    }

}
