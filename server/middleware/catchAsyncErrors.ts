import { Request, Response, NextFunction } from "express";

const catchAsyncErrors =
  (
    controller: (
      req: Request,
      res: Response,
      next: NextFunction
    ) => Promise<void>
  ) =>
  (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(controller(req, res, next)).catch(next);

export default catchAsyncErrors;
