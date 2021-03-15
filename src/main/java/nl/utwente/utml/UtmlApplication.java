package nl.utwente.utml;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@SpringBootApplication(exclude = HibernateJpaAutoConfiguration.class)
public class UtmlApplication  {

	@GetMapping("/me")
	public Object getUser(){
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if (authentication.getPrincipal() instanceof OidcUser) {
			OidcUser principal = ((OidcUser) authentication.getPrincipal());
			return principal.getUserInfo().getFullName();
		}
		return null;
	}

	public static void main(String[] args) {
		SpringApplication.run(UtmlApplication.class, args);
	}

}
