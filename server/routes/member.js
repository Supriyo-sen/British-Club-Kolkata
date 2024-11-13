const Router = require("express");
const {
  addMember,
  updateMember,
  deleteMember,
  updateImage,
  getMembers,
  addMemberImage,
  getMemberById,
  sendCardAsEmail,
  totalDebitCreditAndWalletBalance,
  sendMemberForExcel,
} = require("../controller/member");
const { isAuthenticated, isInClub } = require("../middleware/auth");
const { validateAddMember } = require("../middleware/zod-user-middleware");
const router = Router();

router.post(
  "/add-member",
  isAuthenticated,
  isInClub,
  validateAddMember,
  addMember
);
router.get("/get-member/:memberId", getMemberById);
router.get("/get/total/amount", totalDebitCreditAndWalletBalance);

router.put("/update-member/:memberId", isAuthenticated, isInClub, updateMember);
router.put(
  "/update-member-image/:memberId",
  isAuthenticated,
  isInClub,
  updateImage
);
router.delete(
  "/delete-member/:memberId",
  isAuthenticated,
  isInClub,
  deleteMember
);
router.get("/get-all-members", getMembers);
router.post("/add-member-image", isAuthenticated, isInClub, addMemberImage);
router.post("/send-card-email", sendCardAsEmail);
router.get("/send-member-excel", sendMemberForExcel);

module.exports = router;
