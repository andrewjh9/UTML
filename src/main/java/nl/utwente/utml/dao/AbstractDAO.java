package nl.utwente.utml.dao;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.Serializable;
import java.util.List;


public abstract class AbstractDAO< T extends Serializable>{
    private Class< T > clazz;

    @Autowired
    private SessionFactory sessionFactory;

    public void setClazz(Class< T > clazzToSet) {
        clazz = clazzToSet;
    }

    public T findOne(long id) {
        return (T) getCurrentSession().get( clazz, id );
    }
    public List< T > findAll() {
        System.out.println(clazz);
        return getSessionFactory().openSession()
                .createQuery( "from " + clazz.getName() ).list();
    }

    public void save(T entity) {
        getCurrentSession().persist( entity );
    }

    public T update(T entity) {
        return (T) getCurrentSession().merge( entity );
    }

    public void delete(T entity) {
        getCurrentSession().delete( entity );
    }
    public void deleteById(long id) {
        final T entity = findOne( id);
        delete( entity );
    }

    protected final Session getCurrentSession(){
        Session session;

        try {
            session = sessionFactory.getCurrentSession();
        } catch (HibernateException e) {
            session = sessionFactory.openSession();
        }
        return session;
    }

    protected SessionFactory getSessionFactory() { return sessionFactory;};
}