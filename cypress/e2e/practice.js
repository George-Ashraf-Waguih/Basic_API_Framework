/// <reference types="cypress"/>


describe('Testing check', () => {
    it('Testing the basic site', () => {
        cy.request('/').its('status').should('equal', 200)
    });

    it('list users', () => {
        cy.request('/api/users?page=2').its('status').should('equal', 200)
    });

    it('Display the list users output', () => {
        cy.request({
            method: "GET",
            url: "https://reqres.in/api/users?page=2",
            headers: {
                accept: "application/json"
            }
        }).then(response => {
            let body = response.body
            cy.log(JSON.stringify(body))
            expect(body).to.be.an('object')
            expect(body).to.include.keys('page', 'per_page', 'total', 'total_pages', 'data', 'support')

            let records = body.data
            expect(records).to.be.an('array')
            records.forEach(element => {
                // expect(element).to.have.all.keys('id','email')
                expect(element).to.have.property('id')
                expect(element).to.have.property('email')
                expect(element).to.have.property('first_name')
                expect(element).to.have.property('last_name')
                expect(element).to.have.property('avatar')
                expect(element).to.include.keys('id', 'email', 'first_name', 'last_name')
                cy.log(`User ID:${element.id}, Email:${element.email}`)
            })
        })
    });

    it('Filter records by ID', () => {
        const targetedIDs = [7, 9]
        cy.request({
            method: "GET",
            url: "https://reqres.in/api/users?page=2",
            headers: {
                accept: 'application/json'
            }
        }).then(response => {
            let body = response.body
            let records = body.data
            const filteredRecords = records.filter(record => targetedIDs.includes(record.id))
            cy.log(JSON.stringify(filteredRecords))
        })
    });

    it('Filter records by Email', () => {
        const targetEmail = 'michael.lawson@reqres.in'
        cy.request({
            method: "GET",
            url: "https://reqres.in/api/users?page=2",
            headers: {
                accept: 'application/json'
            }
        }).then(response => {
            let body = response.body
            let records = body.data
            const filteredRecords = records.filter(record => targetEmail.includes(record.email))
            cy.log(JSON.stringify(filteredRecords))
        })

    });

    it('Filter records by First Name', () => {
        const targetNames = ['Michael', 'Tobias']
        cy.request({
            method: "GET",
            url: "https://reqres.in/api/users?page=2",
            headers: {
                accept: "application/json"
            }
        }).then(response => {
            let body = response.body
            let records = body.data
            const filteredRecords = records.filter(record => targetNames.includes(record.first_name))
            cy.log(JSON.stringify(filteredRecords))
        })
    });

    it('Extract specific attributes', () => {
        const targetedIDs = [7, 9]
        cy.request({
            method: "GET",
            url: "https://reqres.in/api/users?page=2",
            headers: {
                accept: "application/json"
            }
        }).then(response => {
            let body = response.body
            let records = body.data
            const filteredRecords = records.filter(record => targetedIDs.includes(record.id))
            cy.log(JSON.stringify(filteredRecords))

            const targetedAttributes = filteredRecords.map(record => {
                return {
                    id: record.id,
                    first_name: record.first_name,
                    last_name: record.last_name
                }
            })

            targetedAttributes.forEach(attr => cy.log(JSON.stringify(attr)))
        })
    });

    it('Confirm Invalid user not found', () => {
        cy.request({
            url: '/api/users/23',
            failOnStatusCode: false
        }).then(response => expect(response.status).to.eq(404))
    });

})