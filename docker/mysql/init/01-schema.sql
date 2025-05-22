-- Script de inicialización del esquema
-- Este script se ejecuta automáticamente al iniciar el contenedor de MySQL

-- Asegurarse de que estamos usando la base de datos correcta
USE tms_db;

-- ========================
-- Tabla: users
-- ========================
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    rol ENUM('admin', 'logistico', 'bodega') NOT NULL,
    activo BOOLEAN DEFAULT TRUE,
    creado_en DATETIME DEFAULT CURRENT_TIMESTAMP,
    actualizado_en DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ========================
-- Tabla: clients
-- ========================
CREATE TABLE clients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    rut VARCHAR(20) NOT NULL UNIQUE,
    email VARCHAR(150),
    telefono VARCHAR(20),
    direccion VARCHAR(255),
    creado_en DATETIME DEFAULT CURRENT_TIMESTAMP,
    actualizado_en DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ========================
-- Tabla: transportistas
-- ========================
CREATE TABLE transportistas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    rut VARCHAR(20) NOT NULL UNIQUE,
    email VARCHAR(150),
    telefono VARCHAR(20),
    direccion VARCHAR(255),
    activo BOOLEAN DEFAULT TRUE,
    creado_en DATETIME DEFAULT CURRENT_TIMESTAMP,
    actualizado_en DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ========================
-- Tabla: zonas
-- ========================
CREATE TABLE zones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    descripcion TEXT,
    creado_en DATETIME DEFAULT CURRENT_TIMESTAMP,
    actualizado_en DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ========================
-- Tabla: vehiculos
-- ========================
CREATE TABLE vehiculos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patente VARCHAR(20) NOT NULL UNIQUE,
    tipo ENUM('camioneta', 'camion', 'furgon', 'moto') NOT NULL,
    capacidad DECIMAL(10,2) NOT NULL,
    transportista_id INT NOT NULL,
    zona_id INT,
    creado_en DATETIME DEFAULT CURRENT_TIMESTAMP,
    actualizado_en DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_vehiculo_transportista FOREIGN KEY (transportista_id) REFERENCES transportistas(id) ON DELETE CASCADE,
    CONSTRAINT fk_vehiculo_zona FOREIGN KEY (zona_id) REFERENCES zones(id) ON DELETE SET NULL
);

-- ========================
-- Tabla: orders (órdenes de carga)
-- ========================
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fecha DATE NOT NULL,
    estado ENUM('pendiente', 'en_ruta', 'completada', 'cancelada') DEFAULT 'pendiente',
    transportista_id INT,
    vehiculo_id INT,
    creado_en DATETIME DEFAULT CURRENT_TIMESTAMP,
    actualizado_en DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_order_transportista FOREIGN KEY (transportista_id) REFERENCES transportistas(id) ON DELETE SET NULL,
    CONSTRAINT fk_order_vehiculo FOREIGN KEY (vehiculo_id) REFERENCES vehiculos(id) ON DELETE SET NULL
);

-- ========================
-- Tabla: packages
-- ========================
CREATE TABLE packages (
    id INT AUTO_INCREMENT PRIMARY KEY,

    alto DECIMAL(10, 2) NOT NULL,
    ancho DECIMAL(10, 2) NOT NULL,
    largo DECIMAL(10, 2) NOT NULL,
    peso DECIMAL(10, 2) NOT NULL,
    valor_declarado DECIMAL(15, 2) NOT NULL,

    direccion_retiro VARCHAR(255) NOT NULL,
    direccion_entrega VARCHAR(255) NOT NULL,
    fecha_retiro DATE NOT NULL,

    estado ENUM('pendiente', 'asignado', 'retirado', 'entregado') DEFAULT 'pendiente',

    cliente_id INT NOT NULL,
    zona_id INT,
    orden_id INT,

    creado_en DATETIME DEFAULT CURRENT_TIMESTAMP,
    actualizado_en DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_package_cliente FOREIGN KEY (cliente_id) REFERENCES clients(id) ON DELETE CASCADE,
    CONSTRAINT fk_package_zona FOREIGN KEY (zona_id) REFERENCES zones(id) ON DELETE SET NULL,
    CONSTRAINT fk_package_orden FOREIGN KEY (orden_id) REFERENCES orders(id) ON DELETE SET NULL
);
