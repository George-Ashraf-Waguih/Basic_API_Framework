/// <reference types="cypress"/>

describe('Load Testing', () => {

    const validUser = 2
    it('Can handle load of requests', () => {
        const numberOfRequests = 100
        const requests = []
        const startTime = new Date()

        for(let i=0; i<numberOfRequests; i++) {
            requests.push(cy.request(`/api/users/${validUser}`).then((response) => {expect(response.status).to.eq(200)}))
        }

        cy.wrap(Promise.all(requests)).then(() => {
            const endTime = new Date()
            const duration = (endTime-startTime)/1000
            cy.log(`Load test duration: ${duration} seconds`)
        })
    });
    
});