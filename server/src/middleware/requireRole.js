const requireRole = (allowedRole) => {
  return (req, res, next) => {
    if (allowedRole && allowedRole.includes(req.user.role)) {
      next();
    } else {
      return res
        .status(403)
        .json({ message: "Don't have access to this page" });
    }
  };
};

module.exports = requireRole;
