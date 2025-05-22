-- Script de inicialización de datos
-- Este script se ejecuta automáticamente después del schema

-- Asegurarse de que estamos usando la base de datos correcta
USE tms_db;

-- Insertar usuarios (contraseñas hasheadas con bcrypt)
-- admin123, logistica123, bodega123
INSERT INTO users (nombre, email, password, rol)
VALUES 
('Administrador General', 'admin@tms.cl', '$2a$10$rDkPvvAFV6GgJjXpYWxqUOQxQxQxQxQxQxQxQxQxQxQxQxQxQxQ', 'admin'),
('Logístico Central', 'logistica@tms.cl', '$2a$10$rDkPvvAFV6GgJjXpYWxqUOQxQxQxQxQxQxQxQxQxQxQxQxQxQxQ', 'logistico'),
('Bodega Principal', 'bodega@tms.cl', '$2a$10$rDkPvvAFV6GgJjXpYWxqUOQxQxQxQxQxQxQxQxQxQxQxQxQxQxQ', 'bodega');

-- Insertar zonas
INSERT INTO zones (nombre, descripcion)
VALUES 
('Zona Norte', 'Incluye comunas de la zona norte de Santiago'),
('Zona Sur', 'Incluye comunas de la zona sur de Santiago'),
('Zona Oriente', 'Incluye Las Condes, Vitacura, Lo Barnechea');

-- Insertar clientes
INSERT INTO clients (nombre, rut, email, telefono, direccion)
VALUES 
('Empresa A', '76.123.456-1', 'contacto@empresaA.cl', '+56912345678', 'Av. Apoquindo 1234'),
('Empresa B', '77.987.654-3', 'ventas@empresaB.cl', '+56987654321', 'Camino Melipilla 4321');

-- Insertar transportistas
INSERT INTO transportistas (nombre, rut, email, telefono, direccion)
VALUES 
('Juan Transporte', '12.345.678-9', 'juan@transporte.cl', '+56911111111', 'El Parrón 456'),
('María Cargo', '23.456.789-0', 'maria@cargo.cl', '+56922222222', 'La Florida 789');

-- Insertar vehículos
INSERT INTO vehiculos (patente, tipo, capacidad, transportista_id, zona_id)
VALUES 
('ABCD12', 'camioneta', 1500.00, 1, 1),
('EFGH34', 'camion', 3000.00, 2, 2);

-- Insertar órdenes de carga
INSERT INTO orders (fecha, estado, transportista_id, vehiculo_id)
VALUES 
('2025-05-20', 'pendiente', 1, 1),
('2025-05-21', 'pendiente', 2, 2);

-- Insertar paquetes
INSERT INTO packages (
    alto, ancho, largo, peso, valor_declarado,
    direccion_retiro, direccion_entrega, fecha_retiro,
    estado, cliente_id, zona_id, orden_id
)
VALUES 
(30.5, 20.0, 40.0, 15.0, 100000, 'Sucursal Empresa A', 'Cliente 1, Ñuñoa', '2025-05-21', 'pendiente', 1, 1, 1),
(25.0, 25.0, 25.0, 10.0, 50000, 'Sucursal Empresa B', 'Cliente 2, Puente Alto', '2025-05-22', 'pendiente', 2, 2, 2);
