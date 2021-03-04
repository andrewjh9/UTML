package nl.utwente.utml.dao;

import nl.utwente.utml.model.Diagram;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.persistence.PersistenceException;
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

    @Override
    public void save(Diagram diagram) {
        Transaction transaction = null;
        Session session = null;
        try{ session = this.getSessionFactory().openSession();
            // start a transaction
            transaction = session.beginTransaction();
            // save the student object
            session.save(diagram);
            // commit transaction
            transaction.commit();
        } catch (Exception e) {
            if (transaction != null) {
                transaction.rollback();
            }
            e.printStackTrace();
        } finally {
            session.close();
        }

    }
}
