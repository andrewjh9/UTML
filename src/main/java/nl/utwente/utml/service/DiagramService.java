package nl.utwente.utml.service;

import nl.utwente.utml.dao.DiagramDao;
import nl.utwente.utml.dao.IDiagramDao;
import nl.utwente.utml.model.Diagram;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DiagramService {
    private final DiagramDao IDiagramDao;

    public DiagramService(@Qualifier("diagramDao") DiagramDao IDiagramDao) {
        this.IDiagramDao = IDiagramDao;
    }

    public void add(Diagram diagram) {
        IDiagramDao.save(diagram);
    }

    public List<Diagram> getAll() {
        return IDiagramDao.findAll();
    }
}
