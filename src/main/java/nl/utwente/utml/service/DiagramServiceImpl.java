package nl.utwente.utml.service;

import nl.utwente.utml.model.User;
import nl.utwente.utml.repository.IDiagramRepository;
import nl.utwente.utml.model.Diagram;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;



@Service
@Transactional
public class DiagramServiceImpl implements IDiagramService {

    @Autowired
    private IDiagramRepository IDiagramRepository;

    public List<Diagram> getAllUserDiagrams(long userId) {
        return IDiagramRepository.findByOwner(userId);
    }

    public void add(Diagram diagram) {
        this.IDiagramRepository.save(diagram);
    }

    public List<Diagram> getAll() {
        return IDiagramRepository.findAll();
    }

    public void delete(long id) {
        this.IDiagramRepository.delete(this.get(id));
    }

    public Diagram get(long id) {
        return this.IDiagramRepository.findById(id).orElse(null);
    }
}
