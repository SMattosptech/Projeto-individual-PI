CREATE DATABASE playguitar;
USE playguitar;

CREATE TABLE usuario (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE perfil_musical (
    id_perfil INT PRIMARY KEY AUTO_INCREMENT,
    fk_usuario INT NOT NULL UNIQUE,
    toca_guitarra BOOLEAN NOT NULL,
    tempo_experiencia VARCHAR(30),
    nivel VARCHAR(20),
    genero_favorito VARCHAR(60) NOT NULL,
    objetivo_musical VARCHAR(100) NOT NULL,
    guitarra_atual VARCHAR(100),
    guitarra_desejada VARCHAR(100),

    CONSTRAINT chk_nivel
    CHECK (
        nivel IN ('Iniciante', 'Intermediário', 'Avançado')
        OR nivel IS NULL
    ),

    CONSTRAINT chk_experiencia
    CHECK (
        tempo_experiencia IN (
            'Menos de 1 ano',
            '1 a 2 anos',
            '2 a 5 anos',
            'Mais de 5 anos'
        )
        OR tempo_experiencia IS NULL
    ),

    CONSTRAINT chk_toca_guitarra
    CHECK (toca_guitarra IN (0, 1)),

    CONSTRAINT chk_perfil_condicional
    CHECK (
        (toca_guitarra = 1
         AND tempo_experiencia IS NOT NULL
         AND nivel IS NOT NULL)
        OR
        (toca_guitarra = 0
         AND tempo_experiencia IS NULL
         AND nivel IS NULL)
    ),

    CONSTRAINT fk_perfil_usuario
    FOREIGN KEY (fk_usuario)
    REFERENCES usuario(id_usuario)
);

CREATE TABLE contato (
    id_contato INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    mensagem VARCHAR(1000) NOT NULL,
    data_envio DATETIME DEFAULT CURRENT_TIMESTAMP
);

SELECT * FROM usuario;

SELECT * FROM perfil_musical;

SELECT * FROM contato;
