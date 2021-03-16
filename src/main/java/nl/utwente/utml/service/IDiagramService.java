package nl.utwente.utml.service;

import jdk.jshell.Diag;
import nl.utwente.utml.model.Diagram;

import java.util.List;

public interface IDiagramService {

    public List<Diagram> getAllUserDiagrams(String email);

    public void add(Diagram diagram);

    public List<Diagram> getAllVisible() ;

    public void delete(long id);

    public Diagram get(long id);

    public void update(Diagram diagram);



}
