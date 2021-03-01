package nl.utwente.utml.dao;

import nl.utwente.utml.model.Diagram;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Transactional
@Repository("diagramDao")
public class DiagramDao  extends AbstractDAO< Diagram >  implements IDiagramDao {
    public DiagramDao(){
        setClazz(Diagram.class );
    }
}
