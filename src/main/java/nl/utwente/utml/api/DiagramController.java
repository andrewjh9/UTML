package nl.utwente.utml.api;

import nl.utwente.utml.model.Diagram;
import nl.utwente.utml.service.IDiagramService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RequestMapping("api/diagram")
@CrossOrigin()
@RestController
public class  DiagramController {
    private final IDiagramService diagramService;
    private final HttpServletRequest request;

    @Autowired
    public DiagramController(IDiagramService diagramService, HttpServletRequest request) {
        this.diagramService = diagramService;
        this.request = request;
    }

    @GetMapping
    public Diagram getDiagram(@RequestBody long id){
        return diagramService.get(id);
    }


    @PostMapping
    public void postDiagram(@RequestBody Diagram diagram){
        diagram.setOwner(getUserEmail());
        System.out.println(diagram.getTitle());
        this.diagramService.add(diagram);

    }


    @GetMapping("/all")
    public List<Diagram> getAllDiagramsVisible(){
        return diagramService.getAllVisible();
    }


     @GetMapping("/all/me")
     public List<Diagram> getAllUsersDiagrams(){
             return diagramService.getAllUserDiagrams(getUserEmail());
     }


    @DeleteMapping
    public List<Diagram> deleteDiagram(@RequestParam long id){
        diagramService.delete(id);
        return diagramService.getAllUserDiagrams(getUserEmail());
    }


    @GetMapping("/visible")
    public void toggleVisibility(@RequestParam long id){
        if(diagramService.userOwner(id, getUserEmail())){
            diagramService.toggleVisible(id);
        } else {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED, "User doesn't own diagram");
        }

    }


    @PutMapping
    public void update(@RequestBody Diagram diagram){
        if(diagram.getId() != null) {
            diagramService.update(diagram);
        } else {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "ID not provided");
        }
    }
    /**
     * Helper method
     * Get authenticated user's email
     * @return userEmail
     */
    private String getUserEmail() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication.getPrincipal() instanceof OidcUser) {
            OidcUser principal = ((OidcUser) authentication.getPrincipal());
            String userEmail = principal.getUserInfo().getEmail();
            return userEmail;
        }
        else{
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED, "Not Logged in");
        }
    }

}
