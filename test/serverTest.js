// serverTest.js

process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server'); // Adjust the path as needed

const should = chai.should();

chai.use(chaiHttp);

describe('Photos', function() {
  it('should list ALL photos on / GET', function(done) {
    this.timeout(60000); // Increase timeout if necessary

    chai.request(server)
      .get('/')
      .end(function(err, res) {
        if (err) {
          console.error(err);
          done(err);
        } else {
          res.should.have.status(200);
          res.should.be.html;
          // Assuming your response body is JSON, use res.body to check
          // For HTML, you may check res.text
          // res.body.should.be.a('object')
          done();
        }
      });
  });
});
