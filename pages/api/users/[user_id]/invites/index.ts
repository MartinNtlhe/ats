import { GetAllUserInvites } from "../../../../../utils/invites/getAllOrgInvites";
import { NextApiResponse } from "next";

import withSession from "../../../../../middleware/withSession";

const handler = async (
  req: NextIronRequest,
  res: NextApiResponse
): Promise<void> => {
  const user = req.session.get("user");
  if (!user) {
    req.session.destroy();
    return res.status(401).json({ message: "Please sign in again" });
  }
  const { method } = req;

  if (method === "GET") {
    try {
      const invites = await GetAllUserInvites(user.user_id);
      return res.status(200).json(invites);
    } catch (error) {
      // TODO add error logger
      return res
        .status(400) // TODO change #
        .json({ message: `${error}` });
    }
  }

  return res.status(405).json({ message: "Not Allowed" });
};

export default withSession(handler);
