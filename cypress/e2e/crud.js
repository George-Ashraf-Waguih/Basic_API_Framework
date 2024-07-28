/// <reference types="cypress"/>

describe('CRUD tests', () => {
    let userID
    it('Create new user', () => {
        cy.request('POST','/api/users').then((response) =>{
            expect(response.status).to.eq(201)
            expect(response.body).to.have.property('id')
            userID = response.body.id
            cy.log(userID)
        })
    });

    it('Read created user', () => {
        cy.request('/api/users/2').then((response) =>{
            expect(response.status).to.eq(200)
            let body = response.body
            let record = body.data
            expect(record).to.have.property('id',2)
        })
    });

    it('Update user', () => {
        
        const updatedPost = {
            name: "morpheus",
            job: "zion resident"
        }
        cy.request({
            method:"PUT",
            url:"/api/users/2",
            headers: {
                accept:'application/json'
            },
            body:updatedPost
        }).then((response) => {
            expect(response.status).to.eq(200)
            // let body = response.body
            
            expect(response.body).to.have.property('name','morpheus')
            expect(response.body).to.have.property('job','zion resident')
        })
        
    });

    it('Delete user', () => {
        cy.request({
            method:"DELETE",
            url:"/api/users/2",
            headers: {
                accept:'application/json'
            }
        }).then((response)=>{
            expect(response.status).to.eq(204)
        })

        cy.request({
            method:'GET',
            url:'/api/users/23',
            failOnStatusCode:false
        }).then((response) => {
            expect(response.status).to.eq(404)
        })
    });
});