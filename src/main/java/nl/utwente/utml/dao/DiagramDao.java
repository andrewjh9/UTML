package nl.utwente.utml.dao;

import nl.utwente.utml.model.Diagram;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * Data access object for doing CRUD operations on diagrams stored in a database.
 */
public interface DiagramDao {
    /**
     * Add a diagram. Generates a new UUID for the diagram to be added.
     * @param diagram Node to be added. UUID need not be set.
     * @return The added diagram with the newly generated UUID.
     */
    Diagram add(Diagram diagram);

    /**
     * Retrieve all diagrams stored in the database.
     * @return All diagrams stored in the database
     */
    List<Diagram> getAll();

    /**
     * Returns a diagram with a given id if it can be found.
     * @param id ID of the diagram to be returned.
     * @return Node with provided id if it exists. Optional.empty() otherwise.
     */
    Optional<Diagram> get(UUID id);

    /**
     * Update the diagram with a given id in the database.
     * @param id ID of the diagram to be updated.
     * @param diagram New values of the diagram.
     * @return True if the update was successful.
     *         False if the update was unsuccessful or no diagram with such an id could be found.
     */
    boolean update(UUID id, Diagram diagram);

    /**
     * Delete the diagram with a given ID.
     * @param id ID of the diagram to be deleted.
     * @return True if the deletion was successful, false otherwise.
     */
    boolean delete(UUID id);
}
