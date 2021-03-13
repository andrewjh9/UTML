package nl.utwente.utml.api;

import nl.utwente.utml.model.Diagram;
import nl.utwente.utml.service.IDiagramService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RequestMapping("api/diagram")
@CrossOrigin()
@RestController
public class  DiagramController {
    private final IDiagramService IDiagramService;
    private final HttpServletRequest request;

    @Autowired
    public DiagramController(IDiagramService IDiagramService, HttpServletRequest request) {
        this.IDiagramService = IDiagramService;
        this.request = request;

    }

    @PostMapping
    public void addDiagram(@RequestBody Diagram diagram) {
        IDiagramService.add(diagram);
    }

    @GetMapping
    public Diagram getDiagram(@RequestBody long id){
        return IDiagramService.get(id);
    }

    @GetMapping("/all")
    public List<Diagram> getAllDiagrams(){
        return IDiagramService.getAll();
    }
//    @PutMapping
//    public void updateDiagram(@RequestBody Diagram diagram){
//        diagramService.update(diagram);
//    }

    @DeleteMapping
    public void deleteDiagram(@RequestBody long id){
        IDiagramService.delete(id);
    }


//    private KeycloakSecurityContext getKeycloakSecurityContext()
//    {
//        return (KeycloakSecurityContext) request.getAttribute(KeycloakSecurityContext.class.getName());
//    }

}
