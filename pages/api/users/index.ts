import { NextApiRequest, NextApiResponse } from "next";
import { CreateUser } from "../../../utils/users/createUser";
import { SanitizeResponse } from "../../../utils/sanitizeResponse";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { body, method } = req;
  const { name, email, password } = body;

  if (method === "POST") {
    try {
      const user = await CreateUser(name, email, password);
      SanitizeResponse(user);
      return res.status(201).json(user);
    } catch (error) {
      // TODO add error logger
      return res
        .status(400) // TODO change #
        .json({ message: `${error}` });
    }
  }

  return res.status(405).json({ message: "Not Allowed" });
};

export default handler;
