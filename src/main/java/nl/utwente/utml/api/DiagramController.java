package nl.utwente.utml.api;

import nl.utwente.utml.model.Diagram;
import nl.utwente.utml.service.DiagramService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("api/diagram")
@CrossOrigin()
@RestController
public class DiagramController {
    private final DiagramService diagramService;
    @Autowired
    public DiagramController(DiagramService diagramService) {
        this.diagramService = diagramService;
    }

    @PostMapping
    public void addDiagram(@RequestBody Diagram diagram) {
        diagramService.add(diagram);
    }

    @GetMapping
    public void getDiagram(@RequestBody long id){
        diagramService.get(id);
    }

    @PutMapping
    public void updateDiagram(@RequestBody Diagram diagram){
        diagramService.update(diagram);
    }

    @DeleteMapping
    public void deleteDiagram(@RequestBody long id){
        diagramService.delete(id);
    }


    @GetMapping
    public List<Diagram> getAllPeople() {
        return diagramService.getAll();
    }
}
