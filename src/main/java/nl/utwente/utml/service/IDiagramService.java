package nl.utwente.utml.service;

import nl.utwente.utml.model.Diagram;
import nl.utwente.utml.model.User;

import java.util.List;

public interface IDiagramService {

    public List<Diagram> getAllUserDiagrams(long userId);

    public void add(Diagram diagram);

    public List<Diagram> getAll() ;

    public void delete(long id);

    public Diagram get(long id);

}
