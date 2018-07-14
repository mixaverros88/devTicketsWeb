package com.devticket.config;

import com.devticket.client.QuoteClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;
import org.springframework.oxm.jaxb.Jaxb2Marshaller;
import org.springframework.stereotype.Component;
@Configuration
public class GreetingConfiguration {

    @Bean
    public Jaxb2Marshaller marshaller() {
        Jaxb2Marshaller marshaller = new Jaxb2Marshaller();
        // this package must match the package in the <generatePackage> specified in
        // pom.xml
        marshaller.setContextPath("hello.wsdl");
        return marshaller;
    }
    @Bean
    public QuoteClient quoteClient(Jaxb2Marshaller marshaller) {
        QuoteClient client = new QuoteClient();
        client.setDefaultUri("http://ec.europa.eu/taxation_customs/vies/services/checkVatService");
        client.setMarshaller(marshaller);
        client.setUnmarshaller(marshaller);

        return client;
    }

}