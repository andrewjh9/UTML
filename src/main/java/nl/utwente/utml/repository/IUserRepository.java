package nl.utwente.utml.repository;

import nl.utwente.utml.model.User;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Transactional
@Repository
public interface IUserRepository extends JpaRepository<User, Long> {



}
