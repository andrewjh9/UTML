package nl.utwente.utml.service;

import nl.utwente.utml.model.Diagram;

import java.util.List;

public interface IDiagramService {


    public void add(Diagram diagram);

    public List<Diagram> getAll() ;

    public void delete(long id);

    public Diagram get(long id);

}
