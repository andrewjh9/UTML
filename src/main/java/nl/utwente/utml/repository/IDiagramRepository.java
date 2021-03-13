package nl.utwente.utml.repository;

import nl.utwente.utml.model.Diagram;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
@Transactional
public interface IDiagramRepository extends JpaRepository< Diagram, Long> {

}
