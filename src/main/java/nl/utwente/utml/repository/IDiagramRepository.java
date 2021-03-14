package nl.utwente.utml.repository;

import nl.utwente.utml.model.Diagram;
import nl.utwente.utml.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public interface IDiagramRepository extends JpaRepository< Diagram, Long> {
    List<Diagram> findByOwner(long userId);
}
