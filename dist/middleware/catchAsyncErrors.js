"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const catchAsyncErrors = (controller) => (req, res, next) => Promise.resolve(controller(req, res, next)).catch(next);
exports.default = catchAsyncErrors;
