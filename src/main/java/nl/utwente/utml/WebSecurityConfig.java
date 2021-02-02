package nl.utwente.utml;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@EnableWebSecurity
@Configuration
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        // TODO: Replace this with something that actually handles security instead of disabling it.
        // This disables security.
        // This was done because we got 401 Unauthorized errors during debugging on the very first day.
        // This will later be removed or edited to actually provide security
        http.csrf().disable();
    }

}