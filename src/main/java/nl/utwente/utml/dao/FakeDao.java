package nl.utwente.utml.dao;

import nl.utwente.utml.model.Diagram;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
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
}
