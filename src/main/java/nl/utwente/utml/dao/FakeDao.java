package nl.utwente.utml.dao;

import nl.utwente.utml.model.Diagram;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository("fakeDao")
public class FakeDao implements DiagramDao {
    private final List<Diagram> DATABASE = new ArrayList<>();

    @Override
    public Diagram add(Diagram diagram) {
        var result = new Diagram(UUID.randomUUID(), diagram.getSerializedDiagram());
        DATABASE.add(result);
        return result;
    }

    @Override
    public List<Diagram> getAll() {
        return DATABASE;
    }

    @Override
    public Optional<Diagram> get(UUID id) {
        return DATABASE.stream()
                .filter(diagram -> diagram.getId().equals(id))
                .findFirst();
    }

    @Override
    public boolean update(UUID id, Diagram diagram) {
        int index = findIndex(id);
        if (index == DATABASE.size()) {
            return false;
        } else {
            DATABASE.set(index, diagram);
            return true;
        }
    }

    @Override
    public boolean delete(UUID id) {
        int index = findIndex(id);
        if (index == DATABASE.size()) {
            return false;
        } else {
            DATABASE.remove(index);
            return true;
        }
    }

    /**
     * Finds the index of a certain diagram in the database.
     * @param id UUID of diagram to which the index will be returned.
     * @return Index of the diagram if found. DATABASE.size() if not found.
     */
    private int findIndex(UUID id) {
        int index;
        for (index = 0; index < DATABASE.size(); index++) {
            if (DATABASE.get(index).getId().equals(id)) {
                break;
            }
        }
        return index;
    }
}
