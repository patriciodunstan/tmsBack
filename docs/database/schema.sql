-- Script de inicialización del esquema
-- Este script se ejecuta automáticamente al iniciar el contenedor de MySQL

-- Asegurarse de que estamos usando la base de datos correcta
USE tms_db;

-- ========================
-- Tabla: users
-- ========================
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(100) NOT NULL,
    user_rut VARCHAR(20) NOT NULL UNIQUE,
    user_email VARCHAR(150) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL,
    user_role ENUM('admin', 'logistico', 'bodega') NOT NULL,
    user_active BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ========================
-- Tabla: clients
-- ========================
CREATE TABLE clients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    client_name VARCHAR(100) NOT NULL,
    client_rut VARCHAR(20) NOT NULL UNIQUE,
    client_email VARCHAR(150),
    client_phone VARCHAR(20),
    client_address VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ========================
-- Tabla: carriers
-- ========================
CREATE TABLE carriers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    carrier_name VARCHAR(100) NOT NULL,
    carrier_rut VARCHAR(20) NOT NULL UNIQUE,
    carrier_email VARCHAR(150),
    carrier_phone VARCHAR(20),
    carrier_address VARCHAR(255),
    carrier_active BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ========================
-- Tabla: zones
-- ========================
CREATE TABLE zones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    zone_name VARCHAR(100) NOT NULL UNIQUE,
    zone_description TEXT,
    zone_active BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ========================
-- Tabla: vehicles
-- ========================
CREATE TABLE vehicles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    vehicle_plate VARCHAR(20) NOT NULL UNIQUE,
    vehicle_type ENUM('van', 'truck', 'pickup', 'motorcycle') NOT NULL,
    vehicle_capacity DECIMAL(10,2) NOT NULL,
    carrier_id INT NOT NULL,
    zone_id INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_vehicle_carrier FOREIGN KEY (carrier_id) REFERENCES carriers(id) ON DELETE CASCADE,
    CONSTRAINT fk_vehicle_zone FOREIGN KEY (zone_id) REFERENCES zones(id) ON DELETE SET NULL
);

-- ========================
-- Tabla: orders
-- ========================
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_date DATE NOT NULL,
    order_status ENUM('pending', 'in_route', 'completed', 'cancelled') DEFAULT 'pending',
    carrier_id INT,
    vehicle_id INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_order_carrier FOREIGN KEY (carrier_id) REFERENCES carriers(id) ON DELETE SET NULL,
    CONSTRAINT fk_order_vehicle FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE SET NULL
);

-- ========================
-- Tabla: packages
-- ========================
CREATE TABLE packages (
    id INT AUTO_INCREMENT PRIMARY KEY,

    package_height DECIMAL(10, 2) NOT NULL,
    package_width DECIMAL(10, 2) NOT NULL,
    package_length DECIMAL(10, 2) NOT NULL,
    package_weight DECIMAL(10, 2) NOT NULL,
    package_declared_value DECIMAL(15, 2) NOT NULL,

    package_pickup_address VARCHAR(255) NOT NULL,
    package_delivery_address VARCHAR(255) NOT NULL,
    package_pickup_date DATE NOT NULL,

    package_status ENUM('pending', 'assigned', 'picked_up', 'delivered') DEFAULT 'pending',

    client_id INT NOT NULL,
    zone_id INT,
    order_id INT,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_package_client FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE,
    CONSTRAINT fk_package_zone FOREIGN KEY (zone_id) REFERENCES zones(id) ON DELETE SET NULL,
    CONSTRAINT fk_package_order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE SET NULL
);
