const { v4: uuidv4 } = require("uuid");
const otpGenerator = require("otp-generator");
const pool = require("../config/db");
const { addMinute } = require("../helpers/add_minute");
const { encode, decode } = require("../services/crypt");

const newOTP = async (req, res) => {
  try {
    const { phone_number } = req.body;
    const otp = otpGenerator.generate(4, {
      digits: true,
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    console.log(otp)

    const now = new Date();
    const expiration_time = addMinute(now, 5);
    const newOtp = await pool.query(
      `INSERT INTO otp (id, otp, expiration_time) VALUES ($1, $2, $3) RETURNING id`,
      [uuidv4(), otp, expiration_time]
    );

    const details = {
      timestamp: now,
      phone_number: phone_number,
      otp_id: newOtp.rows[0].id,
    };

    //SMS, Email, Bot
    const encodedData = await encode(JSON.stringify(details));

    res.status(201).send({ status: "Success", encodedData: encodedData });
  } catch (error) {
    console.error(error);
  }
};

const verifyClientsOTP = async (req, res) => {
  try {
    const { otp, phone_number, verification_key } = req.body;
    const currentDateTime = new Date();
    const decodedData = await decode(verification_key);

    const parsedData = JSON.parse(decodedData);
    if (parsedData.phone_number !== phone_number) {
      const response = {
        Status: "Failure",
        Details: "OTP was not sent to this phone number",
      };
      return res.status(400).send(response);
      // return res.status(400).send({ message: "Invalid phone number" });
    }
    const otpResult = await pool.query(`SELECT * FROM otp WHERE id = $1`, [
      parsedData.otp_id,
    ]);
    const result = otpResult.rows[0];
    if (result != null) {
      if (result.verified != true) {
        if (result.expiration_time > currentDateTime) {
          if (result.otp == otp) {
            await pool.query(`UPDATE otp SET verified = $2 WHERE id = $1`, [
              result.id,
              true,
            ]);
            const clientResult = await pool.query(
              `SELECT * FROM clients WHERE phone_number = $1`,
              [phone_number]
            );
            let client_id, client_status;
            if (clientResult.rows.length == 0) {
              const newClient = await pool.query(
                `INSERT INTO clients (phone_number, otp_id, is_active) VALUES ($1, $2, $3) RETURNING id`,
                [phone_number, parsedData.otp_id, true]
              );
              client_id = newClient.rows[0].id;
              client_status = "new";
            } else {
              client_id = clientResult.rows[0].id;
              client_status = "old";
              await pool.query(
                `UPDATE clients SET otp_id = $2, is_active = true WHERE id = $1`,
                [client_id, parsedData.otp_id]
              );
            }
            const response = {
              Status: "Success",
              Details: client_status,
              PhoneNumber: phone_number,
              clientId: client_id,
            };
            return res.status(200).send(response);
          } else {
            const response = {
              Status: "Failure",
              Details: "OTP not matched",
            };
            return res.status(400).send(response);
          }
        } else {
          const response = {
            Status: "Failure",
            Details: "OTP expired",
          };
          return res.status(400).send(response);
        }
      } else {
        const response = {
          Status: "Failure",
          Details: "OTP already verified",
        };
        return res.status(400).send(response);
      }
    } else {
      const response = {
        Status: "Failure",
        Details: "OTP not found",
      };
      return res.status(400).send(response);
    }
  } catch (error) {
    console.error(error);
  }
};

const verifySpecialistOTP = async (req, res) => {
  try {
    const { otp, phone_number, verification_key } = req.body;
    const currentDateTime = new Date();
    const decodedData = await decode(verification_key);

    const parsedData = JSON.parse(decodedData);
    if (parsedData.phone_number !== phone_number) {
      const response = {
        Status: "Failure",
        Details: "OTP was not sent to this phone number",
      };
      return res.status(400).send(response);
      // return res.status(400).send({ message: "Invalid phone number" });
    }
    const otpResult = await pool.query(`SELECT * FROM otp WHERE id = $1`, [
      parsedData.otp_id,
    ]);
    const result = otpResult.rows[0];
    if (result != null) {
      if (result.verified != true) {
        if (result.expiration_time > currentDateTime) {
          if (result.otp == otp) {
            await pool.query(`UPDATE otp SET verified = $2 WHERE id = $1`, [
              result.id,
              true,
            ]);
            const specialistResult = await pool.query(
              `SELECT * FROM specialist WHERE phone_number = $1`,
              [phone_number]
            );
            let specialist_id, specialist_status;
            if (specialistResult.rows.length == 0) {
              const newSpecialist = await pool.query(
                `INSERT INTO specialist (phone_number, otp_id, is_active) VALUES ($1, $2, $3) RETURNING id`,
                [phone_number, parsedData.otp_id, true]
              );
              specialist_id = newSpecialist.rows[0].id;
              specialist_status = "new";
            } else {
              specialist_id = specialistResult.rows[0].id;
              specialist_status = "old";
              await pool.query(
                `UPDATE specialist SET otp_id = $2, is_active = true WHERE id = $1`,
                [specialist_id, parsedData.otp_id]
              );
            }
            const response = {
              Status: "Success",
              Details: specialist_status,
              PhoneNumber: phone_number,
              specialistId: specialist_id,
            };
            return res.status(200).send(response);
          } else {
            const response = {
              Status: "Failure",
              Details: "OTP not matched",
            };
            return res.status(400).send(response);
          }
        } else {
          const response = {
            Status: "Failure",
            Details: "OTP expired",
          };
          return res.status(400).send(response);
        }
      } else {
        const response = {
          Status: "Failure",
          Details: "OTP already verified",
        };
        return res.status(400).send(response);
      }
    } else {
      const response = {
        Status: "Failure",
        Details: "OTP not found",
      };
      return res.status(400).send(response);
    }
  } catch (error) {
    console.error(error);
  }
};


module.exports = { newOTP, verifyClientsOTP, verifySpecialistOTP };
