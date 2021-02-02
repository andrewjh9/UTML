package nl.utwente.utml.model;

import java.util.UUID;

public class Diagram {
    private final UUID id;
    private final String serializedDiagram;

    public Diagram(UUID id, String serializedDiagram) {
        this.id = id;
        this.serializedDiagram = serializedDiagram;
    }

    public UUID getId() {
        return id;
    }

    public String getSerializedDiagram() {
        return serializedDiagram;
    }
}
