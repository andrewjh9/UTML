package nl.utwente.utml.service;

import nl.utwente.utml.dao.AbstractDAO;
import nl.utwente.utml.dao.DiagramDao;
import nl.utwente.utml.model.Diagram;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
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

    public List<Diagram> getAll() {
        return diagramDao.findAll();
    }
}
