package com.cav.springbootlibrary.config;


import com.cav.springbootlibrary.entity.Book;
import java.lang.annotation.Annotation;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.annotation.Description;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.http.HttpMethod;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration
public class MyDataRestConfig implements RepositoryRestResource {

    private String theAllowedOrigins = "http://localhost:3000/";

    @CrossOrigin(origins = "http://localhost:3000/")
    @GetMapping
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        HttpMethod[] theUnsupportedActions = {
                HttpMethod.POST,
                HttpMethod.PATCH,
                HttpMethod.DELETE,
                HttpMethod.PUT};

        config.exposeIdsFor(Book.class);

        disableHttpMethods(Book.class, config, theUnsupportedActions);

        /* Configure CORS Mapping*/
        cors.addMapping(config.getBasePath() + "/**")
                .allowedOrigins("*").allowedHeaders("*");
    }

    private void disableHttpMethods(Class theClass,
                                    RepositoryRestConfiguration config,
                                    HttpMethod[] theUnsupportedActions){
        config.getExposureConfiguration()
                .forDomainType(theClass)
                .withItemExposure((metdata, httpMethods) ->
                        httpMethods.disable(theUnsupportedActions))
                .withCollectionExposure((metdata, httpMethods) ->
                        httpMethods.disable(theUnsupportedActions));
    }

    @Override
    public boolean exported() {
        return false;
    }

    @Override
    public String path() {
        return null;
    }

    @Override
    public String collectionResourceRel() {
        return null;
    }

    @Override
    public Description collectionResourceDescription() {
        return null;
    }

    @Override
    public String itemResourceRel() {
        return null;
    }

    @Override
    public Description itemResourceDescription() {
        return null;
    }

    @Override
    public Class<?> excerptProjection() {
        return null;
    }

    @Override
    public Class<? extends Annotation> annotationType() {
        return null;
    }
}
