package nl.utwente.utml.repository;

import nl.utwente.utml.model.Diagram;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
/**
 * Diagram Repository handles interaction between the DB and the service layer
 * Only an interface is needed spring boot does the rest
 */
public interface IDiagramRepository extends JpaRepository< Diagram, String> {
    List<Diagram> findByUserEmail(String email);
    Diagram findByIdAndVisibleTrue(String id);
    Diagram findByUserEmailAndTitle(String email, String title);
}
