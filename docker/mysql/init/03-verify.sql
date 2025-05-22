-- Script de verificación
-- Este script se ejecuta automáticamente después de los seeds

USE tms_db;

-- Verificar usuarios
SELECT 'Verificando usuarios...' as '';
SELECT COUNT(*) as total_usuarios FROM users;

-- Verificar zonas
SELECT 'Verificando zonas...' as '';
SELECT COUNT(*) as total_zonas FROM zones;

-- Verificar clientes
SELECT 'Verificando clientes...' as '';
SELECT COUNT(*) as total_clientes FROM clients;

-- Verificar transportistas
SELECT 'Verificando transportistas...' as '';
SELECT COUNT(*) as total_transportistas FROM transportistas;

-- Verificar vehículos
SELECT 'Verificando vehículos...' as '';
SELECT COUNT(*) as total_vehiculos FROM vehiculos;

-- Verificar órdenes
SELECT 'Verificando órdenes...' as '';
SELECT COUNT(*) as total_ordenes FROM orders;

-- Verificar paquetes
SELECT 'Verificando paquetes...' as '';
SELECT COUNT(*) as total_paquetes FROM packages; 