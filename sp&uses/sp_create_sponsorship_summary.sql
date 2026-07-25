-- call course.sp_create_sponsorship_summary(@err,1,1,"CSR1","CSR1 Desc","abc.img",500,@aid);

DROP PROCEDURE IF EXISTS course.sp_create_sponsorship_summary;
DELIMITER $$
CREATE PROCEDURE course.sp_create_sponsorship_summary (OUT error_code INT
                                                         ,IN in_app_user_id BIGINT(20)
														 ,IN in_entity_id INT(11)
                                                         ,IN in_sponsorship_name VARCHAR(100)
                                                         ,IN in_sponsorship_description VARCHAR(500)
                                                         ,IN in_sponsorship_thumbnail TEXT
                                                         ,IN in_sponsorship_amount FLOAT													
                                                         ,OUT out_sponsorship_summary_id BIGINT
													     )
BEGIN

SET error_code=-2;

INSERT INTO course.sponsorship_summary
	  (sponsorship_summary_id,
      entity_id,
      sponsorship_name,
      sponsorship_description,
      sponsorship_thumbnail,
      sponsorship_amount,
      status,
      created_id,
      created_dtm,
      modified_id,
      modified_dtm) 
VALUES
       (NULL,
        in_entity_id,
        in_sponsorship_name,
        in_sponsorship_description,
        in_sponsorship_thumbnail,
        in_sponsorship_amount,
        1,
        in_app_user_id,
        CURRENT_TIMESTAMP,
        in_app_user_id,
        CURRENT_TIMESTAMP);

SET out_sponsorship_summary_id = LAST_INSERT_ID();
SET error_code=0;

END$$
DELIMITER ;