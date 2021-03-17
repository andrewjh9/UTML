package nl.utwente.utml.repository;

import nl.utwente.utml.model.Diagram;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import java.util.Optional;
import java.util.Random;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
public class IDiagramRepositoryTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private IDiagramRepository IDiagramRepository;


    @Test
    public void testAddMultiple() {
        final Diagram toBeAdded1 = new Diagram(null, "expectedString1");
        final Diagram toBeAdded2 = new Diagram(null, "another string");
        entityManager.persist(toBeAdded1);
        entityManager.flush();
        entityManager.persist(toBeAdded2);
        entityManager.flush();
        assertEquals(2, IDiagramRepository.findAll().size());
        assertEquals(1, IDiagramRepository.findAll().stream().filter(d ->
                d.getSerialisedDiagram().equals(toBeAdded1.getSerialisedDiagram())).toArray().length);
        assertEquals(1,  IDiagramRepository.findAll().stream().filter(d ->
                d.getSerialisedDiagram().equals(toBeAdded2.getSerialisedDiagram())).toArray().length);
    }

    @Test
    public void testGetSingle() {
        final String content = "expectedString";
        Diagram returned = entityManager.persist(new Diagram(null, content));
        entityManager.flush();
        Optional<Diagram> diagram = IDiagramRepository.findById(returned.getId());
        if (diagram.isEmpty()) {
            fail();
        }
        assertEquals(content, diagram.get().getSerialisedDiagram());
    }

    @Test
    public void testGetSingleReturnsEmptyIfNonExists() {
        assertTrue(IDiagramRepository.findById(new Random().nextLong()).isEmpty());
    }

//    @Test
//    public void testUpdateNonExistent() {
//        final Diagram toBeAdded1 = new Diagram(null, "expectedString1");
//        final Diagram toBeAdded2 = new Diagram(null, "another string");
//        entityManager.persist(toBeAdded1);
//        entityManager.persist(toBeAdded2);
//        entityManager.flush();
//        assertFalse(diagramRepository.per(UUID.randomUUID(),  toBeAdded1));
//    }
////
//    @Test
//    public void testUpdateExistent() {
//        final String string1 = "expectedString1";
//        final String string2 = "another string";
//        final String updatedString = "this is the updated string";
//        final Diagram result1 = dao.add(new Diagram(null, string1));
//        final Diagram result2 = dao.add(new Diagram(null, string2));
//        assertTrue(dao.update(result1.getId(), new Diagram(result1.getId(), updatedString)));
//
//        assertEquals(updatedString, dao.get(result1.getId()).map(Diagram::getSerializedDiagram).orElse("wrong"));
//        assertEquals(string2, dao.get(result2.getId()).map(Diagram::getSerializedDiagram).orElse("wrong"));
//
//    }
//
//    @Test
//    public void testDeleteExistentRestUnaffected() {
//        List<Diagram> diagrams = List.of(
//                new Diagram(null, "str1"),
//                new Diagram(null, "str2"),
//                new Diagram(null, "str3")
//        );
//
//        diagrams = diagrams.stream().map(d -> entityManager.persist(d)).collect(Collectors.toList());
//        entityManager.flush();
//        final Long removedId = diagrams.get(1).getId();
//
//        assertTrue(diagramRepository.delete(removedId));
//        assertEquals(2, diagramRepository.getAll().size());
//        assertTrue(diagrams.stream().map(Diagram::getId).allMatch(id ->
//            id.equals(removedId) || diagramRepository.get(id).isPresent()
//        ));
//    }
//
//    @Test
//    public void testDeleteNonExistentRestUnaffected() {
//        List<Diagram> diagrams = List.of(
//                new Diagram(null, "str1"),
//                new Diagram(null, "str2"),
//                new Diagram(null, "str3")
//        );
//
//        diagrams = diagrams.stream().map(d -> dao.add(d)).collect(Collectors.toList());
//
//        assertFalse(dao.delete(UUID.randomUUID()));
//        assertEquals(3, dao.getAll().size());
//        assertTrue(diagrams.stream().map(Diagram::getId).allMatch(id -> dao.get(id).isPresent()));
//    }
}
