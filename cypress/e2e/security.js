/// <reference types="cypress"/>

describe('Security test', () => {
    
    const validCredentials = {
        "email": "eve.holt@reqres.in",
        "password": "cityslicka"
    }

    const invalidCredentials = {
        "email": "invalid@reqres.in",
        "password": "invalidpassword"
    }

    it('Login with valid credentials', () => {
        cy.request({
            method:'POST',
            url: "/api/login",
            headers: {
                accept:'application/json'
            },
            body : validCredentials
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('token')
            cy.wrap(response.body.token).as('authToken')
        })
        
    });

    it.skip('Not able to login with invalid credentials', () => {
        cy.request({
            method:'GET',
            url:  "/api/login",
            headers: {
                accept:'application/json'
            },
            body:invalidCredentials,
            failOnStatusCode: false
        }).then((response) =>{
            expect(response.status).to.eq(401)  //unauthorized  
            expect(response.body).to.have.property('error')
        })
    });
    
});