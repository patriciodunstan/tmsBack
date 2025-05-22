-- Script de datos iniciales
-- Este script se ejecuta automáticamente después del schema

-- Asegurarse de que estamos usando la base de datos correcta
USE tms_db;

-- ========================
-- Datos de prueba: users
-- ========================
INSERT INTO users (user_name, user_rut, user_email, user_password, user_role) VALUES
('General Administrator', '11.111.111-1', 'admin@tms.com', '$2b$10$8K1p/a0dR1x5M1K3K1K1K.1K1K1K1K1K1K1K1K1K1K1K1K1K1K1K1K', 'admin'),
('Central Logistics', '22.222.222-2', 'logistics@tms.com', '$2b$10$8K1p/a0dR1x5M1K3K1K1K.1K1K1K1K1K1K1K1K1K1K1K1K1K1K1K1K', 'logistico'),
('Main Warehouse', '33.333.333-3', 'warehouse@tms.com', '$2b$10$8K1p/a0dR1x5M1K3K1K1K.1K1K1K1K1K1K1K1K1K1K1K1K1K1K1K1K', 'bodega');

-- ========================
-- Datos de prueba: zones
-- ========================
INSERT INTO zones (zone_name, zone_description) VALUES
('North Zone', 'Coverage area for northern region'),
('South Zone', 'Coverage area for southern region'),
('East Zone', 'Coverage area for eastern region'),
('West Zone', 'Coverage area for western region');

-- ========================
-- Datos de prueba: clients
-- ========================
INSERT INTO clients (client_name, client_rut, client_email, client_phone, client_address) VALUES
('Retail Corp', '11.111.111-1', 'contact@retailcorp.com', '+56912345678', '123 Main St, Santiago'),
('Tech Solutions', '22.222.222-2', 'info@techsolutions.com', '+56987654321', '456 Tech Ave, Santiago'),
('Food Distributors', '33.333.333-3', 'sales@fooddist.com', '+56945678912', '789 Food St, Santiago');

-- ========================
-- Datos de prueba: carriers
-- ========================
INSERT INTO carriers (carrier_name, carrier_rut, carrier_email, carrier_phone, carrier_address) VALUES
('Express Delivery', '44.444.444-4', 'contact@expressdelivery.com', '+56911111111', '111 Delivery St, Santiago'),
('Fast Transport', '55.555.555-5', 'info@fasttransport.com', '+56922222222', '222 Transport Ave, Santiago'),
('Quick Logistics', '66.666.666-6', 'support@quicklogistics.com', '+56933333333', '333 Logistics Rd, Santiago');

-- ========================
-- Datos de prueba: vehicles
-- ========================
INSERT INTO vehicles (vehicle_plate, vehicle_type, vehicle_capacity, carrier_id, zone_id) VALUES
('ABC123', 'van', 1000.00, 1, 1),
('DEF456', 'truck', 2000.00, 1, 2),
('GHI789', 'pickup', 500.00, 2, 3),
('JKL012', 'motorcycle', 100.00, 3, 4);

-- ========================
-- Datos de prueba: orders
-- ========================
INSERT INTO orders (order_date, order_status, carrier_id, vehicle_id) VALUES
('2024-03-20', 'pending', 1, 1),
('2024-03-20', 'in_route', 2, 2),
('2024-03-20', 'completed', 3, 3);

-- ========================
-- Datos de prueba: packages
-- ========================
INSERT INTO packages (
    package_height, package_width, package_length, package_weight, package_declared_value,
    package_pickup_address, package_delivery_address, package_pickup_date,
    package_status, client_id, zone_id, order_id
) VALUES
(50.00, 30.00, 20.00, 5.00, 100000.00, '123 Pickup St', '456 Delivery Ave', '2024-03-20', 'pending', 1, 1, 1),
(100.00, 60.00, 40.00, 10.00, 200000.00, '789 Pickup Rd', '012 Delivery St', '2024-03-20', 'assigned', 2, 2, 2),
(25.00, 15.00, 10.00, 2.00, 50000.00, '345 Pickup Ave', '678 Delivery Rd', '2024-03-20', 'picked_up', 3, 3, 3);
