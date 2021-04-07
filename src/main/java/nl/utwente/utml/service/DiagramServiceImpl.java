package nl.utwente.utml.service;

import nl.utwente.utml.repository.IDiagramRepository;
import nl.utwente.utml.model.Diagram;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;


@Service
@Transactional
public class DiagramServiceImpl implements IDiagramService {

    @Autowired
    private IDiagramRepository diagramRepository;

    public List<Diagram> getAllUserDiagrams(String email) {
        return diagramRepository.findByUserEmail(email);
    }


    public void add(Diagram diagram) {
        Diagram existingDiagram = this.diagramRepository.findByUserEmailAndTitle(diagram.getOwnerEmail(), diagram.getTitle());
        if(existingDiagram != null){
            existingDiagram.setSerialisedDiagram(diagram.getSerialisedDiagram());
            this.diagramRepository.save(existingDiagram);
        } else {
            this.diagramRepository.save(diagram);
        }
    }

    public void delete(String id) {
        this.diagramRepository.delete(this.get(id));
    }

    private Diagram get(String id) {
        return this.diagramRepository.findById(id).orElse(null);
    }

    public Diagram getVisible(String id) {
        return this.diagramRepository.findByIdAndVisibleTrue(id);
    }


    public void update(Diagram diagram){
        this.diagramRepository.save(diagram);
    }

    @Override
    public void toggleVisible(String id) {
        Diagram diagram = this.diagramRepository.getOne(id);
        diagram.toggleVisible();
        this.diagramRepository.save(diagram);
    }

    @Override
    public boolean userOwner(String id, String email) {
        return this.diagramRepository.getOne(id).getOwnerEmail().equals(email);
    }

    @Override
    public List<String> getDiagramNames(String email) {
        return this.diagramRepository.findByUserEmail(email).stream()
                .map(Diagram::getTitle)
                .collect(Collectors.toList());
    }
}
