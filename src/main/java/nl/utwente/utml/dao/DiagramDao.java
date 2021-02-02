package nl.utwente.utml.dao;

import nl.utwente.utml.model.Diagram;

import java.util.List;

public interface DiagramDao {
    Diagram add(Diagram diagram);
    List<Diagram> getAll();
}
