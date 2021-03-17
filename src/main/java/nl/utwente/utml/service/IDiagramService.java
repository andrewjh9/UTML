package nl.utwente.utml.service;

import jdk.jshell.Diag;
import nl.utwente.utml.model.Diagram;

import java.util.List;

public interface IDiagramService {

    List<Diagram> getAllUserDiagrams(String email);

    void add(Diagram diagram);

    List<Diagram> getAllVisible() ;

    void delete(long id);

    Diagram get(long id);

    void update(Diagram diagram);

    void toggleVisible(long id);

    boolean userOwner(long id, String email);
}
