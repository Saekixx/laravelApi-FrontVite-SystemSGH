use laravel_sgh;

-- Procedimientos almacenados
DELIMITER //
CREATE PROCEDURE sp_get_dashboard_kpis()
BEGIN
    SELECT 
        -- Pacientes totales
        COUNT(*) AS total_pacientes,
        
        -- Pacientes activos
        SUM(CASE WHEN estado = 1 THEN 1 ELSE 0 END) AS pacientes_activos,
        
        -- Pacientes inactivos 
        SUM(CASE WHEN estado = 0 THEN 1 ELSE 0 END) AS pacientes_inactivos,
        
        -- Edad promedio
        ROUND(AVG(TIMESTAMPDIFF(YEAR, fecha_nacimiento, CURDATE())), 1) AS edad_promedio
    FROM pacientes;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_get_conteo_genero()
BEGIN
    SELECT 
        genero, 
        COUNT(*) AS cantidad
    FROM pacientes
    GROUP BY genero
    ORDER BY FIELD(genero, 'Masculino', 'Femenino', 'Otro');
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE sp_get_conteo_sangre()
BEGIN
    SELECT 
        t.tipo_nombre AS tipo,
        COUNT(p.tipo_sangre) AS cantidad
    FROM (
        SELECT 'A+' AS tipo_nombre UNION SELECT 'A-' UNION 
        SELECT 'B+' UNION SELECT 'B-' UNION 
        SELECT 'AB+' UNION SELECT 'AB-' UNION 
        SELECT 'O+' UNION SELECT 'O-'
    ) AS t
    LEFT JOIN pacientes p ON t.tipo_nombre = UPPER(REPLACE(p.tipo_sangre, ' ', ''))
    GROUP BY t.tipo_nombre
    ORDER BY FIELD(t.tipo_nombre, 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-');
END //
DELIMITER ;

-- call sp_get_dashboard_kpis
-- call sp_get_conteo_genero
-- call sp_get_conteo_sangre