package nl.utwente.utml.service;

import nl.utwente.utml.UtmlApplication;
import nl.utwente.utml.model.Diagram;
import nl.utwente.utml.repository.IDiagramRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.*;

import static org.assertj.core.api.Assertions.assertThat;

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



    }
    @Test
    public void addOverWriteDiagram(){



    }
    //getAllVisible diagram
    @Test
    public void getAllVisibleDiagrams(){

    }
    //delete a diagram

    //get a diagram by id

    //get a visible diagram by id

    //update a diagram passing diagram

    // toogle visible diagram

    // check if user if owner of a diagram

    //get names of diagram of a user.


}
