package nl.utwente.utml;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserRequest;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.OAuth2Error;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;

import javax.naming.AuthenticationException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled = true)
/**
 * Handles the authentication and protection of certain routes.
 *
 */
public class  WebSecurityConfig extends WebSecurityConfigurerAdapter {

    private static final String[] STUDENT_EMAIL_WHITELIST = new String[]{"a.j.heath@student.utwente.nl","a.j.heath@student.utwente.net", "m.t.voorberg@student.utwente.nl", "p.m.frolov@student.utwente.nl"};

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable();
        /**
         * Scopes of Oauth2 Methods
         */
        Set<String> oauth2ScopesOkta = new HashSet<>();
        oauth2ScopesOkta.add("okta.users.read.self");

        OidcUserService oktaUserService = new OidcUserService();
        oktaUserService.setAccessibleScopes(oauth2ScopesOkta);

        Set<String> oauth2ScopesCanvas = new HashSet<>();
        oauth2ScopesCanvas.add("canvas.users.read.self");

        OidcUserService canvasUserServiceCanvas = new OidcUserService();
        canvasUserServiceCanvas.setAccessibleScopes(oauth2ScopesCanvas);

        /**
         * Setting which routes require authentication
         */

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
                .and().oauth2Login().userInfoEndpoint()
                    .oidcUserService(this.oidcUserService());
    }

    /**
     * Preventing students from authenticating
     */
    @Bean
    public OAuth2UserService<OidcUserRequest, OidcUser> oidcUserService() {
        final OidcUserService delegate = new OidcUserService();
        return (userRequest) -> {
            OidcUser oidcUser = delegate.loadUser(userRequest);
            String emailDomain = oidcUser.getEmail().substring(oidcUser.getEmail().indexOf("@") + 1);
            if (emailDomain.equals("utwente.nl") || Arrays.asList(STUDENT_EMAIL_WHITELIST).contains(oidcUser.getEmail())) {
                return oidcUser;
            } else{
                throw new OAuth2AuthenticationException(new OAuth2Error("unauthorized_client", "Students cannot login", ""));
            }
        };
    }

}