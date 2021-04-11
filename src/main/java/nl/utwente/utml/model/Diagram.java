package nl.utwente.utml.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.hibernate.annotations.GenericGenerator;
import org.joda.time.DateTime;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Date;

/**
 * Model representing the diagrams
 */
@Entity
@Table(uniqueConstraints = {@UniqueConstraint(columnNames={"title", "userEmail"})})
    public class Diagram implements Serializable {

    public Diagram(){}

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid")
    private String id;

    @Column(columnDefinition = "TEXT")
    @JsonProperty("serialisedDiagram")
    private String serialisedDiagram;

    @JsonProperty("userEmail")
    private String userEmail;

    //Sometimes referred to by Name
    @JsonProperty("title")
    private String title;

    @JsonProperty("visible")
    private boolean visible;

    @Column(name = "lastModified")
    @LastModifiedDate
    public Date lastModifiedDate = new Date();

    public Diagram(String id, String serialisedDiagram){
        this.id = id;
        this.serialisedDiagram = serialisedDiagram;
    }
    public void setId(String id) {
        this.id = id;
    }

    public String getId() {
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

    public void setVisible(boolean visible){this.visible = visible;}

    public boolean getVisible(){return visible;}

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
