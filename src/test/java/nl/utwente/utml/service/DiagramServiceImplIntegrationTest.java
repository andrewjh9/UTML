package nl.utwente.utml.service;

import nl.utwente.utml.model.Diagram;
import nl.utwente.utml.repository.IDiagramRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.*;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;

/**
 * note: Mocking is done inline
 */
@RunWith(SpringRunner.class)
public class DiagramServiceImplIntegrationTest {


    public static final String EXAMPLE_USER_EMAIL_1 = "example1@example.com";
    public static final String EXAMPLE_USER_EMAIL_2 = "example2@example.com";
    private Diagram testDiagram1;
    private Diagram testDiagram2;


    @TestConfiguration
    static class DiagramServiceImplTestContextConfiguration {
        @Bean
        public IDiagramService diagramService() {
            return new DiagramServiceImpl();
        }
    }

    @Autowired
    private IDiagramService diagramService;


    @MockBean
    private IDiagramRepository diagramRepository;


    @Before
    public void setUp(){
        testDiagram1 = new Diagram();
        testDiagram1.setOwner(EXAMPLE_USER_EMAIL_1);
        testDiagram1.setTitle("test-diagram");

        testDiagram2 = new Diagram();
        testDiagram2.setOwner(EXAMPLE_USER_EMAIL_2);
        testDiagram2.setTitle("test-diagram");

    }

    @Test
    public void findAllDiagramsByUser(){
        Mockito.when(diagramRepository.
                findByUserEmail(testDiagram1.getOwnerEmail())).
                thenReturn(Collections.singletonList(testDiagram1));
        assertThat(this.diagramService.getAllUserDiagrams(EXAMPLE_USER_EMAIL_1)).isEqualTo(Collections.singletonList(testDiagram1));
        Mockito.when(diagramRepository.
                findByUserEmail(testDiagram2.getOwnerEmail())).
                thenReturn(Collections.singletonList(testDiagram2));
        assertThat(this.diagramService.getAllUserDiagrams(EXAMPLE_USER_EMAIL_2)).isEqualTo(Collections.singletonList(testDiagram2));
    }

    //Add diagram check overwrite
    @Test
    public void addDiagram(){
        Mockito.when(diagramRepository.save(testDiagram1)).thenReturn(testDiagram1);
        assertThat(this.diagramService.add(testDiagram1)).isEqualTo(testDiagram1);
    }

    @Test
    public void addOverwriteDiagram(){
        Mockito.when(diagramRepository.save(testDiagram1)).thenReturn(testDiagram1);
        assertThat(this.diagramService.add(testDiagram1)).isEqualTo(testDiagram1);
        assertThat(this.diagramService.add(testDiagram1)).isEqualTo(testDiagram1);
    }

    /*
    Get a visible diagram by id check non-visible diagram are not returned.
     */
    @Test
    public void getByIdVisibleDiagram(){
        testDiagram1.setVisible(true);
        Mockito.when(diagramRepository.findByIdAndVisibleTrue(testDiagram1.getId())).thenReturn(testDiagram1);
        assertThat(this.diagramService.getByIdVisible(testDiagram1.getId())).isEqualTo(testDiagram1);
    }
    /*
    Update a diagram passing diagram
     */
//    @Test
//    public void update(){
//        Mockito.when(diagramRepository.save(testDiagram1)).thenReturn(testDiagram1);
//        assertThat(this.diagramService.update(testDiagram1)).isEqualTo(testDiagram1);
//    }

    /*
        Toggle on and off visibility of diagram
     */
    @Test
    public void toggleVisible(){
        testDiagram1.setVisible(false);
        Mockito.when(diagramRepository.save(testDiagram1)).thenReturn(testDiagram1);
        Mockito.when(diagramRepository.getOne(testDiagram1.getId())).thenReturn(testDiagram1);
        assertThat(this.diagramService.toggleVisible(testDiagram1.getId()).getVisible()).isEqualTo(true);

    }

    @Test
    public void userOwner(){
        Mockito.when(this.diagramRepository.getOne(testDiagram1.getId())).thenReturn(testDiagram1);
        assertThat(this.diagramService.userOwner(testDiagram1.getId(), EXAMPLE_USER_EMAIL_1)).isEqualTo(true);
        Mockito.when(this.diagramRepository.getOne(testDiagram2.getId())).thenReturn(testDiagram2);
        assertThat(this.diagramService.userOwner(testDiagram2.getId(), EXAMPLE_USER_EMAIL_1)).isEqualTo(false);
    }


    @Test
    public void getDiagramNames(){
        List<Diagram> response = new ArrayList<>();
        response.add(testDiagram1);
        Mockito.when(this.diagramRepository.findByUserEmail(EXAMPLE_USER_EMAIL_1)).thenReturn(response);
        List<String> responseNames = new ArrayList<>();
        responseNames.add(testDiagram1.getTitle());
        assertThat(this.diagramService.getDiagramNames(EXAMPLE_USER_EMAIL_1)).isEqualTo(responseNames);
    }

}
