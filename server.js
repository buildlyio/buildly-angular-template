#!/usr/bin/env node

const config = require('./environment');

const fs = require('fs');

var content = "export const environment = " + JSON.stringify(config.environment)+";";

fs.writeFileSync(`src/environments/environment.prod.ts`, content);