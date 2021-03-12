package nl.utwente.utml.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import nl.utwente.utml.Roles;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.security.access.annotation.Secured;

import javax.persistence.*;

import java.io.Serializable;
import java.util.UUID;


@Entity
    public class Diagram implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @JsonProperty("serializedDiagram")
    private String serializedDiagram;

    @ManyToOne()
    @JoinColumn(name = "userId")
    @JsonProperty("userId")
    private User owner;



    @JsonProperty("shared")
    private boolean shared;

    public Integer getId() {
        return id;
    }

    public String getSerializedDiagram() {
        return serializedDiagram;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }
}
