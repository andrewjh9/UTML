package nl.utwente.utml.service;

import jdk.jshell.Diag;
import nl.utwente.utml.model.Diagram;

import java.util.List;

public interface IDiagramService {
    List<Diagram> getAllUserDiagrams(String email);

    void add(Diagram diagram);

    List<Diagram> getAllVisible() ;

    void delete(String id);

    Diagram getVisible(String id);

    void update(Diagram diagram);

    void toggleVisible(String id);

    boolean userOwner(String id, String email);

    List<String> getDiagramNames(String email);
}
