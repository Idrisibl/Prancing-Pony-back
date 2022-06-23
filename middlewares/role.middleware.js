const jwt = require("jsonwebtoken");

module.exports = function (roles) {
  return function (req, res, next) {
    if (req.method === "OPTIONS") {
      next();
    }

    try {
      const token = req.headers.authorization.split("")[1];

      if (!token) {
        return res.status(403).json({ error: "Пользователь не авторизован" });
      }

      const { roles: userRoles } = jwt.verify(
        token,
        process.env.SECRET_JWT_KEY
      );

      let hasRole = false;

      userRoles.forEach((role) => {
        if (roles.includes(role)) {
          hasRole = true;
        }
      });

      if (!hasRole) {
        return res.status(403).json({ error: "У вас нет доступа" });
      }

      next();
    } catch (e) {
      return res.status(401).json("Ошибка авторизации:" + e.toString());
    }
  };
};
