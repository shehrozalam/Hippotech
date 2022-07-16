package com.hippotech.api;

import java.util.Arrays;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.firewall.HttpFirewall;
import org.springframework.security.web.firewall.StrictHttpFirewall;
import org.springframework.boot.autoconfigure.web.servlet.error.ErrorMvcAutoConfiguration;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;

import com.hippotech.api.security.JWTAuthorizationFilter;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.Tag;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;

@SpringBootApplication
@EnableAutoConfiguration(exclude = {ErrorMvcAutoConfiguration.class})
public class ApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(ApiApplication.class, args);
    }

    @Bean
    public HttpFirewall looseHttpFirewall() {
      StrictHttpFirewall firewall = new StrictHttpFirewall();
      firewall.setAllowedHttpMethods(Arrays.asList("GET", "POST", "TRACE", "HEAD", "PUT", "DELETE"));
      firewall.setAllowSemicolon(true);
      firewall.setAllowUrlEncodedSlash(true);
      firewall.setAllowBackSlash(true);
      firewall.setAllowUrlEncodedPercent(true);
      firewall.setAllowUrlEncodedPeriod(true);
      return firewall;
  }

    @EnableWebSecurity
    @Configuration
    class WebSecurityConfig extends WebSecurityConfigurerAdapter {

        @Override
        protected void configure(HttpSecurity http) throws Exception {
            http.csrf().disable()
                    .addFilterAfter(new JWTAuthorizationFilter(), UsernamePasswordAuthenticationFilter.class)
                    .authorizeRequests()
                    .antMatchers(HttpMethod.POST, "/api/authenticate").permitAll()
                    .antMatchers(HttpMethod.GET, "/api/blog").permitAll()
                    // .antMatchers(HttpMethod.POST, "/api/blog/subscribe").permitAll()
                    // .antMatchers(HttpMethod.POST, "/api/blog/unsubscribe").permitAll()
                    // .antMatchers(HttpMethod.GET, "/api/approval").permitAll()
                    // .antMatchers(HttpMethod.POST, "/api/approval").permitAll()
                    .antMatchers(HttpMethod.GET, "/webjars/**").permitAll()
                    .antMatchers(HttpMethod.GET, "/swagger-resources/**").permitAll()
                    .antMatchers(HttpMethod.GET, "/v2/**").permitAll()
                    .antMatchers(HttpMethod.GET, "/v3/**").permitAll()
                    .antMatchers(HttpMethod.GET, "/swagger-ui/**").permitAll()
                    .anyRequest().authenticated();
        }
    }
}