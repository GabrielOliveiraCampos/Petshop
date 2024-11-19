create database petshop;
use petshop;

create table users(
    id int auto_increment primary key not null,
    nome VARCHAR(255),
    email VARCHAR(255) not null unique,
    telefone VARCHAR(15),
    endereco VARCHAR(255),
    senha varchar(255) not null,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE animais (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    idade INT NOT NULL,
    tipo VARCHAR(255) NOT NULL,
    dono_id INT NOT NULL,
    FOREIGN KEY (dono_id) REFERENCES users(id)
);


