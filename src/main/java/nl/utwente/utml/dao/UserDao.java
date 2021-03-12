package nl.utwente.utml.dao;

import nl.utwente.utml.model.Diagram;
import nl.utwente.utml.model.User;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Transactional
@Repository("userDao")
public class UserDao extends AbstractDAO<User>  implements IUserDao {

    public UserDao(){
        setClazz(User.class );
    }

    @Override
    public void save(User user) {
        Transaction transaction = null;
        Session session = null;
        try{ session = this.getSessionFactory().openSession();
            // start a transaction
            transaction = session.beginTransaction();
            // save the student object
            session.save(user);
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
