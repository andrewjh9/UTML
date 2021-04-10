package nl.utwente.utml;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserService;

import java.util.HashSet;
import java.util.Set;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled = true)
public class  WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable();
        Set<String> oauth2ScopesOkta = new HashSet<>();
        oauth2ScopesOkta.add("okta.users.read.self");

        OidcUserService oktaUserService = new OidcUserService();
        oktaUserService.setAccessibleScopes(oauth2ScopesOkta);

        Set<String> oauth2ScopesCanvas = new HashSet<>();
        oauth2ScopesCanvas.add("canvas.users.read.self");

        OidcUserService canvasUserServiceCanvas = new OidcUserService();
        canvasUserServiceCanvas.setAccessibleScopes(oauth2ScopesCanvas);

        http.authorizeRequests()
                // allow antonymous access to the root page
                .antMatchers("/").permitAll()
                .antMatchers("/api/diagram/visible/**").permitAll()

                // all other requests
                .antMatchers("/api/user/**").authenticated()
                .antMatchers("/api/diagram/**").authenticated()
                // set logout URL
                .and().logout().logoutSuccessUrl("/")

                // enable OAuth2/OIDC
                .and().oauth2Client()
                .and().oauth2Login();
    }

}