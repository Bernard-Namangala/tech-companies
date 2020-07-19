# Tech Companies node js app

### This is what a single company object is made up of

Company ={
name,
location,
employees,
networth
}

endpoints

### /create-company (POST)

Endpoint to create a company. required information (name(string), location(string), employees(int), networth(int))

### /list-companies (GET)

Endpoint to list all companies

### /get-company/:id (GET)

Endpoint to get a company with specified id. required information (id)

### /update-company/:id (PUT)

Enpoint to update company with specified id. required information (id)

### /delete-company/:id (Delete)

Endpoint to delete a company with specified it. required information (id)
