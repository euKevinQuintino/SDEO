CREATE DATABASE sdeo;

USE sdeo;

CREATE TABLE `ordem` (
  `numeroOrdem` int NOT NULL AUTO_INCREMENT,
  `observacaoOrdem` varchar(255),
  `ordemRemovida` tinyint(1),
  PRIMARY KEY (`numeroOrdem`)  
) ENGINE=InnoDB  DEFAULT CHARSET = UTF8 COLLATE = utf8_general_ci AUTO_INCREMENT=1 ;


CREATE TABLE `imagem` (
 `numeroImagem` int NOT NULL AUTO_INCREMENT,
 `numeroOrdem` int NOT NULL,
 `imagemPreExecucao` varchar(255),
 `imagemPosExecucao` varchar(255),
  PRIMARY KEY (`numeroImagem`)
) ENGINE=InnoDB  DEFAULT CHARSET = UTF8 COLLATE = utf8_general_ci AUTO_INCREMENT=1 ;

ALTER TABLE imagem ADD INDEX(numeroOrdem);
ALTER TABLE imagem
 ADD FOREIGN KEY (numeroOrdem) REFERENCES ordem(numeroOrdem);