const hasRole = (allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.user?.role;
    console.log(userRole);
    console.log(allowedRoles);
    if (!userRole) {
      return res.status(401).json({ message: 'Unauthorized: No role specified' });
    }

    if (allowedRoles.includes(userRole)) {
      next();
    } else {
      res.status(403).json({ message: 'Forbidden: Insufficient role' });
    }
  };
};
export default hasRole;