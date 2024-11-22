import { HttpStatusCode, getters } from "../config";
import {
  createHttpError,
  CustomWinstonLogger,
  errorHandler,
  responseObject,
  uuidHelper,
} from "../utils";
import type { RequestHandler } from "express";
import { otpModel, usersModel } from "../models";
import { Op } from "sequelize";
import { logger } from "netwrap";
import { sendVerifyOtp } from "../templates/mailers";

const checkServiceHealth: RequestHandler = (_req, res) => {
  return responseObject({
    res,
    message: getters.geti18ns().LOGS.ROUTES.HEALTH_CHECK.SUCCESS,
    statusCode: HttpStatusCode.OK,
  });
};

const addOtp: RequestHandler = async (req, res) => {
  const { initiatorId, email, deviceId } = req.body;
  const currentDate = new Date();
  const fiveMinutesLater = new Date(currentDate.getTime() + 5 * 60000);
  try {
    const filterUser = {
      where: {
        [Op.or]: [
          { id: initiatorId },
          { email: email },
          { deviceId: deviceId },
        ],
      },
    };
    const checkUser = await usersModel.findUsers(filterUser);

    if (!checkUser.status) {
      return responseObject({
        res,
        statusCode: checkUser.statusCode,
        message: checkUser.message,
        payload: checkUser.payload,
      });
    }
    const filter = {
      where: {
        [Op.or]: [{ initiatorId: initiatorId }, { deviceId: deviceId }],
      },
    };
    await otpModel.deleteMultipleRows(filter);

    const referenceId = uuidHelper.generate();

    const otpNumber = (Math.floor(Math.random() * 900000) + 100000).toString();
    const createOtp = await otpModel.saveOtp({
      otpNumber: otpNumber,
      referenceId,
      initiatorId,
      deviceId,
      isActive: true,
      otpTime: fiveMinutesLater,
    });
    if (!createOtp) {
      throw createHttpError(
        "Unable to create otp at this time",
        HttpStatusCode.UnprocessableEntity,
      );
    }

    const mailSent = await sendVerifyOtp({
      email: checkUser.payload!.email,
      otpNumber,
    });
    logger(mailSent);
    return responseObject({
      res,
      statusCode: createOtp.statusCode,
      message: createOtp.message,
      payload: createOtp.payload,
    });
  } catch (err) {
    return responseObject({
      res,
      statusCode: HttpStatusCode.InternalServerError,
      message: errorHandler(err, null).message,
    });
  }
};

const sendOtp = async (requestData: {
  userId?: string;
  email?: string;
  deviceId?: string;
}) => {
  let statusCode = 503;
  let saveAccount: any = null;
  let message =
    "A critical error occurred. Kindly contact admin for details about a possible solution to this error";
  let payload = null;
  let success = false;
  const otpNumber = (Math.floor(Math.random() * 900000) + 100000).toString();
  const referenceId = uuidHelper.generate();
  const currentDate = new Date();
  const fiveMinutesLater = new Date(currentDate.getTime() + 5 * 60000);
  try {
    const filterUser = {
      where: {
        [Op.or]: [
          { id: requestData.userId },
          { email: requestData.email },
          { deviceId: requestData.deviceId },
        ],
      },
    };

    const checkUser = await usersModel.findUsers(filterUser);

    if (checkUser && checkUser.status === true && checkUser.payload) {
      const UserInfo = checkUser.payload; // TypeScript now knows UserInfo is not null

      saveAccount = await otpModel.saveOtp({
        initiatorId: requestData.userId,
        referenceId,
        otpNumber,
        deviceId: requestData.deviceId,
        isActive: true,
        otpTime: fiveMinutesLater,
      });

      statusCode =
        saveAccount.status === true
          ? HttpStatusCode.OK
          : HttpStatusCode.NotFound;
      message =
        saveAccount.status === true ? "Otp request sent" : saveAccount.message;
      payload = saveAccount.status === true ? saveAccount.payload : [];
      success = saveAccount.status === true;

      // Safely access UserInfo.email
      const mailSent = await sendVerifyOtp({
        email: UserInfo.email ?? requestData.email,
        otpNumber: otpNumber,
      });
      logger(mailSent, { shouldLog: true, isError: false });
    } else {
      // Handle the case where checkUser.status is false or checkUser.payload is null
      statusCode = HttpStatusCode.NotFound;
      message = "User not found";
      payload = [];
      success = false;
    }

    return { statusCode, message, payload, success };
  } catch (error) {
    logger(error, { shouldLog: true, isError: true });
    payload = (error as any).response?.data;
    statusCode =
      (error as any).response?.data.responseCode ||
      (error as any).response?.status ||
      503;
    message =
      errorHandler(error, null).message ||
      (error as any).response.data.responseMessage;
    success = false;

    CustomWinstonLogger(
      "error",
      { payload, statusCode, message, error },
      "send user otp Request",
    );

    return { statusCode, message, payload, success, error };
  }
};

// const deleteOtp: RequestHandler = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const check = await otpModel.findOtpById(id);

//     if (!check.status) {
//       return responseObject({
//         res,
//         statusCode: check.statusCode,
//         message: check.message,
//         payload: check.payload,
//       });
//     }

//     const deleteOtp = await otpModel.deleteOtpById(id);
//     return responseObject({
//       res,
//       statusCode: deleteOtp.statusCode,
//       message: deleteOtp.message,
//       payload: deleteOtp.payload,
//     });
//   } catch (err) {
//     return responseObject({
//       res,
//       statusCode: HttpStatusCode.InternalServerError,
//       message: errorHandler(err, null).message,
//     });
//   }
// };

// const modifyOtp: RequestHandler = async (req, res) => {
//   const { status, OtpId, OtpName } = req.body;
//   try {
//     const filter = { where: { id: OtpId } };
//     const check = await otpModel.findOtp(filter);

//     if (!check.status) {
//       return responseObject({
//         res,
//         statusCode: check.statusCode,
//         message: check.message,
//         payload: check.payload,
//       });
//     }

//     const updatedOtp = await otpModel.updateOtpById(OtpId, {
//       name: OtpName,
//       isActive: status,
//     });
//     return responseObject({
//       res,
//       statusCode: updatedOtp.statusCode,
//       message: updatedOtp.message,
//       payload: updatedOtp.payload,
//     });
//   } catch (err) {
//     return responseObject({
//       res,
//       statusCode: HttpStatusCode.InternalServerError,
//       message: errorHandler(err, null).message,
//     });
//   }
// };

// const fetchSingleInfo: RequestHandler = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const check = await otpModel.findOtpById(id);
//     return responseObject({
//       res,
//       statusCode: check.statusCode,
//       message: check.message,
//       payload: check.payload,
//     });
//   } catch (err) {
//     return responseObject({
//       res,
//       statusCode: HttpStatusCode.InternalServerError,
//       message: errorHandler(err, null).message,
//     });
//   }
// };

// const fetchAllOtps: RequestHandler = async (req, res) => {
//   const { orderBy = "createdAt", sort = "DESC", size, page } = req.query;
//   try {
//     const sizeNumber = parseInt(size as string) || 10;
//     const pageNumber = parseInt(page as string) || 1;
//     const filter = {
//       order: [[orderBy, sort]],
//       limit: sizeNumber,
//       offset: sizeNumber * (pageNumber - 1),
//     };
//     const response = await otpModel.findAll(filter);

//     if (!response.status) {
//       return responseObject({
//         res,
//         statusCode: response.statusCode,
//         message: response.message,
//         payload: response.payload,
//       });
//     }

//     const totalRecords = response.payload?.recordCount || 0;
//     const totalPages = Math.ceil(totalRecords / sizeNumber);
//     const payload = {
//       currentPage: pageNumber,
//       totalRecords,
//       totalPages,
//       data: response.payload?.allRecords,
//     };
//     return responseObject({
//       res,
//       statusCode: HttpStatusCode.OK,
//       message: "Successfully fetched all records",
//       payload,
//     });
//   } catch (err) {
//     return responseObject({
//       res,
//       statusCode: HttpStatusCode.InternalServerError,
//       message: errorHandler(err, null).message,
//     });
//   }
// };

export {
  checkServiceHealth,
  addOtp,
  sendOtp,
  // modifyOtp,
  // deleteOtp,
  // fetchSingleInfo,
  // fetchAllOtps,
};
