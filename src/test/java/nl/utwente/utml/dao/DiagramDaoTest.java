//package nl.utwente.utml.dao;
//
//import nl.utwente.utml.model.Diagram;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//
//import java.util.List;
//import java.util.Optional;
//import java.util.UUID;
//import java.util.stream.Collectors;
//
//import static org.junit.jupiter.api.Assertions.*;
//
//
//public abstract class DiagramDaoTest {
//    protected DiagramDao dao;
//
//    @BeforeEach
//    public abstract void setup();
//
//    @Test
//    public void testStartEmpty() {
//        assertEquals(0, dao.getAll().size());
//    }
//
////    @Test
////    public void testAddSingle() {
//////        Diagram toBeAdded = new Diagram(null, "expectedString");
////        dao.add(toBeAdded);
////
////        assertEquals(1, dao.getAll().size());
////        assertEquals(toBeAdded.getSerializedDiagram(), dao.getAll().get(0).getSerializedDiagram());
////    }
//
//    @Test
//    public void testAddMultiple() {
//        final Diagram toBeAdded1 = new Diagram(null, "expectedString1");
//        final Diagram toBeAdded2 = new Diagram(null, "another string");
//        dao.add(toBeAdded1);
//        dao.add(toBeAdded2);
//
//        assertEquals(2, dao.getAll().size());
//        assertEquals(1, dao.getAll().stream().filter(d ->
//                d.getSerializedDiagram().equals(toBeAdded1.getSerializedDiagram())).toArray().length);
//        assertEquals(1, dao.getAll().stream().filter(d ->
//                d.getSerializedDiagram().equals(toBeAdded2.getSerializedDiagram())).toArray().length);
//    }
//
//    @Test
//    public void testGetSingle() {
//        final String content = "expectedString";
//        Diagram returned = dao.add(new Diagram(null, content));
//        Optional<Diagram> diagram = dao.get(returned.getId());
//        if (diagram.isEmpty()) {
//            fail();
//        }
//        assertEquals(content, diagram.get().getSerializedDiagram());
//    }
//
//    @Test
//    public void testGetSingleReturnsEmptyIfNonExists() {
//        assertTrue(dao.get(UUID.randomUUID()).isEmpty());
//    }
//
//    @Test
//    public void testUpdateNonExistent() {
//        final Diagram toBeAdded1 = new Diagram(null, "expectedString1");
//        final Diagram toBeAdded2 = new Diagram(null, "another string");
//        dao.add(toBeAdded1);
//        dao.add(toBeAdded2);
//
//        assertFalse(dao.update(UUID.randomUUID(),  toBeAdded1));
//    }
//
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
//        diagrams = diagrams.stream().map(d -> dao.add(d)).collect(Collectors.toList());
//        final UUID removedId = diagrams.get(1).getId();
//
//        assertTrue(dao.delete(removedId));
//        assertEquals(2, dao.getAll().size());
//        assertTrue(diagrams.stream().map(Diagram::getId).allMatch(id ->
//            id.equals(removedId) || dao.get(id).isPresent()
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
//}
