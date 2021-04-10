package nl.utwente.utml.service;

import nl.utwente.utml.model.Diagram;

import java.util.List;

public interface IDiagramService {
    List<Diagram> getAllUserDiagrams(String email);

    Diagram add(Diagram diagram);

    void delete(String id);

    Diagram getByIdVisible(String id);

    Diagram update(Diagram diagram);

    Diagram toggleVisible(String id);

    boolean userOwner(String id, String email);

    List<String> getDiagramNames(String email);
}
