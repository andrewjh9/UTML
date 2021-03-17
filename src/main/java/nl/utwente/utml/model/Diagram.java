package nl.utwente.utml.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.joda.time.DateTime;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;

import java.io.Serializable;


@Entity
@Table(uniqueConstraints = {@UniqueConstraint(columnNames={"name", "userEmail"})})
    public class Diagram implements Serializable {

    public Diagram(){}

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @JsonProperty("serialisedDiagram")
    private String serialisedDiagram;

    @JsonProperty("userEmail")
    private String userEmail;


    @JsonProperty("title")
    private String name;

    @JsonProperty("visible")
    private boolean visible;

    @Column(name = "lastModified")
    @LastModifiedDate
    public DateTime lastModifiedDate;

    public Diagram(Long id, String serialisedDiagram){
        this.id = id;
        this.serialisedDiagram = serialisedDiagram;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public String getSerialisedDiagram() {
        return serialisedDiagram;
    }

    public void setSerialisedDiagram(String serializedDiagram) {
        this.serialisedDiagram = serializedDiagram;
    }

    public String getOwnerEmail() {
        return userEmail;
    }

    public void setOwner(String userEmail) {
        this.userEmail = userEmail;
    }

    public void toggleVisible(){
        this.visible = !this.visible;
    }
}
