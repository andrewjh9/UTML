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

import java.util.List;

@RequestMapping("api/diagram")
@CrossOrigin()
@RestController
/**
 * Diagram Controller
 * Handle all requests for diagrams, all end points require use authentication unless stated.
 */
public class  DiagramController {
    private final IDiagramService diagramService;

    @Autowired
    public DiagramController(IDiagramService diagramService) {
        this.diagramService = diagramService;
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


    /**
     * @param diagram - to be saved to db
     */
    @PostMapping
    public void postDiagram(@RequestBody Diagram diagram){
        diagram.setOwner(getUserEmail());
        this.diagramService.add(diagram);
    }


    /**
     * Get's all diagrams belonging to a user
     * @return
     */
     @GetMapping("/all/me")
     public List<Diagram> getAllUsersDiagrams(){
             return diagramService.getAllUserDiagrams(getUserEmail());
     }


    /**
     * @param id - id of diagram being deleted
     * @return diagrams -  the updated list of the user's diagrams
     */
    @DeleteMapping
    public List<Diagram> deleteDiagram(@RequestParam String id){
        if(diagramService.userOwner(id, getUserEmail())){
            diagramService.delete(id);
        return diagramService.getAllUserDiagrams(getUserEmail());
        } else {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED, "User doesn't own diagram");
        }
    }


    /**
     * @param id - id of diagram's visibility being toggled.
     */
    @GetMapping("/toggle/visible")
    public void toggleVisibility(@RequestParam String id){
        if(diagramService.userOwner(id, getUserEmail())){
            diagramService.toggleVisible(id);
        } else {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED, "User doesn't own diagram");
        }

    }

    /**
     * Passes diagram object to be saved to db as a overwrite.
     * @param diagram, diagram being updated
     */
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
