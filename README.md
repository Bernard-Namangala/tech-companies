[![Build Status](https://travis-ci.org/Bernard-Namangala/tech-companies.svg?branch=develop)](https://travis-ci.org/Bernard-Namangala/tech-companies)

[![Coverage Status](https://coveralls.io/repos/github/Bernard-Namangala/tech-companies/badge.svg?branch=master)](https://coveralls.io/github/Bernard-Namangala/tech-companies?branch=master)
# Tech Companies node js app

### This is what a single company object is made up of

Company ={
name,
location,
employees,
networth
}

endpoints

### https://tech-companies.herokuapp.com/api/v1/create-company (POST)

Endpoint to create a company. required information (name(string), location(string), employees(int), networth(int))

### https://tech-companies.herokuapp.com/api/v1/list-companies (GET)

Endpoint to list all companies

### https://tech-companies.herokuapp.com/api/v1/get-company/:id (GET)

Endpoint to get a company with specified id. required information (id)

### https://tech-companies.herokuapp.com/api/v1/update-company/:id (PUT)

Enpoint to update company with specified id. required information (id)

### https://tech-companies.herokuapp.com/api/v1/delete-company/:id (DELETE)

Endpoint to delete a company with specified it. required information (id)
