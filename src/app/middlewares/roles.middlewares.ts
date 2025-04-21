import { NextFunction, Request, Response } from "express";
import { AppRole, ROLE_IDS } from "../../config/roles";

type ValidRoleId = 1 | 2 | 3 | 4;

export const authorize = (allowedRoles: AppRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const allowedRoleIds = allowedRoles.map((role) => ROLE_IDS[role]);
    if (!req.user || !allowedRoleIds.includes(req.user.roleId as ValidRoleId)) {
      res
        .status(403)
        .json({ error: "Insufficient permissions for this operation" });
      return;
    }
    next();
  };
};
