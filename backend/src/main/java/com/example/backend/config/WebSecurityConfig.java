package com.example.backend.config;

import com.example.backend.filter.JwtTokenFilter;
import com.example.backend.jwt.JwtAuthenticationProvider;
import com.example.backend.services.Impl.UserDetailServicesImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import java.util.Arrays;

@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    private UserDetailServicesImpl userDetailServices;
    @Autowired
    BCryptPasswordEncoder passwordEncoder;
    @Autowired
    JwtAuthenticationProvider jwtAuthenticationProvider;
    @Autowired
    JwtTokenFilter jwtTokenFilter;
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(this.jwtAuthenticationProvider);
    }


    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable()
                .authorizeRequests()
                .antMatchers("/post/getPost/{id}","/login","/registration","/logout","/forgotPass","/post/newPost","/getNewPass")
                .permitAll()
                .antMatchers("/testAuthor","/admin/employees","/admin/deleteEmployee").hasRole("ADMIN")
                .antMatchers("/admin/users","/admin/deleteUser","/admin/listRecipe").hasAnyRole("ADMIN","EMPLOYEE")
                .anyRequest()
                .authenticated()
                .and()
//                .formLogin()
//                .loginProcessingUrl("/j_security")
////                .defaultSuccessUrl("/admin")
//                .failureHandler((request, response, exception) -> System.out.println(exception))
//                .usernameParameter("username")
//                .passwordParameter("password")
//                .and()
//                .sessionManagement()
//                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//                .and()
//                .logout()
//                .logoutUrl("/logout")
//                .logoutSuccessUrl("/login")
//                .and()
                .httpBasic();
//        http.addFilterBefore(jwtTokenFilter, UsernamePasswordAuthenticationFilter.class);
        http.addFilterAfter(jwtTokenFilter, UsernamePasswordAuthenticationFilter.class);
    }

    @Bean(BeanIds.AUTHENTICATION_MANAGER)
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
        @Bean
        public CorsConfigurationSource corsConfigurationSource() {
            final CorsConfiguration config = new CorsConfiguration();
            config.setAllowedOrigins(Arrays.asList("http://localhost:4200"));
            config.setAllowedMethods(Arrays.asList("GET", "POST", "OPTIONS", "DELETE", "PUT", "PATCH"));
            config.setAllowCredentials(true);
            config.setAllowedHeaders(Arrays.asList("Authorization","Origin","X-Auth-Token", "Cache-Control", "Content-Type"));
            final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
            source.registerCorsConfiguration("/**", config);
            return source;
        }

}
