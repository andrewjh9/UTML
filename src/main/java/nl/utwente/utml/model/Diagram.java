package nl.utwente.utml.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

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



    public Integer getId() {
        return id;
    }

    public String getSerializedDiagram() {
        return serializedDiagram;
    }
}
