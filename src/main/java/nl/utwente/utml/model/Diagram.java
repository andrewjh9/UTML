package nl.utwente.utml.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import nl.utwente.utml.Roles;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.security.access.annotation.Secured;

import javax.persistence.*;

import java.io.Serializable;
import java.util.UUID;


@Entity
@Table(uniqueConstraints = {@UniqueConstraint(columnNames={"name", "userEmail"})})
    public class Diagram implements Serializable {

    public Diagram(){}

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @JsonProperty("serializedDiagram")
    private String serializedDiagram;

    @JsonProperty("userEmail")
    private String userEmail;


    @JsonProperty("diagramName")
    private String name;

    @JsonProperty("shared")
    private boolean shared;


    public Diagram(Long id, String serializedDiagram){
        this.id = id;
        this.serializedDiagram = serializedDiagram;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public String getSerializedDiagram() {
        return serializedDiagram;
    }

    public void setSerializedDiagram(String serializedDiagram) {
        this.serializedDiagram = serializedDiagram;
    }

    public String getOwnerEmail() {
        return userEmail;
    }

    public void setOwner(String userEmail) {
        this.userEmail = userEmail;
    }
}
