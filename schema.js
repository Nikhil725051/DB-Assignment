const express = require('express');
const app = express();
const port = 3000;

const { Client } = require('pg');

try{
  const client = new Client({
    user: 'assignment',
    host: 'localhost',
    database: 'assignmentDB',
    password: 'assignment',
    port: 5432,
  });
  
  client.connect();
  
  const createTables = `
  CREATE TABLE IF NOT EXISTS product_category (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    modified_at TIMESTAMP DEFAULT NOW(),
    deleted_at TIMESTAMP
  );
  
  CREATE TABLE IF NOT EXISTS product_inventory (
    id SERIAL PRIMARY KEY,
    quantity INT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    modified_at TIMESTAMP DEFAULT NOW(),
    deleted_at TIMESTAMP
  );
  
  CREATE TABLE IF NOT EXISTS discount (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    discount_percent DECIMAL(5,2) NOT NULL,
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW(),
    modified_at TIMESTAMP DEFAULT NOW(),
    deleted_at TIMESTAMP
  );
  
  CREATE TABLE IF NOT EXISTS product (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    SKU VARCHAR(255) NOT NULL,
    category_id INT NOT NULL REFERENCES product_category(id),
    inventory_id INT NOT NULL REFERENCES product_inventory(id),
    price DECIMAL(10,2) NOT NULL,
    discount_id INT REFERENCES discount(id),
    created_at TIMESTAMP DEFAULT NOW(),
    modified_at TIMESTAMP DEFAULT NOW(),
    deleted_at TIMESTAMP
  );
  `;
  
  client.query(createTables, (err, res) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('Tables created successfully!');
    client.end();
  });
}catch(err){
  console.log(err);
}

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});