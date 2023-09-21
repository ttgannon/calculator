const app = require('./app');
const request = require('supertest');


describe('Mean Route', () => {
    it("returns the mean of a query string", async function() {
        const queryString= 'nums=1,2,3,4,5';
        const response = await request(app).get(`/mean?${queryString}`);
        expect(response.status).toBe(200);
        expect(response.body.response.operation).toBe('mean');
        expect(response.body.response.value).toBe(3);

    })
})