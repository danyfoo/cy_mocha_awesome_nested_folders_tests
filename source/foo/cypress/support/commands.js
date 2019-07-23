// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
const addContext = require('mochawesome/addContext');
let req = null;
let res = null;

Cypress.on('command:end', (command) => {
    if (command.attributes.name === 'request') {
        const args = command.attributes.args[0];
        const subject = command.attributes.subject;

        req = {
            method: args.method,
            url: args.url,
            headers: command.attributes.subject.requestHeaders,
        }

        if (args.headers &&
            args.headers['Content-Type'] &&
            args.headers['Content-Type'] === 'application/json' &&
            args.method !== 'GET' &&
            args.body) {
            req.body = JSON.parse(args.body)
        }

        res = {
            headers: subject.headers,
            status: subject.status,
            statusText: subject.statusText
        };

        res.body = subject.body;
    }
});

Cypress.on('test:after:run', (test) => {
    if (req && res) {
        addContext({ test }, {
            title: `[REQUEST] ${req.method} ${req.url}`,
            value: req
        });

        addContext({ test }, {
            title: `[RESPONSE] ${res.status} ${res.statusText} - ${req.method} ${req.url}`,
            value: {
                headers: res.headers,
                body: res.body
            }
        });
    }
});