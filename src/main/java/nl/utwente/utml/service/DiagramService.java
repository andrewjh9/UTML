package nl.utwente.utml.service;

import nl.utwente.utml.dao.DiagramDao;
import nl.utwente.utml.model.Diagram;
import org.springframework.stereotype.Service;

import java.util.List;



@Service
public class DiagramService {
    private final DiagramDao diagramDao;

    public DiagramService(DiagramDao diagramDao) {
        this.diagramDao = diagramDao;

    }

    public void add(Diagram diagram) {
        this.diagramDao.save(diagram);
    }

    public void update(Diagram diagram){
        this.diagramDao.update(diagram);
    }

    public List<Diagram> getAll() {
        return diagramDao.findAll();
    }

    public void delete(long id) {
        this.diagramDao.delete(this.get(id));
    }

    public Diagram get(long id) {
        return this.diagramDao.findOne(id);
    }
}
