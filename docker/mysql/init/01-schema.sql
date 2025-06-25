-- Script de inicialización del esquema
-- Este script se ejecuta automáticamente al iniciar el contenedor de MySQL

-- Asegurarse de que estamos usando la base de datos correcta
USE tms_db;

-- ========================
-- Tabla: rols
-- ========================
CREATE TABLE rols (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name_rol VARCHAR(50) NOT NULL,
    description_rol TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)

-- ========================
-- Tabla: users
-- ========================
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(100) NOT NULL,
    user_rut VARCHAR(20) NOT NULL UNIQUE,
    user_email VARCHAR(150) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL,
    role_id INT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES rols(id) ON DELETE CASCADE
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
    billing_address TEXT,
    client_favorite_addresses JSON,
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
-- Tabla: transporter
-- ========================
CREATE TABLE carriers(
    id INT AUTO_INCREMENT PRIMARY KEY,
    carrier_name VARCHAR(100) NOT NULL,
    carrier_rut VARCHAR(20) NOT NULL UNIQUE,
    carrier_email VARCHAR(150),
    carrier_phone VARCHAR(20),
    carrier_address VARCHAR(255),
    business_name VARCHAR(100) NOT NULL,
    carries_status ENUM('active', 'inactive') DEFAULT 'active',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ========================
-- Table: carrier_zones
-- ========================
CRATE TABLE carrier_zones(
    carrier_id INT NOT NULL,
    zone_id INT NOT NULL,
    PRIMARY KEY (carrier_id, zone_id),
    FOREIGN KEY (carrier_id) REFERENCES carriers(id) ON DELETE CASCADE,
    FOREIGN KEY (zone_id) REFERENCES zones(id) ON DELETE CASCADE
)

-- ========================
-- Tabla: vehicles
-- ========================
CREATE TABLE vehicles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    vehicle_brand VARCHAR(100),
    vehicle_model VARCHAR(100),
    vehicle_year INT,
    vehicle_plate VARCHAR(20) NOT NULL UNIQUE,
    vehicle_type ENUM('van', 'truck', 'pickup', 'motorcycle') NOT NULL,
    vehicle_capacity DECIMAL(10,2) NOT NULL,
    carrier_id INT NOT NULL,
    zone_id INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (carrier_id) REFERENCES carriers(id) ON DELETE CASCADE,
    FOREIGN KEY (zone_id) REFERENCES zones(id) ON DELETE SET NULL
);

-- ========================
-- Tabla: packages
-- ========================
CREATE TABLE packages (
    package_id INT AUTO_INCREMENT PRIMARY KEY,
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
    FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE,
    FOREIGN KEY (zone_id) REFERENCES zones(id) ON DELETE SET NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE SET NULL
);

-- ========================
-- Tabla: orders
-- ========================
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    order_status ENUM('pending', 'in_route', 'completed', 'cancelled') DEFAULT 'pending',
    order_sector VARCHAR(100) NOT NULL,
    delivery_type ENUM('normal', 'urgente') DEFAULT 'normal',
    total_cost DECIMAL(10,2) NOT NULL,
    carrier_id INT,
    vehicle_id INT,
    logistic_user_id INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (carrier_id) REFERENCES carriers(id) ON DELETE SET NULL,
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE SET NULL,
    FOREIGN KEY (logistic_user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- ========================
-- Table: audit_logs
-- ========================
CREATE TABLE autit_logs(
    autit_logs_id INT AUTO_INCREMET PRIMARY KEY,
    affected_entity VARCHAR(100) NOT NULL,
    change_type VARCHAR(50) NOT NULL,
    user_id INT,
    previous_data JSON,
    new_data JSON,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
)

-- ========================
-- Table: notifications
-- ========================
CREATE TABLE notifications(
    notification_id INT AUTO_INCREMENT PRIMARY KEY,
    recipient_id INT NOT NULL,
    type_notification ENUM('email', 'sms', 'push') NOT NULL,
    message_notification TEXT NOT NULL,
    notificatios_status ENUM('pending', 'sent', 'failed') DEFAULT 'pending',
    send_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (recipient_id) REFERENCES users(id) ON DELETE CASCADE
)

-- ========================
-- Indexes
-- ========================
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_rut ON users(rut);
CREATE INDEX idx_clients_rut ON clients(rut);
CREATE INDEX idx_carriers_rut ON carriers(rut);
CREATE INDEX idx_vehicles_plate ON vehicles(plate);
CREATE INDEX idx_packages_status ON packages(status);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_audit_logs_entity ON audit_logs(affected_entity);
CREATE INDEX idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);
CREATE INDEX idx_notifications_status ON notifications(status);

