package nl.utwente.utml.api;

import nl.utwente.utml.model.Diagram;
import nl.utwente.utml.service.DiagramService;
import org.keycloak.KeycloakSecurityContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RequestMapping("api/diagram")
@CrossOrigin()
@RestController
public class DiagramController {
    private final DiagramService diagramService;
    private final HttpServletRequest request;

    @Autowired
    public DiagramController(DiagramService diagramService, HttpServletRequest request) {
        this.diagramService = diagramService;
        this.request = request;

    }

    @PostMapping
    public void addDiagram(@RequestBody Diagram diagram) {
        diagramService.add(diagram);
    }

    @GetMapping
    public Diagram getDiagram(@RequestBody long id){
        return diagramService.get(id);
    }

    @GetMapping("/all")
    public List<Diagram> getAllDiagrams(){
        return diagramService.getAll();
    }
    @PutMapping
    public void updateDiagram(@RequestBody Diagram diagram){
        diagramService.update(diagram);
    }

    @DeleteMapping
    public void deleteDiagram(@RequestBody long id){
        diagramService.delete(id);
    }


    private KeycloakSecurityContext getKeycloakSecurityContext()
    {
        return (KeycloakSecurityContext) request.getAttribute(KeycloakSecurityContext.class.getName());
    }

}
