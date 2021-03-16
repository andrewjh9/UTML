package nl.utwente.utml.service;

import nl.utwente.utml.repository.IDiagramRepository;
import nl.utwente.utml.model.Diagram;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;



@Service
@Transactional
public class DiagramServiceImpl implements IDiagramService {

    @Autowired
    private IDiagramRepository diagramRepository;

    public List<Diagram> getAllUserDiagrams(String email) {
        return diagramRepository.findByUserEmail(email);
    }


    public void add(Diagram diagram) {
        this.diagramRepository.save(diagram);
    }

    public List<Diagram> getAllVisible() {
        return diagramRepository.findBySharedTrue();
    }

    public void delete(long id) {
        this.diagramRepository.delete(this.get(id));
    }

    public Diagram get(long id) {
        return this.diagramRepository.findById(id).orElse(null);
    }

    public void update(Diagram diagram){
        this.diagramRepository.save(diagram);
    }
}
