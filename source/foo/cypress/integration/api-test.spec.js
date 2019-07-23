import addContext from 'mochawesome/addContext';
describe('Test Chuck Norris API - FOO', () => {
    it('GET /jokes/random', () => {
        cy.request({
            method: 'GET',
            url: 'https://api.chucknorris.io/jokes/random',
            failOnStatusCode: false,
        }).then((xhr) => {
            expect(xhr.status).to.be.equal(200);
        });
    });

    it('GET /jokes/random 2', () => {
        cy.request({
            method: 'GET',
            url: 'https://api.chucknorris.io/jokes/random',
            failOnStatusCode: false,
        }).then((xhr) => {
            expect(xhr.status).to.be.equal(200);
        });
    });
}); 