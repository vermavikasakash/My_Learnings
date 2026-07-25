-- call course.sp_edit_sponsorship_summary(@err,1,1,"CSR TEST","test desc","xyz.png","550",null,null,null,null,null,null);

DROP PROCEDURE IF EXISTS course.sp_edit_sponsorship_summary;
DELIMITER $$

CREATE PROCEDURE course.sp_edit_sponsorship_summary (
    OUT error_code INT,
    IN in_app_user_id BIGINT(20),
    IN in_sponsorship_summary_id BIGINT(20),
    IN in_sponsorship_name VARCHAR(100),
    IN in_sponsorship_description VARCHAR(500),
    IN in_sponsorship_thumbnail TEXT,
    IN in_sponsorship_amount FLOAT,
    IN in_received_amount FLOAT,
    IN in_no_of_sponsors INT,
    IN in_no_of_nominated_user INT,
    IN in_utilized_amount FLOAT,
    IN in_transferred_amount FLOAT,
    IN in_transferred_amount_date TIMESTAMP
)
BEGIN
    DECLARE v_received_amount FLOAT DEFAULT 0;
    DECLARE v_received_amount_after_tax FLOAT DEFAULT 0; 
    DECLARE v_no_of_sponsors INT DEFAULT 0;
    DECLARE v_no_of_nominated_user INT DEFAULT 0;
    DECLARE v_utilized_amount FLOAT DEFAULT 0;
    DECLARE v_balance_amount FLOAT DEFAULT 0;
    DECLARE v_transferred_amount FLOAT DEFAULT 0;

    -- Set initial error code
    SET error_code = -2;

    -- Fetch existing values
    SELECT 
        IFNULL(received_amount, 0),
        IFNULL(received_amount_after_tax, 0),
        IFNULL(no_of_sponsors, 0),
        IFNULL(no_of_nominated_user, 0),
        IFNULL(utilized_amount, 0),
        IFNULL(balance_amount, 0),
        IFNULL(transferred_amount, 0)
    INTO 
        v_received_amount,
        v_received_amount_after_tax,
        v_no_of_sponsors,
        v_no_of_nominated_user,
        v_utilized_amount,
        v_balance_amount,
        v_transferred_amount
    FROM course.sponsorship_summary
    WHERE sponsorship_summary_id = in_sponsorship_summary_id;

    -- Update calculations
    SET v_received_amount = v_received_amount + IFNULL(in_received_amount, 0);
    SET v_received_amount_after_tax = v_received_amount * 0.9; -- 10% tax
    SET v_no_of_sponsors = v_no_of_sponsors + IFNULL(in_no_of_sponsors, 0);
    SET v_no_of_nominated_user = v_no_of_nominated_user + IFNULL(in_no_of_nominated_user, 0);
    SET v_utilized_amount = v_utilized_amount + IFNULL(in_utilized_amount, 0);
    SET v_transferred_amount = v_transferred_amount + IFNULL(in_transferred_amount, 0);
    SET v_balance_amount = v_received_amount_after_tax - v_utilized_amount - v_transferred_amount; -- balance calculation
    
    

    -- Single efficient update statement alter
    
    UPDATE course.sponsorship_summary 
    SET 
        received_amount = v_received_amount,
        received_amount_after_tax = v_received_amount_after_tax,
        no_of_sponsors = v_no_of_sponsors,
        no_of_nominated_user = v_no_of_nominated_user,
        utilized_amount = v_utilized_amount,
        balance_amount = ROUND(v_balance_amount,2),
        transferred_amount = v_transferred_amount,
        sponsorship_name = IF(in_sponsorship_name IS NOT NULL, in_sponsorship_name, sponsorship_name),
        sponsorship_description = IF(in_sponsorship_description IS NOT NULL, in_sponsorship_description, sponsorship_description),
        sponsorship_thumbnail = IF(in_sponsorship_thumbnail IS NOT NULL, in_sponsorship_thumbnail, sponsorship_thumbnail),
        sponsorship_amount = IF(in_sponsorship_amount IS NOT NULL, in_sponsorship_amount, sponsorship_amount),
        transferred_amount_date = IF(in_transferred_amount IS NOT NULL AND in_transferred_amount  > 0 AND in_transferred_amount_date IS NOT NULL,
								 in_transferred_amount_date,transferred_amount_date),
        modified_id = IFNULL(in_app_user_id, modified_id),
        modified_dtm = CURRENT_TIMESTAMP
    WHERE sponsorship_summary_id = in_sponsorship_summary_id;

    -- Set success error code
    SET error_code = 0;
END$$

DELIMITER ;


