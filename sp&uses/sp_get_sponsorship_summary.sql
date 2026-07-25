-- call course.sp_get_sponsorship_summary(@err,1,null,null,null,null,null);

DROP PROCEDURE IF EXISTS course.sp_get_sponsorship_summary;

DELIMITER $$

CREATE  PROCEDURE course.sp_get_sponsorship_summary(OUT error_code INT
                                   ,IN in_entity_id INT(11)
                                   ,IN in_sponsorship_summary_id BIGINT(20)
                                   ,IN in_sponsorship_name VARCHAR(100)
								   ,IN in_status TINYINT(4)
                                   ,IN in_limit INT
                                   ,IN in_offset INT
                                   )
BEGIN
    SET error_code = -2;

    -- Base query with total_count included
    SET @q = '
    SELECT  
        sm.sponsorship_summary_id,
        sm.sponsorship_name,
        sm.sponsorship_description,
        sm.sponsorship_thumbnail,
        sm.sponsorship_amount,
        sm.received_amount,
        sm.received_amount_after_tax,
        sm.no_of_sponsors,
        sm.no_of_nominated_user,
        sm.utilized_amount,
        sm.balance_amount,
        sm.transferred_amount,
        sm.transferred_amount_date,
		sm.status,
        (SELECT COUNT(*) 
         FROM course.sponsorship_summary sm 
         WHERE 1 = 1';
         
    -- Dynamically append conditions for the total_count subquery

    IF in_entity_id IS NOT NULL THEN
        SET @q = CONCAT(@q, ' AND sm.entity_id = ', in_entity_id);
    END IF;

    IF in_sponsorship_summary_id IS NOT NULL THEN
        SET @q = CONCAT(@q, ' AND sm.sponsorship_summary_id = ', in_sponsorship_summary_id);
    END IF;
    
	IF in_sponsorship_name IS NOT NULL THEN
        SET @q = CONCAT(@q, ' AND sm.sponsorship_name COLLATE utf8_general_ci LIKE "%', in_sponsorship_name, '%"');
    END IF;
    
	IF in_status IS NOT NULL THEN
        SET @q = CONCAT(@q, ' AND sm.status = ', in_status);
    END IF;

    SET @q = CONCAT(@q, ') AS total_count
    FROM course.sponsorship_summary sm 
    WHERE 1 = 1');

    -- Append conditions for the main query
    
	IF in_entity_id IS NOT NULL THEN
        SET @q = CONCAT(@q, ' AND sm.entity_id = ', in_entity_id);
    END IF;

    IF in_sponsorship_summary_id IS NOT NULL THEN
        SET @q = CONCAT(@q, ' AND sm.sponsorship_summary_id = ', in_sponsorship_summary_id);
    END IF;
    
	IF in_sponsorship_name IS NOT NULL THEN
        SET @q = CONCAT(@q, ' AND sm.sponsorship_name COLLATE utf8_general_ci LIKE "%', in_sponsorship_name, '%"');
    END IF;
    
	IF in_status IS NOT NULL THEN
        SET @q = CONCAT(@q, ' AND sm.status = ', in_status);
    END IF;

    SET @q = CONCAT(@q, ' ORDER BY sm.sponsorship_name ASC');

    -- Apply pagination
    IF in_limit IS NOT NULL AND in_offset IS NOT NULL THEN
        SET @q = CONCAT(@q, ' LIMIT ', in_limit, ' OFFSET ', in_offset);
    END IF;

    -- Debugging (Optional)
    -- SELECT @q;

    -- Prepare and execute the statement
    PREPARE stmt FROM @q;
    EXECUTE stmt;
    
    -- Deallocate prepared statement
    DEALLOCATE PREPARE stmt;

    -- Set error code to 0 to indicate success
    SET error_code = 0;
END$$

DELIMITER ;


