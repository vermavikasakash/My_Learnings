//? GET ALL SPONSORSHIP SUMMARY
const GetSponsorshipSummaryQuerry = (input) => {
  let modal = input || {};
  return `call course.sp_get_sponsorship_summary(
        @err,
        ${modal.entity_id},
        ${modal.sponsorship_id},
        ${modal.sponsorship_name},
        ${modal.status},
        ${modal.limit},
        ${modal.offset}
        );SELECT @err as err`;
};

fn.GetSponsorshipSummaryFn = async (req) => {
  let { entity_id, sponsorship_id, sponsorship_name, status, page, limit } =
    req.params;

  // Default values for pagination
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;
  const offset = (page - 1) * limit;

  return new Promise(async (resolve) => {
    let query = GetSponsorshipSummaryQuerry({
      entity_id,
      sponsorship_id,
      sponsorship_name,
      status,
      limit,
      offset,
    });
    const rslt = await db.Execute(query);
    if (rslt.status !== ERRORS.SUCCESS) {
      return resolve(rslt);
    }

    const totalCount = rslt.data[0]?.total_count || 0; //  result set as (total count)
    return resolve({
      status: ERRORS.SUCCESS,
      data: rslt.data,
      totalCount: totalCount, // Total count from the second query
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
    });
  });
};

//? POST API FOR CREATION OF SPONSORSHIP FROM ADMIN

fn.CreateSponsorshipFn = async (req) => {
  return new Promise(async (resolve) => {
    let input = req.body;
    let modal = JSON.parse(JSON.stringify(input));
    modal.is_admin = modal.is_admin || 0;

    let query = `call course.sp_create_sponsorship_summary (@err,
        ${helper.GetDbValue(modal.app_user_id)},
        ${helper.GetDbValue(modal.entity_id)},
        ${helper.GetDbValue(modal.sponsorship_name)},
        ${helper.GetDbValue(modal.sponsorship_description)},
        ${helper.GetDbValue(modal.sponsorship_thumbnail)},
        ${helper.GetDbValue(modal.sponsorship_amount)},
        @aid);SELECT @err as err, @aid as aid;`;

    const rslt = await db.Execute(query);
    if (rslt.status !== ERRORS.SUCCESS) {
      return resolve(rslt);
    }
    return resolve({
      status: ERRORS.SUCCESS,
      statusText: `successful`,
      data: rslt.data[0],
    });
  });
};

//? EDIT SPONSORSHIP DETAILS
fn.EditSponsorshipDetailsFn = async (req) => {
  return new Promise(async (resolve) => {
    let input = req.body;
    let modal = JSON.parse(JSON.stringify(input));

    let query = `call course.sp_edit_sponsorship_summary (@err,
         ${helper.GetDbValue(modal.app_user_id)}, 
         ${helper.GetDbValue(modal.sponsorship_summary_id)}, 
         ${helper.GetDbValue(modal.sponsorship_name)}, 
         ${helper.GetDbValue(modal.sponsorship_description)}, 
         ${helper.GetDbValue(modal.sponsorship_thumbnail)}, 
         ${helper.GetDbValue(modal.sponsorship_amount)}, 
         ${helper.GetDbValue(modal.received_amount)}, 
         ${helper.GetDbValue(modal.no_of_sponsors)}, 
         ${helper.GetDbValue(modal.no_of_nominated_user)}, 
         ${helper.GetDbValue(modal.utilized_amount)},
         ${helper.GetDbValue(modal.transferred_amount)},
         ${helper.GetDbValue(modal.transferred_amount_date)}
        );SELECT @err as err;`;

    const rslt = await db.Execute(query);
    if (rslt.status !== ERRORS.SUCCESS) {
      return resolve(rslt);
    }
    return resolve({
      status: ERRORS.SUCCESS,
      statusText: `Content updated successfully`,
    });
  });
};

module.exports = fn;

// HOW ROUTES LOOK LIKE  //
//? GET ALL SPONSORSHIP SUMMARY
router.get(
  "/api/getSponsorshipSummary/:entity_id/:sponsorship_id/:sponsorship_name/:status/:page/:limit",
  middleware.ensureAuth,
  async function (req, res, next) {
    const result = await controller.GetSponsorshipSummaryFn(req);
    res.send(result);
  }
);

//? CREATE SPONSORSHIP FROM ADMIN
router.post(
  "/api/createSponsorship",
  middleware.ensureAuth,
  async function (req, res, next) {
    const result = await controller.CreateSponsorshipFn(req);
    res.send(result);
  }
);

//? EDIT SPONSORSHIP DETAILS
router.put(
  "/api/editSponsorshipDetails",
  middleware.ensureAuth,
  async function (req, res, next) {
    const result = await controller.EditSponsorshipDetailsFn(req);
    res.send(result);
  }
);
