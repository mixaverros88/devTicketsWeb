package com.devticket.client;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.ws.client.core.support.WebServiceGatewaySupport;
import org.springframework.ws.soap.client.core.SoapActionCallback;

import hello.wsdl.CheckVat;
import hello.wsdl.CheckVatResponse;

@Component
public class QuoteClient extends WebServiceGatewaySupport {

    private static final Logger log = LoggerFactory.getLogger(QuoteClient.class);

    public CheckVatResponse getBeer(String id) {
        CheckVat request = new CheckVat();
        request.setCountryCode("EL");
        if(id.length() ==8){
            request.setVatNumber("0" + id);
        }
        else{

            request.setVatNumber(id);

        }

        return (CheckVatResponse) getWebServiceTemplate().marshalSendAndReceive(request);
    }

}