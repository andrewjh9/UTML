package nl.utwente.utml.api;

import nl.utwente.utml.model.Diagram;
import nl.utwente.utml.service.DiagramService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("api/diagram")
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
    public List<Diagram> getAllPeople() {
        return diagramService.getAll();
    }
}
