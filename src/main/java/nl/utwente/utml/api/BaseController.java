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
    public List<String> getUser(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication.getPrincipal() instanceof OidcUser) {
            OidcUser principal = ((OidcUser) authentication.getPrincipal());
            return diagramService.getDiagramNames( principal.getUserInfo().getEmail());
        }
        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "You are not logged in.");
    }

}
