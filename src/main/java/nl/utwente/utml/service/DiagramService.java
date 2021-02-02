package nl.utwente.utml.service;

import nl.utwente.utml.dao.DiagramDao;
import nl.utwente.utml.model.Diagram;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DiagramService {
    private final DiagramDao diagramDao;

    public DiagramService(@Qualifier("fakeDao") DiagramDao diagramDao) {
        this.diagramDao = diagramDao;
    }

    public Diagram add(Diagram diagram) {
        return diagramDao.add(diagram);
    }

    public List<Diagram> getAll() {
        return diagramDao.getAll();
    }
}
